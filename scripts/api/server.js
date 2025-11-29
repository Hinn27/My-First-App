// Simple Express API to expose dishes from PostgreSQL and serve images
// Usage: DATABASE_URL=postgres://user:pass@host:port/db node scripts/api/server.js

const express = require('express');
const path = require('path');
const { Client } = require('pg');

const PORT = process.env.PORT || 4000;
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL is not set. Please export it before starting the API.');
  process.exit(1);
}

const app = express();

// Minimal CORS for Expo client
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Serve static assets from project ./assets under /assets
const ASSETS_DIR = path.resolve(__dirname, '../../assets');
app.use('/assets', express.static(ASSETS_DIR));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Build absolute URL for image path stored in DB
function buildImageUrl(req, hinh_anh) {
  if (!hinh_anh) return null;
  if (/^https?:\/\//i.test(hinh_anh)) return hinh_anh; // already a URL
  // Ensure it starts with '/'
  const rel = hinh_anh.startsWith('/') ? hinh_anh : `/${hinh_anh}`;
  const base = `${req.protocol}://${req.get('host')}`;
  return `${base}${rel}`;
}

// Map DB row to app product shape
function mapRowToProduct(req, row, index) {
  const prices = [];
  // Respect sizes if enabled
  if (row.is_kich_co) {
    if (row.gia_nho != null) prices.push({ size: 'S', price: String(row.gia_nho), currency: 'đ', quantity: 1 });
    if (row.gia_vua != null) prices.push({ size: 'M', price: String(row.gia_vua), currency: 'đ', quantity: 1 });
    if (row.gia_lon != null) prices.push({ size: 'L', price: String(row.gia_lon), currency: 'đ', quantity: 1 });
  } else {
    const p = row.gia_mac_dinh ?? row.gia_vua ?? row.gia_lon ?? row.gia_nho ?? 0;
    prices.push({ size: 'M', price: String(p), currency: 'đ', quantity: 1 });
  }

  return {
    id: row.id,
    name: row.ten_mon_an,
    description: row.mo_ta || '',
    roasted: '',
    imageIcon: '',
    imagelink_square: buildImageUrl(req, row.hinh_anh),
    special_ingredient: row.mo_ta || '',
    ingredients: '',
    prices,
    average_rating: row.diem_danh_gia_trung_binh ?? 0,
    ratings_count: row.so_luot_danh_gia ?? 0,
    favourite: false,
    type: 'Food',
    category: row.loai_mon_an,
    index,
  };
}

app.get('/api/dishes', async (req, res) => {
  const client = new Client({ connectionString: DATABASE_URL });
  try {
    await client.connect();
    const result = await client.query(
      `SELECT id, loai_mon_an, ten_mon_an, mo_ta, hinh_anh,
              gia_nho, gia_vua, gia_lon, gia_mac_dinh,
              is_kich_co, is_hien_thi, thu_tu_hien_thi,
              diem_danh_gia_trung_binh, so_luot_danh_gia
         FROM mon_an
        WHERE is_hien_thi = TRUE
        ORDER BY thu_tu_hien_thi NULLS FIRST, ten_mon_an`
    );
    const items = result.rows.map((row, i) => mapRowToProduct(req, row, i));
    res.json(items);
  } catch (e) {
    console.error('Query failed:', e.message);
    res.status(500).json({ error: 'failed_to_query' });
  } finally {
    try { await client.end(); } catch {}
  }
});

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
