import React, { useEffect } from "react";
import AppRouter from "components/Router";
import { useState } from "react";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    // 로그인이 되면 실행된다.
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user); // user를 저장해뒀다가 나중에 필요할 때 사용한다.
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
