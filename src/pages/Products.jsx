import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../services/supabase";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    // avoid calling setState synchronously within the effect body
    const t = setTimeout(() => {
      fetchProducts();
    }, 0);

    return () => clearTimeout(t);
  }, []);

  const handleDelete = async (id) => {
    if (confirm("¿Estás segura de eliminar este producto?")) {
      await supabase.from("products").delete().eq("id", id);
      fetchProducts();
    }
  };

  if (loading)
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>Cargando...</div>
    );

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1 style={{ color: "#2C1810", fontSize: "24px" }}>Productos</h1>
        <Link to="/add-product">
          <button
            className="admin-btn-primary"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <FaPlus /> Agregar Producto
          </button>
        </Link>
      </div>

      <div className="admin-card" style={{ overflow: "hidden" }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Título</th>
              <th>Marca</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </td>
                <td>{product.title}</td>
                <td>{product.brand}</td>
                <td style={{ color: "#B45F2B", fontWeight: "bold" }}>
                  ${product.price}
                </td>
                <td>{product.stock}</td>
                <td>
                  <Link
                    to={`/edit-product/${product.id}`}
                    style={{ marginRight: "15px" }}
                  >
                    <FaEdit style={{ color: "#B45F2B", cursor: "pointer" }} />
                  </Link>
                  <FaTrash
                    onClick={() => handleDelete(product.id)}
                    style={{ color: "#D9534F", cursor: "pointer" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
