import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { 
  FiTrendingUp, 
  FiShoppingBag, 
  FiDollarSign,
  FiPieChart,
  FiArrowUp,
} from 'react-icons/fi';

function Sales() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalValue, setTotalValue] = useState(0);
  const [averagePrice, setAveragePrice] = useState(0);
  const [categoryStats, setCategoryStats] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from('products').select('*');
      if (data) {
        setProducts(data);
        
        // Calcular valor total del inventario
        const total = data.reduce((sum, p) => sum + (p.price * p.stock), 0);
        setTotalValue(total);
        
        // Calcular precio promedio
        const avg = data.reduce((sum, p) => sum + p.price, 0) / data.length;
        setAveragePrice(Math.round(avg));
        
        // Estadísticas por categoría
        const stats = {};
        data.forEach(p => {
          const category = p.category || 'Otros';
          if (!stats[category]) {
            stats[category] = { count: 0, totalValue: 0 };
          }
          stats[category].count++;
          stats[category].totalValue += p.price * p.stock;
        });
        setCategoryStats(stats);
      }
      setLoading(false);
    };
    
    fetchProducts();
  }, []);

  // Ganancia estimada (40% de margen sobre el valor del inventario)
  const estimatedProfit = totalValue * 0.4;
  const potentialProfitPerProduct = averagePrice * 0.4;

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh"
      }}>
        <div style={{
          width: "40px",
          height: "40px",
          border: "3px solid #f0f0f0",
          borderTop: "3px solid #f85606",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }} />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }

  const statsCards = [
    {
      title: "Valor del Inventario",
      value: `$${totalValue.toLocaleString('es-AR')}`,
      icon: <FiDollarSign size={28} />,
      subtitle: "Total en productos",
      color: "#f85606"
    },
    {
      title: "Ganancia Potencial",
      value: `$${estimatedProfit.toLocaleString('es-AR')}`,
      icon: <FiTrendingUp size={28} />,
      subtitle: "40% de margen estimado",
      color: "#28a745"
    },
    {
      title: "Productos Totales",
      value: products.length,
      icon: <FiShoppingBag size={28} />,
      subtitle: "En catálogo",
      color: "#f85606"
    },
    {
      title: "Precio Promedio",
      value: `$${averagePrice.toLocaleString('es-AR')}`,
      icon: <FiPieChart size={28} />,
      subtitle: `Ganancia x unidad: $${Math.round(potentialProfitPerProduct).toLocaleString('es-AR')}`,
      color: "#f85606"
    }
  ];

  return (
    <div style={{ animation: "fadeInUp 0.5s ease-out" }}>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .stat-card {
          transition: all 0.3s ease;
          animation: fadeInUp 0.5s ease-out forwards;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
        }
        .category-item {
          animation: slideIn 0.4s ease-out forwards;
          transition: all 0.3s ease;
        }
        .category-item:hover {
          transform: translateX(4px);
        }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{
          fontSize: "28px",
          fontWeight: "600",
          color: "#212529",
          margin: 0,
          marginBottom: "8px"
        }}>
          Ganancias
        </h1>
        <p style={{ color: "#6c757d", fontSize: "14px" }}>
          Análisis de rentabilidad y valor del inventario
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        marginBottom: "40px"
      }}>
        {statsCards.map((card, idx) => (
          <div
            key={idx}
            className="stat-card"
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              padding: "24px",
              border: "1px solid #dee2e6",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
              animationDelay: `${idx * 0.1}s`
            }}
          >
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px"
            }}>
              <div style={{
                color: card.color,
                backgroundColor: `${card.color}10`,
                padding: "12px",
                borderRadius: "16px",
                display: "inline-flex"
              }}>
                {card.icon}
              </div>
              {idx === 1 && (
                <div style={{
                  backgroundColor: "#e8f5e9",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  color: "#28a745",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px"
                }}>
                  <FiArrowUp size={12} /> +40%
                </div>
              )}
            </div>
            <div>
              <h2 style={{
                fontSize: "32px",
                fontWeight: "700",
                color: "#212529",
                margin: 0,
                marginBottom: "8px"
              }}>
                {card.value}
              </h2>
              <p style={{ color: "#6c757d", fontSize: "13px", margin: 0 }}>
                {card.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Categories Section */}
      <div style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "20px",
        border: "1px solid #dee2e6",
        overflow: "hidden",
        marginBottom: "30px",
        animation: "fadeInUp 0.6s ease-out 0.2s both"
      }}>
        <div style={{
          padding: "20px 24px",
          borderBottom: "1px solid #dee2e6",
          backgroundColor: "#f8f9fa"
        }}>
          <h3 style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#212529",
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            <FiPieChart size={20} color="#f85606" />
            Distribución por Categoría
          </h3>
        </div>
        <div style={{ padding: "0 24px" }}>
          {Object.entries(categoryStats).map(([category, stats], idx) => {
            const percentage = (stats.totalValue / totalValue * 100).toFixed(1);
            return (
              <div
                key={category}
                className="category-item"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 0",
                  borderBottom: idx < Object.keys(categoryStats).length - 1 ? "1px solid #dee2e6" : "none",
                  animationDelay: `${0.3 + idx * 0.05}s`
                }}
              >
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: "600", color: "#212529", margin: 0, marginBottom: "4px" }}>
                    {category === "dresses" ? "Vestidos" : category === "footwear" ? "Calzado" : category === "skirts" ? "Faldas" : category}
                  </p>
                  <p style={{ color: "#6c757d", fontSize: "12px", margin: 0 }}>
                    {stats.count} productos
                  </p>
                </div>
                <div style={{ textAlign: "right", marginRight: "20px", minWidth: "120px" }}>
                  <p style={{ fontWeight: "700", color: "#f85606", margin: 0 }}>
                    ${stats.totalValue.toLocaleString('es-AR')}
                  </p>
                  <p style={{ color: "#6c757d", fontSize: "12px", margin: 0 }}>
                    {percentage}% del total
                  </p>
                </div>
                <div style={{ width: "120px" }}>
                  <div style={{
                    backgroundColor: "#e9ecef",
                    borderRadius: "10px",
                    height: "8px",
                    overflow: "hidden"
                  }}>
                    <div style={{
                      width: `${percentage}%`,
                      backgroundColor: "#f85606",
                      height: "100%",
                      borderRadius: "10px",
                      transition: "width 0.5s ease"
                    }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Products Table */}
      <div className="admin-card" style={{ overflow: 'hidden', borderRadius: '16px' }}>
        <div style={{
          padding: "20px 24px",
          borderBottom: "1px solid #dee2e6",
          backgroundColor: "#f8f9fa"
        }}>
          <h3 style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#212529",
            margin: 0
          }}>
            Detalle de Productos
          </h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table" style={{ width: '100%', minWidth: '500px' }}>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Valor Total</th>
                <th>Ganancia Potencial</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 10).map((product) => (
                <tr key={product.id}>
                  <td style={{ fontWeight: "500" }}>{product.title}</td>
                  <td>{product.category || "Otros"}</td>
                  <td className="admin-price">${product.price.toLocaleString('es-AR')}</td>
                  <td>{product.stock}</td>
                  <td className="admin-price">${(product.price * product.stock).toLocaleString('es-AR')}</td>
                  <td style={{ color: "#28a745", fontWeight: "500" }}>
                    +${Math.round(product.price * 0.4).toLocaleString('es-AR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Sales;