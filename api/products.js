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

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.json({
    shopName: 'Cloud Glasses',
    description: 'Simple, stylish eyewear for every day.',
    products
  });
}
