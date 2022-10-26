import {useAppSelector } from "../hooks/useTypedSelector"
import { User } from "../types/global";

export default function LoginSuccess() {
  //#region - Hooks
  const currentUser: User = useAppSelector(({user}) => user.current);
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
