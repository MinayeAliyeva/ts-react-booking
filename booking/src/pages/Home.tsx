const PRODUCTS_URL = "https://jsonplaceholder.typicode.com/users";
import axios from "axios";
import { useEffect, useState } from "react";
const Home = () => {
  const [data, setData] = useState([]);
  const fetchdata = async () => {
    const response = await axios.get(PRODUCTS_URL);
    const data = await response.data;
    setData(data);
    return data;
  };
  console.log(data);

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <section id="products">
      <h2>Product List:</h2>
      <ul className="card-container">
        {data.map((obj) => (
          <div key={obj.id}>
            <div className="card">
              {obj.name}
              {obj.username}
              <div>
                {" "}
                <button className="deleteBtn">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </section>
  );
};

export default Home;
