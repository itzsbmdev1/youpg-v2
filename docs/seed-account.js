import Database from 'better-sqlite3';
import fs from 'fs';

const dbPath = './data/youpi_pg.sqlite';

try {
    // Check karein ki database file bani hai ya nahi
    if (fs.existsSync(dbPath)) {
        const db = new Database(dbPath);
        
        // Receiving account ko automatically insert/update kar dein
        const stmt = db.prepare(`
            INSERT OR REPLACE INTO receiving_accounts (id, merchant_id, upi_vpa, payee_name, status)
            VALUES ('acc_sbm_01', '00000000-0000-0000-0000-000000000001', 'sbmtechbro@oksbi', 'SBM Tech', 'ACTIVE')
        `);
        stmt.run();
        console.log("✅ Receiving account sbmtechbro@oksbi successfully seeded!");
    } else {
        console.log("⏳ Database not found yet, skipping seed.");
    }
} catch (e) {
    console.log("❌ Error seeding receiving account:", e.message);
}