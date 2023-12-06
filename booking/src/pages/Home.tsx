import axios from "axios";
import { useEffect, useState } from "react";

interface IProduct {
  id: number;
  name: string;
  username: string;
}
const Home = (): JSX.Element => {
  const PRODUCTS_URL = "https://jsonplaceholder.typicode.com/users";
  const [data, setData] = useState<IProduct[]>([]);
  const fetchdata = async (): Promise<IProduct[]> => {
    const response = await axios.get<IProduct[]>(PRODUCTS_URL);
    const data = response.data;
    setData(data);
    return data;
  };

  useEffect(() => {
    fetchdata();
  }, []);
  const deleteProduct = async (id: number): Promise<void> => {
    await axios.delete(`${PRODUCTS_URL}/${id}`);
    const filteredData = data.filter((obj) => obj.id !== id);
    setData(filteredData);
  };
  console.log(data);

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
                <button
                  onClick={() => deleteProduct(obj.id)}
                  className="deleteBtn"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </section>
  );
};

export default Home;
