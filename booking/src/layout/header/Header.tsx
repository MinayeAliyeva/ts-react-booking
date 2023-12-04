import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center place-content-around p-8 bg-slate-300">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/signUp">Sign Up</Link>
      <Link to="/login">Login</Link>
    </header>
  );
};

export default Header;
