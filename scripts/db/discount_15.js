// Node script: Apply 15% discount to all prices in mon_an table
// Usage: DATABASE_URL=postgres://user:pass@host:port/db npm run db:discount:15

const { Client } = require('pg');

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('DATABASE_URL is not set.');
    process.exit(1);
  }

  const client = new Client({ connectionString: databaseUrl });
  try {
    await client.connect();
    await client.query('BEGIN');
    // Reduce numeric columns by 15% where present
    await client.query(`
      UPDATE mon_an SET
        gia_nho = CASE WHEN gia_nho IS NOT NULL THEN ROUND(gia_nho * 0.65)::DECIMAL(10,0) ELSE NULL END,
        gia_vua = CASE WHEN gia_vua IS NOT NULL THEN ROUND(gia_vua * 0.65)::DECIMAL(10,0) ELSE NULL END,
        gia_lon = CASE WHEN gia_lon IS NOT NULL THEN ROUND(gia_lon * 0.65)::DECIMAL(10,0) ELSE NULL END,
        gia_mac_dinh = CASE WHEN gia_mac_dinh IS NOT NULL THEN ROUND(gia_mac_dinh * 0.65)::DECIMAL(10,0) ELSE NULL END;
    `);
    await client.query('COMMIT');
    console.log('Applied 15% discount to all dish prices.');
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {});
    console.error('Discount script failed:', err.message);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

main();
