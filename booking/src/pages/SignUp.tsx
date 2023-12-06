import { useState } from "react";
import axios from "axios";
const USERS_URL = "http://localhost:3000/users";

const SignUp = () => {
  interface IUser{
    name:string,
    sname:string
  }
  const initialData :IUser= {
    name: "",
    sname: "",
  };
  const [user, setUser] = useState<IUser>(initialData);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevs) => ({
      ...prevs,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post(USERS_URL, user);
    setUser(initialData)
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)} >
      <h1>Sign Up</h1>
      <label>Name</label>
      <input name="name" onChange={(e) => handleChange(e)} />
      <label>Surname</label>
      <input name="sname" onChange={(e) => handleChange(e)} />
      <button type="submit" >SignUp</button>
    </form>
  );
};

export default SignUp;
