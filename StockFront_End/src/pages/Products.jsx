import { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/allproduct")
      .then(res => setProducts(res.data.products))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {products.map((p) => (
        <div key={p.id} style={{ border: "1px solid #ccc", padding: "10px" }}>
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <p><b>{p.price} DH</b></p>
        </div>
      ))}
    </div>
  );
}

export default Products;