import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    price: '',
    discount_percentage: 0,
    thumbnail: '',
    rating: 0,
    category: '',
    stock: 0,
    featured: false,
    sizes: [],
    colors: []
  });

  const sizesList = ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'];
  const colorsList = [
    'Negro estampado',
    'Azul marino',
    'Rojo vintage',
    'Verde salvia',
    'Rosa viejo',
    'Beige',
    'Blanco perla'
  ];

  // Cargar producto al montar el componente
  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('Error cargando producto:', error);
        return;
      }
      
      if (data) {
        setFormData({
          title: data.title || '',
          brand: data.brand || '',
          price: data.price || '',
          discount_percentage: data.discount_percentage || 0,
          thumbnail: data.thumbnail || '',
          rating: data.rating || 0,
          category: data.category || '',
          stock: data.stock || 0,
          featured: data.featured || false,
          sizes: data.sizes || [],
          colors: data.colors || []
        });
      }
    };
    
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleArrayChange = (arrayName, value) => {
    const currentArray = formData[arrayName] || [];
    setFormData({
      ...formData,
      [arrayName]: currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const updateData = {
      title: formData.title,
      brand: formData.brand,
      price: parseFloat(formData.price),
      discount_percentage: parseInt(formData.discount_percentage, 10),
      thumbnail: formData.thumbnail,
      rating: parseFloat(formData.rating) || 0,
      category: formData.category,
      stock: parseInt(formData.stock, 10),
      featured: formData.featured,
      sizes: formData.sizes || [],
      colors: formData.colors || []
    };
    
    const { error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id);
    
    if (!error) {
      navigate('/products');
    } else {
      alert('Error: ' + error.message);
    }
    
    setLoading(false);
  };

  return (
    <div>
      <h1 style={{ color: '#2C1810', fontSize: '24px', marginBottom: '30px' }}>
        Editar Producto
      </h1>
      
      <form onSubmit={handleSubmit} className="admin-card" style={{ padding: '30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#2C1810' }}>
              Título *
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="admin-input"
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#2C1810' }}>
              Marca
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="admin-input"
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#2C1810' }}>
              Precio *
            </label>
            <input
              type="number"
              name="price"
              required
              value={formData.price}
              onChange={handleChange}
              className="admin-input"
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#2C1810' }}>
              Descuento (%)
            </label>
            <input
              type="number"
              name="discount_percentage"
              value={formData.discount_percentage}
              onChange={handleChange}
              className="admin-input"
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#2C1810' }}>
              URL Imagen
            </label>
            <input
              type="text"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              className="admin-input"
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#2C1810' }}>
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="admin-input"
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#2C1810' }}>
              Categoría
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="admin-input"
            >
              <option value="">Seleccionar</option>
              <option value="dresses">Vestidos</option>
              <option value="footwear">Calzado</option>
              <option value="skirts">Faldas</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#2C1810' }}>
              Rating (0-5)
            </label>
            <input
              type="number"
              name="rating"
              step="0.1"
              min="0"
              max="5"
              value={formData.rating}
              onChange={handleChange}
              className="admin-input"
            />
          </div>
        </div>
        
        <div style={{ marginTop: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#2C1810' }}>
            Tallas
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {sizesList.map(size => (
              <label key={size} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <input
                  type="checkbox"
                  checked={(formData.sizes || []).includes(size)}
                  onChange={() => handleArrayChange('sizes', size)}
                />
                {size}
              </label>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#2C1810' }}>
            Colores
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {colorsList.map(color => (
              <label key={color} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <input
                  type="checkbox"
                  checked={(formData.colors || []).includes(color)}
                  onChange={() => handleArrayChange('colors', color)}
                />
                {color}
              </label>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
            />
            Producto Destacado
          </label>
        </div>
        
        <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
          <button
            type="submit"
            disabled={loading}
            className="admin-btn-primary"
          >
            {loading ? 'Actualizando...' : 'Actualizar Producto'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="admin-btn-secondary"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;