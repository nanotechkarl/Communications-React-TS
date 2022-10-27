import {useAppSelector, useAppDispatch } from "../hooks/useTypedSelector"
import { User } from "../types/global";
import { useEffect } from "react";
import { getUserObject } from "../store/user.slice";

export default function LoginSuccess() {
  //#region - Hooks
  const dispatch = useAppDispatch()
  const currentUser: User = useAppSelector(({user}) => user.current);
  //#endregion

  //#region - FETCH
  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    await dispatch(getUserObject());
  };
  //#endregion

  return (
    <div className="loginsuccess-page centered">
      <div className="header-nav-div">
        <h4>
          <b>Login Successful</b>
        </h4>
      </div>
      <div className="content-div">
        <p>
          <b>Welcome !</b> <span id="user-email">{currentUser.email}</span>
        </p>
      </div>
    </div>
  );
}
