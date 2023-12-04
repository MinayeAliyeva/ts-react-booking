import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header>
  <Link to='/'>Home</Link>
  <Link to='/about'>About</Link>
  <Link to='/signUp'>Sign Up</Link>
  <Link to='/login'>Login</Link>
    </header>
  )
}

export default Header