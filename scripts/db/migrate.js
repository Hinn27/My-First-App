// Node script: Run PostgreSQL migration using sql/schema.sql
// Usage: DATABASE_URL=postgres://user:pass@host:port/db npm run db:migrate

const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('DATABASE_URL is not set.');
    process.exit(1);
  }

  const sqlPath = path.resolve(__dirname, '../../sql/schema.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');

  const client = new Client({ connectionString: databaseUrl });
  try {
    await client.connect();
    await client.query('BEGIN');
    await client.query(sql);
    await client.query('COMMIT');
    console.log('Migration completed successfully.');
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {});
    console.error('Migration failed:', err.message);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

main();
