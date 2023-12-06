import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const USERS_URL = "http://localhost:3000/users";
  interface ILuser {
    lname: string;
    slname: string;
    id?: number;
  }
  const initialData: ILuser = {
    lname: "",
    slname: "",
  };
  const [user, setUser] = useState<ILuser>(initialData);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevs) => ({
      ...prevs,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.get(USERS_URL);
    const data = res.data;
    const find = data.find((obj) => obj.name == user.lname);
    if (find) {
      navigate('/');
      localStorage.setItem('user',JSON.stringify(find))
    } else {
      console.log("User not found");
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h1>Login</h1>
      <label>Name</label>
      <input onChange={(e) => handleChange(e)} name="lname" />
      <label>Surname</label>
      <input onChange={(e) => handleChange(e)} name="slname" />
      <button>Login</button>
    </form>
  );
};

export default Login;
