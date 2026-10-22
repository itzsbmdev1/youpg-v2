import fs from 'fs';
import Database from 'better-sqlite3';

setTimeout(() => {
    try {
        const db = new Database('./data/youpi_pg.sqlite');
        console.log("\n==========================================");
        console.log("🔑 AAPKI MERCHANT ID:");
        console.log(db.prepare("SELECT id FROM merchants LIMIT 1").get().id);
        console.log("\n🔒 AAPKA WEBHOOK SECRET (MERCHANT KEY):");
        console.log(fs.readFileSync('./data/.secrets/coin_store_webhook_secret', 'utf8').trim());
        console.log("==========================================\n");
    } catch(e) {
        console.log("Keys abhi generate nahi hui: ", e.message);
    }
}, 15000);