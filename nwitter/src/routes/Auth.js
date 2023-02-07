import AuthForm from "components/AuthForm";

const Auth = () => {
  return (
    <>
      <div className="Auth">
        <div className="logo">
          <img src={process.env.PUBLIC_URL + "/img/logo.png"} />
        </div>
        <AuthForm />
      </div>
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
};

export default Auth;
