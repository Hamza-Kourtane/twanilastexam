const products = [
  { id: 'gl-01', name: 'Aviator Shine', price: 129, short: 'Light metal aviator frame', description: 'A classic aviator style with polished metal details and comfortable nose pads.', color: '#f4f1e6' },
  { id: 'gl-02', name: 'Round Retro', price: 99, short: 'Vintage round glasses', description: 'Soft round lenses with a retro-inspired frame for modern daily wear.', color: '#eef8ff' },
  { id: 'gl-03', name: 'Square Bold', price: 145, short: 'Bold square acetate frame', description: 'A statement frame with strong lines and a refined matte finish.', color: '#fff6f2' },
  { id: 'gl-04', name: 'Minimal Clear', price: 119, short: 'Minimal transparent frame', description: 'Lightweight translucent frame that pairs with any outfit and face shape.', color: '#f5f7f9' }
];

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const items = Array.isArray(req.body.items) ? req.body.items : [];
  const cartItems = items.map((item) => {
    const product = products.find((p) => p.id === item.id);
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
}
