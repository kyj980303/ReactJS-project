import React, { useEffect } from "react";
import AppRouter from "components/Router";
import { useState } from "react";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    // 로그인 또는 로그아웃이 되면 실행된다.
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user); // user를 저장해뒀다가 나중에 필요할 때 사용한다.
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
