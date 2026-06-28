import { useEffect, useMemo, useState } from 'react';
import './App.css';

const formatMoney = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);

function App() {
  const [shop, setShop] = useState(null);
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setShop(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Unable to load shop data.');
        setLoading(false);
      });
  }, []);

  const products = shop?.products || [];

  const cartItems = useMemo(
    () =>
      Object.entries(cart).map(([id, quantity]) => {
        const product = products.find((item) => item.id === id);
        return product ? { ...product, quantity } : null;
      }).filter(Boolean),
    [cart, products]
  );

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const addToCart = (productId) => {
    setCart((prev) => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
    setMessage('');
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prev) => {
      const next = { ...prev };
      if (quantity <= 0) {
        delete next[productId];
      } else {
        next[productId] = quantity;
      }
      return next;
    });
    setMessage('');
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      setError('Your cart is empty. Add some glasses first.');
      return;
    }

    setCheckoutLoading(true);
    setError('');

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems.map((item) => ({ id: item.id, quantity: item.quantity })) })
      });

      if (!response.ok) {
        throw new Error('Checkout failed');
      }

      const result = await response.json();
      setMessage(result.message);
      setCart({});
    } catch (err) {
      setError('Unable to complete checkout. Try again later.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return <div className="app-shell">Loading store...</div>;
  }

  if (!shop) {
    return <div className="app-shell">No store data available.</div>;
  }

  return (
    <div className="app-shell">
      <div className="store-shell">
        <section className="hero">
          <div>
            <p className="subtitle">{shop.shopName}</p>
            <h1>Find your perfect pair of glasses.</h1>
            <p className="hero-text">{shop.description}</p>
          </div>
          <div className="hero-card">
            <p>Fast order. Simple checkout. Stylish frames.</p>
          </div>
        </section>

        <section className="products-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image" style={{ backgroundColor: product.color }}>
                <span>{product.name}</span>
              </div>
              <div className="product-body">
                <h2>{product.name}</h2>
                <p>{product.short}</p>
                <div className="product-bottom">
                  <strong>{formatMoney(product.price)}</strong>
                  <button type="button" onClick={() => addToCart(product.id)}>
                    Add to cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        <aside className="cart-panel">
          <div className="cart-header">
            <h2>Your cart</h2>
            <span>{cartItems.length} item(s)</span>
          </div>

          {cartItems.length === 0 ? (
            <p className="empty-cart">Your cart is empty. Add a pair of glasses to continue.</p>
          ) : (
            <div className="cart-list">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div>
                    <p className="cart-name">{item.name}</p>
                    <small>{formatMoney(item.price)} each</small>
                  </div>
                  <div className="cart-controls">
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="cart-summary">
            <p>Subtotal</p>
            <strong>{formatMoney(subtotal)}</strong>
          </div>

          <button type="button" className="checkout-button" onClick={handleCheckout} disabled={checkoutLoading}>
            {checkoutLoading ? 'Processing...' : 'Checkout'}
          </button>

          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
        </aside>
      </div>
    </div>
  );
}

export default App;
