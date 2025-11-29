// Node script: Seed DB from assets/images/food directory
// Usage: DATABASE_URL=postgres://user:pass@host:port/db npm run db:seed:assets

const fs = require('fs');
const path = require('path');
const {Client} = require('pg');

// Directory with images inside project
const ASSETS_DIR = path.resolve(__dirname, '../../assets/images/food');

function humanizeName(file) {
    const base = file.replace(/\.[^.]+$/, '');
    return base
        .split(/[\-_]+/)
        .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
        .join(' ');
}

function detectCategory(file) {
    const f = file.toLowerCase();
    const wet = ['bun', 'bún', 'pho', 'phở', 'mi', 'mì', 'hu-tieu', 'hu_tieu', 'hủ-tiếu', 'hủ_tiếu', 'mi-quang', 'mi_quang', 'mì-quảng', 'mì_quảng'];
    if (wet.some((k) => f.includes(k))) return 'Bún, mì, phở';
    return 'Cơm';
}

// Helper to generate random ratings (like provided Python)
function randomRating() {
    const val = Math.random() * (4.9 - 4.2) + 4.2;
    return Math.round(val * 10) / 10;
}

function randomCount() {
    return Math.floor(Math.random() * (450 - 20 + 1)) + 20;
}

// Price heuristics by keyword
function guessPrices(file) {
    const f = file.toLowerCase();
    const money = (n) => Number(n);
    if (f.includes('pho')) return {gia_vua: money(55000), gia_lon: money(65000), is_kich_co: true};
    if (f.includes('bun')) return {gia_vua: money(45000), gia_lon: money(55000), is_kich_co: true};
    if (f.includes('hu-tieu') || f.includes('hu_tieu') || f.includes('hủ-tiếu') || f.includes('hủ_tiếu'))
        return {gia_vua: money(40000), gia_lon: money(50000), is_kich_co: true};
    if (f.includes('banh-mi') || f.includes('bánh-mì')) return {gia_vua: money(25000), is_kich_co: false};
    if (f.includes('banh-xeo') || f.includes('bánh-xèo')) return {gia_vua: money(35000), is_kich_co: false};
    if (f.includes('com') || f.includes('cơm')) return {gia_vua: money(45000), is_kich_co: false};
    // default
    return {gia_vua: money(45000), is_kich_co: false};
}

async function main() {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
        console.error('DATABASE_URL is not set.');
        process.exit(1);
    }

    // Read files
    let files = [];
    try {
        files = fs
            .readdirSync(ASSETS_DIR)
            .filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f));
    } catch (e) {
        console.error('Cannot read assets directory:', ASSETS_DIR);
        process.exit(1);
    }

    if (files.length === 0) {
        console.log('No image files found in', ASSETS_DIR);
        return;
    }

    const client = new Client({connectionString: databaseUrl});
    try {
        await client.connect();
        await client.query('BEGIN');

        for (const file of files) {
            const ten_mon_an = humanizeName(file);
            const loai_mon_an = detectCategory(file);
            const {gia_vua, gia_lon = null, is_kich_co} = guessPrices(file);
            const hinh_anh = `/assets/images/food/${file}`; // store relative project path
            const rating = randomRating();
            const count = randomCount();

            await client.query(
                `INSERT INTO mon_an (loai_mon_an, ten_mon_an, mo_ta, hinh_anh,
                                     gia_nho, gia_vua, gia_lon, gia_mac_dinh,
                                     is_kich_co, is_hien_thi, thu_tu_hien_thi,
                                     diem_danh_gia_trung_binh, so_luot_danh_gia)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) ON CONFLICT DO NOTHING`,
                [
                    loai_mon_an,
                    ten_mon_an,
                    null,
                    hinh_anh,
                    null,
                    gia_vua,
                    gia_lon,
                    gia_vua,
                    is_kich_co,
                    true,
                    0,
                    rating,
                    count,
                ]
            );
        }

        await client.query('COMMIT');
        console.log('Seed from assets completed. Inserted/ignored', files.length, 'items.');
    } catch (err) {
        await client.query('ROLLBACK').catch(() => {
        });
        console.error('Seed from assets failed:', err.message);
        process.exitCode = 1;
    } finally {
        await client.end();
    }
}

main();
