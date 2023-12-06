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
  const [basket, setBasket] = useState([]);
  const [check, setCheck] = useState(false);
  const fetchdata = async (): Promise<IProduct[]> => {
    const response = await axios.get<IProduct[]>(PRODUCTS_URL);
    const data = response.data;
    setData(data);
    return data;
  };

  useEffect(() => {
    fetchdata();
  }, []);
  const find = JSON.parse(localStorage.getItem("user") as string);
  //type costing localdaan ne gelirse gelsin string olacaq
  // const find = JSON.parse(localStorage.getItem("user")!);
  // as string tip cevrilmesidi amma ! senin localstore.get i=item null i yox edir interface tipime getirir
  // const find = JSON.parse(JSON.stringify(localStorage.getItem("user")));
  //
  // const str:string = localStorage.getItem("user")?.key((e)=>e.name).length ? localStorage.getItem("user") : ""; ELMAR At //repo
  // const find = JSON.parse(str);

  const deleteProduct = async (id: number): Promise<void> => {
    await axios.delete(`${PRODUCTS_URL}/${id}`);
    const filteredData = data.filter((obj) => obj.id != id);
    {
      find ? setData(filteredData) : setData(data);
    }
    console.log(filteredData);
  };

  // const obj={name:"Minaya"}
  // const nm="name"
  //obj[nm]  elmar comment qulam , type saving...

  //Record<string, string>   record itrm bit objectdi keyide valueside stringdi
  // console.log(data);
  const BASEKET_URL = "http://localhost:3000/basket";
  const addBasket = async (item: IProduct) => {
    const userID = find.id;
    axios.post(BASEKET_URL, { [userID]: { ...item, userID } });
    setCheck((check) => !check);
  };

  useEffect(() => {
    axios.get(BASEKET_URL).then((res) => setBasket(res.data));
  }, [check]);

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
                <button onClick={() => addBasket(obj)}>Add Basket</button>
              </div>
            </div>
          </div>
        ))}
        <hr />
        {basket &&
          find?.id &&
          basket.map((product) => {
            if (product[find?.id]?.userID == find?.id) {
              return (
                <ul>
                  <li className="pro">{product[find?.id]?.name}</li>
                </ul>
              );
            } else "";
          })}
      </ul>
    </section>
  );
};

export default Home;
