import { authService } from "fbase";
import React from "react";
import { useHistory } from "react-router-dom";

export default () => {
  const histoty = useHistory(); // logout하면 메인으로 돌아가게하기위해 사용
  const onLogOutClick = () => {
    authService.signOut(); // logout해줌
    histoty.push("/");
  };
  return (
    <>
      <button onClick={onLogOutClick}>LogOut</button>
    </>
  );
};
