import { useState } from "react";
import axios from "axios";
const USERS_URL = "http://localhost:3000/users";

const SignUp = () => {
  const initialData = {
    name: "",
    sname: "",
  };
  const [user, setUser] = useState(initialData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevs) => ({
      ...prevs,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(USERS_URL, user);
    setUser(initialData)
  };
  return (
    <form>
      <h1>Sign Up</h1>
      <label>Name</label>
      <input name="name" onChange={(e) => handleChange(e)} />
      <label>Surname</label>
      <input name="sname" onChange={(e) => handleChange(e)} />
      <button onClick={(e) => handleSubmit(e)}>SignUp</button>
    </form>
  );
};

export default SignUp;
