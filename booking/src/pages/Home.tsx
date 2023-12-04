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
const deleteProduct=async(id)=>{
await axios.delete(`${PRODUCTS_URL}/${id}`)
const filteredData=data.filter((obj)=> obj.id!=id);
setData(filteredData)
}
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
                <button onClick={()=>deleteProduct(obj.id)} className="deleteBtn">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </section>
  );
};

export default Home;
