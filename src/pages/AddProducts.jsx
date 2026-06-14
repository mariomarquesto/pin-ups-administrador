import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';

function AddProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '', brand: '', price: '', discount_percentage: 0,
    thumbnail: '', rating: 0, category: '', stock: 0, featured: false,
    sizes: [], colors: []
  });

  const sizesList = ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'];
  const colorsList = ['Negro estampado', 'Azul marino', 'Rojo vintage', 'Verde salvia', 'Rosa viejo', 'Beige', 'Blanco perla'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleArrayChange = (arrayName, value) => {
    setFormData({
      ...formData,
      [arrayName]: formData[arrayName].includes(value) ? formData[arrayName].filter(item => item !== value) : [...formData[arrayName], value]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('products').insert([{
      ...formData,
      price: parseFloat(formData.price),
      discount_percentage: parseInt(formData.discount_percentage),
      stock: parseInt(formData.stock),
      rating: parseFloat(formData.rating)
    }]);
    if (!error) navigate('/products');
    else alert('Error: ' + error.message);
    setLoading(false);
  };

  return (
    <div>
      <h1 style={{ color: '#2C1810', fontSize: '24px', marginBottom: '30px' }}>Agregar Producto</h1>
      
      <form onSubmit={handleSubmit} className="admin-card" style={{ padding: '30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#2C1810' }}>Título *</label>
            <input type="text" name="title" required value={formData.title} onChange={handleChange} className="admin-input" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#2C1810' }}>Marca</label>
            <input type="text" name="brand" value={formData.brand} onChange={handleChange} className="admin-input" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#2C1810' }}>Precio *</label>
            <input type="number" name="price" required value={formData.price} onChange={handleChange} className="admin-input" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#2C1810' }}>Descuento (%)</label>
            <input type="number" name="discount_percentage" value={formData.discount_percentage} onChange={handleChange} className="admin-input" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#2C1810' }}>URL Imagen</label>
            <input type="text" name="thumbnail" value={formData.thumbnail} onChange={handleChange} className="admin-input" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#2C1810' }}>Stock</label>
            <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="admin-input" />
          </div>
        </div>
        
        <div style={{ marginTop: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#2C1810' }}>Tallas</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {sizesList.map(size => (
              <label key={size} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <input type="checkbox" checked={formData.sizes.includes(size)} onChange={() => handleArrayChange('sizes', size)} />
                {size}
              </label>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#2C1810' }}>Colores</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {colorsList.map(color => (
              <label key={color} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <input type="checkbox" checked={formData.colors.includes(color)} onChange={() => handleArrayChange('colors', color)} />
                {color}
              </label>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
            Producto Destacado
          </label>
        </div>
        
        <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
          <button type="submit" disabled={loading} className="admin-btn-primary">
            {loading ? 'Guardando...' : 'Guardar Producto'}
          </button>
          <button type="button" onClick={() => navigate('/products')} className="admin-btn-secondary">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;