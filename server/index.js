const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

const products = [
  {
    id: 'gl-01',
    name: 'Aviator Shine',
    price: 129,
    short: 'Light metal aviator frame',
    description: 'A classic aviator style with polished metal details and comfortable nose pads.',
    color: '#f4f1e6'
  },
  {
    id: 'gl-02',
    name: 'Round Retro',
    price: 99,
    short: 'Vintage round glasses',
    description: 'Soft round lenses with a retro-inspired frame for modern daily wear.',
    color: '#eef8ff'
  },
  {
    id: 'gl-03',
    name: 'Square Bold',
    price: 145,
    short: 'Bold square acetate frame',
    description: 'A statement frame with strong lines and a refined matte finish.',
    color: '#fff6f2'
  },
  {
    id: 'gl-04',
    name: 'Minimal Clear',
    price: 119,
    short: 'Minimal transparent frame',
    description: 'Lightweight translucent frame that pairs with any outfit and face shape.',
    color: '#f5f7f9'
  }
];

app.get('/api/products', (req, res) => {
  res.json({
    shopName: 'Cloud Glasses',
    description: 'Simple, stylish eyewear for every day.',
    products
  });
});

app.post('/api/checkout', (req, res) => {
  const items = Array.isArray(req.body.items) ? req.body.items : [];
  const cartItems = items.map((item) => {
    const product = products.find((product) => product.id === item.id);
    if (!product) {
      return null;
    }
    return {
      ...product,
      quantity: Math.max(1, Number(item.quantity) || 1)
    };
  }).filter(Boolean);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  res.json({
    success: true,
    message: 'Order received. Thank you for shopping with Cloud Glasses!',
    total,
    items: cartItems
  });
});

const staticPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(staticPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
