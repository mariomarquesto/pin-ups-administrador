import { FaBox, FaChartLine, FaShoppingCart } from 'react-icons/fa';

function StatsCards({ stats }) {
  const cards = [
    { title: 'Total Productos', value: stats.totalProducts, icon: <FaBox size={24} />, color: '#B45F2B' },
    { title: 'Stock Total', value: stats.totalStock, icon: <FaBox size={24} />, color: '#8B4513' },
    { title: 'Destacados', value: stats.featuredProducts, icon: <FaChartLine size={24} />, color: '#B45F2B' },
    { title: 'Valor Inventario', value: `$${stats.totalValue.toLocaleString('es-AR')}`, icon: <FaShoppingCart size={24} />, color: '#8B4513' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
      {cards.map((card, idx) => (
        <div key={idx} className="admin-card" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ color: '#8B4513', fontSize: '12px', marginBottom: '5px' }}>{card.title}</p>
            <h2 style={{ color: '#2C1810', fontSize: '28px', margin: 0 }}>{card.value}</h2>
          </div>
          <div style={{ color: card.color }}>{card.icon}</div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;