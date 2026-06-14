import { useState, useEffect } from "react";
import { supabase } from "../services/supabase";
import { 
  FiPackage, 
  FiTrendingUp, 
  FiStar, 
  FiDollarSign,
  FiArrowRight
} from "react-icons/fi";
import { Link } from "react-router-dom";

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalStock: 0,
    featuredProducts: 0,
    totalValue: 0,
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      const { data } = await supabase.from("products").select("*");
      if (!mounted) return;
      if (data) {
        const totalValue = data.reduce((sum, p) => sum + p.price * p.stock, 0);
        setStats({
          totalProducts: data.length,
          totalStock: data.reduce((sum, p) => sum + p.stock, 0),
          featuredProducts: data.filter((p) => p.featured).length,
          totalValue: totalValue,
        });
        setRecentProducts(data.slice(0, 5));
      }
      setLoading(false);
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  const statsCards = [
    {
      title: "Productos",
      value: stats.totalProducts,
      icon: <FiPackage size={28} />,
      color: "#f85606",
      bg: "rgba(248, 86, 6, 0.1)",
      delay: 0
    },
    {
      title: "Stock Total",
      value: stats.totalStock,
      icon: <FiTrendingUp size={28} />,
      color: "#f85606",
      bg: "rgba(248, 86, 6, 0.1)",
      delay: 0.1
    },
    {
      title: "Destacados",
      value: stats.featuredProducts,
      icon: <FiStar size={28} />,
      color: "#f85606",
      bg: "rgba(248, 86, 6, 0.1)",
      delay: 0.2
    },
    {
      title: "Valor Inventario",
      value: `$${stats.totalValue.toLocaleString("es-AR")}`,
      icon: <FiDollarSign size={28} />,
      color: "#f85606",
      bg: "rgba(248, 86, 6, 0.1)",
      delay: 0.3
    }
  ];

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
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ animation: "fadeInUp 0.6s ease-out" }}>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .stat-card {
          transition: all 0.3s ease;
          animation: fadeInUp 0.5s ease-out forwards;
          opacity: 0;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
        }
        .stat-card:hover .stat-icon {
          transform: scale(1.1);
          transition: transform 0.3s ease;
        }
        .product-item {
          transition: all 0.3s ease;
          animation: slideIn 0.4s ease-out forwards;
          opacity: 0;
        }
        .product-item:hover {
          transform: translateX(4px);
          background-color: #f8f9fa;
        }
      `}</style>

      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "32px",
        animation: "fadeInUp 0.5s ease-out"
      }}>
        <div>
          <h1 style={{
            fontSize: "28px",
            fontWeight: "600",
            color: "#212529",
            margin: 0,
            letterSpacing: "-0.5px"
          }}>
            Dashboard
          </h1>
          <p style={{
            color: "#6c757d",
            marginTop: "8px",
            fontSize: "14px"
          }}>
            Bienvenida de vuelta ✨
          </p>
        </div>
        <div style={{
          backgroundColor: "#FFFFFF",
          padding: "10px 20px",
          borderRadius: "12px",
          border: "1px solid #dee2e6",
          fontSize: "14px",
          color: "#212529"
        }}>
          {new Date().toLocaleDateString('es-AR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Stats Cards */}
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
              animationDelay: `${card.delay}s`
            }}
          >
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "16px"
            }}>
              <div className="stat-icon" style={{
                color: card.color,
                backgroundColor: card.bg,
                padding: "12px",
                borderRadius: "16px",
                display: "inline-flex",
                transition: "transform 0.3s ease"
              }}>
                {card.icon}
              </div>
            </div>
            <div>
              <p style={{
                color: "#6c757d",
                fontSize: "13px",
                fontWeight: "500",
                marginBottom: "8px",
                letterSpacing: "0.5px"
              }}>
                {card.title}
              </p>
              <h2 style={{
                fontSize: "32px",
                fontWeight: "700",
                color: "#212529",
                margin: 0
              }}>
                {card.value}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Products Section */}
      <div style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "20px",
        border: "1px solid #dee2e6",
        overflow: "hidden",
        animation: "fadeInUp 0.6s ease-out 0.2s both"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 24px",
          borderBottom: "1px solid #dee2e6"
        }}>
          <h3 style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#212529",
            margin: 0
          }}>
            Últimos Productos
          </h3>
          <Link to="/products" style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#f85606",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "500",
            transition: "gap 0.3s ease"
          }}
          onMouseEnter={(e) => e.currentTarget.style.gap = "12px"}
          onMouseLeave={(e) => e.currentTarget.style.gap = "8px"}
          >
            Ver todos <FiArrowRight size={16} />
          </Link>
        </div>
        
        <div style={{ padding: "0 24px" }}>
          {recentProducts.map((product, idx) => (
            <div
              key={product.id}
              className="product-item"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "16px 0",
                borderBottom: idx < recentProducts.length - 1 ? "1px solid #dee2e6" : "none",
                animationDelay: `${0.3 + idx * 0.05}s`
              }}
            >
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                overflow: "hidden",
                backgroundColor: "#f8f9fa",
                flexShrink: 0
              }}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{
                  fontWeight: "600",
                  color: "#212529",
                  margin: 0,
                  marginBottom: "4px"
                }}>
                  {product.title}
                </p>
                <p style={{
                  color: "#6c757d",
                  fontSize: "13px",
                  margin: 0
                }}>
                  {product.brand || "Sin marca"}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{
                  fontWeight: "700",
                  color: "#f85606",
                  margin: 0,
                  marginBottom: "4px"
                }}>
                  ${product.price.toLocaleString("es-AR")}
                </p>
                <p style={{
                  color: "#6c757d",
                  fontSize: "12px",
                  margin: 0
                }}>
                  Stock: {product.stock}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative subtle gradient */}
      <div style={{
        position: "fixed",
        bottom: 0,
        right: 0,
        width: "300px",
        height: "300px",
        background: "radial-gradient(circle, rgba(248,86,6,0.03) 0%, rgba(248,86,6,0) 70%)",
        pointerEvents: "none",
        zIndex: 0
      }} />
    </div>
  );
}

export default Dashboard;