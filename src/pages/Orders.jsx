import { FaEye } from 'react-icons/fa';

function Orders() {
  const orders = [
    { id: 'ORD-001', date: '2024-06-14', customer: 'Ana García', total: 25800, status: 'Completado' },
    { id: 'ORD-002', date: '2024-06-13', customer: 'María López', total: 34200, status: 'Enviado' },
    { id: 'ORD-003', date: '2024-06-13', customer: 'Laura Martínez', total: 12900, status: 'Procesando' },
    { id: 'ORD-004', date: '2024-06-12', customer: 'Sofía Rodríguez', total: 45600, status: 'Completado' },
  ];

  const getStatusStyle = (status) => {
    const colors = {
      'Completado': '#5CB85C',
      'Enviado': '#5BC0DE',
      'Procesando': '#F0AD4E',
      'Cancelado': '#D9534F'
    };
    return {
      backgroundColor: colors[status] || '#8B4513',
      color: 'white',
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px'
    };
  };

  return (
    <div>
      <h1 style={{ color: '#2C1810', fontSize: '24px', marginBottom: '30px' }}>Pedidos</h1>
      
      <div className="admin-card" style={{ overflow: 'hidden' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID Pedido</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.date}</td>
                <td>{order.customer}</td>
                <td style={{ color: '#B45F2B', fontWeight: 'bold' }}>${order.total.toLocaleString('es-AR')}</td>
                <td><span style={getStatusStyle(order.status)}>{order.status}</span></td>
                <td><FaEye style={{ color: '#B45F2B', cursor: 'pointer' }} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;