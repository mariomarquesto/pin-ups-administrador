import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import AddProduct from './pages/AddProducts';
import EditProduct from './pages/EditProduct';
import Sales from './pages/Sales';
import Orders from './pages/Orders';
import './styles/admin.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/*" element={
          <PrivateRoute>
            <div style={{ display: 'flex' }}>
              <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
              <div style={{
                marginLeft: sidebarOpen ? '260px' : '70px',
                flex: 1,
                transition: 'margin-left 0.3s ease',
                padding: '20px',
                minHeight: '100vh'
              }}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/add-product" element={<AddProduct />} />
                  <Route path="/edit-product/:id" element={<EditProduct />} />
                  <Route path="/sales" element={<Sales />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </div>
            </div>
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;