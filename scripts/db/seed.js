// Node script: Seed PostgreSQL with sample foods
// Usage: DATABASE_URL=postgres://user:pass@host:port/db npm run db:seed

const {Client} = require('pg');

// Helper to generate random ratings (replicates provided Python)
function randomRating() {
    const min = 4.2;
    const max = 4.9;
    const val = Math.random() * (max - min) + min;
    return Math.round(val * 10) / 10; // one decimal
}

function randomCount() {
    return Math.floor(Math.random() * (450 - 20 + 1)) + 20;
}

// Sample items (can be extended or replaced)
const items = [
    {
        loai_mon_an: 'Bún, mì, phở',
        ten_mon_an: 'Phở Bò',
        mo_ta:
            'Phở bò truyền thống Hà Nội với nước dùng hầm xương 12 tiếng, thịt bò tươi mềm và bánh phở dai ngon.',
        hinh_anh: '/images/pho_bo.jpg',
        gia_nho: null,
        gia_vua: 50000,
        gia_lon: 65000,
        gia_mac_dinh: 55000,
        is_kich_co: true,
        is_hien_thi: true,
        thu_tu_hien_thi: 10,
    },
    {
        loai_mon_an: 'Bún, mì, phở',
        ten_mon_an: 'Bún Chả',
        mo_ta:
            'Bún chả Hà Nội đặc sản với thịt nướng than hoa thơm phức, nước mắm chua ngọt.',
        hinh_anh: '/images/bun_cha.jpg',
        gia_nho: null,
        gia_vua: 45000,
        gia_lon: 55000,
        gia_mac_dinh: 45000,
        is_kich_co: true,
        is_hien_thi: true,
        thu_tu_hien_thi: 20,
    },
    {
        loai_mon_an: 'Cơm',
        ten_mon_an: 'Cơm Tấm Sườn',
        mo_ta:
            'Cơm tấm sườn nướng Sài Gòn với sườn non ướp vừa vặn, nướng thơm lừng. Ăn kèm bì chả và nước mắm chua ngọt.',
        hinh_anh: '/images/com_tam_suon.jpg',
        gia_nho: null,
        gia_vua: 45000,
        gia_lon: null,
        gia_mac_dinh: 45000,
        is_kich_co: false,
        is_hien_thi: true,
        thu_tu_hien_thi: 30,
    },
];

async function main() {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
        console.error('DATABASE_URL is not set.');
        process.exit(1);
    }
    const client = new Client({connectionString: databaseUrl});
    try {
        await client.connect();
        await client.query('BEGIN');

        for (const item of items) {
            const rating = randomRating();
            const count = randomCount();
            await client.query(
                `INSERT INTO mon_an (loai_mon_an, ten_mon_an, mo_ta, hinh_anh,
                                     gia_nho, gia_vua, gia_lon, gia_mac_dinh,
                                     is_kich_co, is_hien_thi, thu_tu_hien_thi,
                                     diem_danh_gia_trung_binh, so_luot_danh_gia)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) ON CONFLICT DO NOTHING`,
                [
                    item.loai_mon_an,
                    item.ten_mon_an,
                    item.mo_ta,
                    item.hinh_anh,
                    item.gia_nho,
                    item.gia_vua,
                    item.gia_lon,
                    item.gia_mac_dinh ?? item.gia_vua,
                    item.is_kich_co,
                    item.is_hien_thi,
                    item.thu_tu_hien_thi ?? 0,
                    rating,
                    count,
                ]
            );
        }

        await client.query('COMMIT');
        console.log('Seed completed successfully.');
    } catch (err) {
        await client.query('ROLLBACK').catch(() => {
        });
        console.error('Seed failed:', err.message);
        process.exitCode = 1;
    } finally {
        await client.end();
    }
}

main();
