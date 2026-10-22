import fs from 'fs';
import Database from 'better-sqlite3';

console.log("⏳ Waiting 10 seconds for database initialization...");

setTimeout(() => {
    console.log("\n==========================================");
    console.log("🔍 ATTEMPTING TO READ KEYS NOW...");
    
    try {
        const dbPath = './data/youpi_pg.sqlite';
        if (fs.existsSync(dbPath)) {
            const db = new Database(dbPath);
            const merchant = db.prepare("SELECT id FROM merchants LIMIT 1").get();
            console.log("🔑 MERCHANT ID:", merchant ? merchant.id : "Merchant table empty");
        } else {
            console.log("❌ Database file still not found at:", dbPath);
        }
    } catch(e) {
        console.log("❌ DB Error:", e.message);
    }

    try {
        const secretPath = './data/.secrets/coin_store_webhook_secret';
        if (fs.existsSync(secretPath)) {
            const secret = fs.readFileSync(secretPath, 'utf8').trim();
            console.log("🔒 WEBHOOK SECRET (MERCHANT KEY):", secret);
        } else {
            console.log("❌ Secret file still not found at:", secretPath);
        }
    } catch(e) {
        console.log("❌ Secret Error:", e.message);
    }
    console.log("==========================================\n");
}, 10000); // 10 second ka gap taaki database ready ho jaye