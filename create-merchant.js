import Database from 'better-sqlite3';
import crypto from 'crypto';

const db = new Database('./data/youpi_pg.sqlite');

// Naye merchant ki details
const merchantId = crypto.randomUUID();
const webhookSecret = crypto.randomBytes(32).toString('hex');
const name = "My Real Live Merchant";

try {
    const stmt = db.prepare(`
        INSERT INTO merchants (id, name, webhook_secret, status, created_at)
        VALUES (?, ?, ?, 'ACTIVE', datetime('now'))
    `);
    stmt.run(merchantId, name, webhookSecret);

    console.log("\n==========================================");
    console.log("🚀 NAYA MERCHANT SUCCESSFUL CREATE HO GAYA!");
    console.log("🔑 NEW MERCHANT ID:", merchantId);
    console.log("🔒 NEW WEBHOOK SECRET:", webhookSecret);
    console.log("==========================================\n");
} catch(e) {
    console.log("❌ Error creating merchant:", e.message);
}