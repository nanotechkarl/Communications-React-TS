import React from 'react'
import useForm from "../hooks/useForm";
import { loginUser } from "../store/user.slice";
import { pages } from "../utils/global";
import { useAppDispatch } from "../hooks/useTypedSelector"
import { useNavigate } from "react-router-dom";


export default function Login() {
  //#region - HOOKS
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  //const {data, error, loading} = useAppSelector((state) => state) //TODO for reference
  //#endregion

  //#region - LOGIN
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      const { email, password } = values as any; //TODO
      const login = await dispatch(loginUser({ email, password }));
      if (login) {
        navigate(pages.loginSuccess);
      } else {
        alert("Wrong email or password");
        return false;
      }
    } catch (error) {}
  };
  //#endregion

  //#region - CUSTOM HOOKS
  const inputCount = 2;
  const { handleChange, values, handleSubmit } = useForm({
    callback: onSubmit,
    inputCount,
  });
  //#endregion

  return (
    <div className="centered form">
      <div className="header-div">
        <h4>
          <b>Login</b>
        </h4>
      </div>

      <div className="form-div">
        {/* TODO get errors from hook */}
        <form onSubmit={handleSubmit}>
          <div className="input-div">
            <div className="email-div">
              <label htmlFor="email">
                <b>Email</b>
              </label>
              <input
                className="input-text"
                type="text"
                id="email"
                name="email"
                placeholder="test@mail.com"
                autoComplete="on"
                onChange={handleChange}
              />
            </div>

            <div className="password-div">
              <label htmlFor="password">
                <b>Password</b>
              </label>
              <input
                className="input-text"
                type="password"
                id="password"
                name="password"
                placeholder="******"
                autoComplete="on"
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <input className="button-primary" type="submit" value="Login" />
          </div>
        </form>
      </div>
    </div>
  );
}
