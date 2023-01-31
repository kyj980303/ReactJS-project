import React from "react";
import AppRouter from "components/Router";
import { useState } from "react";
import fbase from "fbase";
import { authService } from "fbase";

function App() {
  console.log(authService.currentUser);
  const auth = fbase.auth();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
