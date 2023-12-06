import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const USERS_URL = "http://localhost:3000/users";

const SignUp = () => {
  const navigate = useNavigate();
  interface IUser {
    name: string;
    sname: string;
    id?: number;
  }
  const initialData: IUser = {
    name: "",
    sname: "",
  };
  const [users, setusers] = useState<IUser[]>([]);
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
    getUsers();
    //valulari sifirlasin
    setUser(initialData);
    navigate("/login");
  };
  const getUsers = async () => {
    const res = await axios.get(USERS_URL);
    setusers(res.data);
  };
  useEffect(() => {
    getUsers();
  }, [user]);

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>Sign Up</h1>
        <label>Name</label>
        <input name="name" onChange={(e) => handleChange(e)} />
        <label>Surname</label>
        <input name="sname" onChange={(e) => handleChange(e)} />
        <button type="submit">SignUp</button>
      </form>
      <div className="users">
        {users &&
          users.map((user) => (
            <div className="user" key={user.id}>
              <h2>{user.name}</h2>
              <h2>{user.sname}</h2>
              <h2>{user.id}</h2>
            </div>
          ))}
      </div>
    </>
  );
};

export default SignUp;
