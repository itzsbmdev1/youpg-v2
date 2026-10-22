import Database from 'better-sqlite3';
import crypto from 'crypto';
import fs from 'fs';

const db = new Database('./data/youpi_pg.sqlite');

// Naye merchant ki unique IDs generate karna
const merchantId = crypto.randomUUID();
const webhookSecret = crypto.randomBytes(32).toString('hex');
const name = "Production Live Merchant";

try {
    // Table columns ke mutabiq correct insert query
    const stmt = db.prepare(`
        INSERT INTO merchants (id, name, webhook_secret, status)
        VALUES (?, ?, ?, 'ACTIVE')
    `);
    stmt.run(merchantId, name, webhookSecret);

    console.log("\n==========================================");
    console.log("🚀 NAYA MERCHANT SUCCESSFUL CREATE HO GAYA!");
    console.log("🔑 NEW MERCHANT ID:", merchantId);
    console.log("🔒 NEW WEBHOOK SECRET (KEY):", webhookSecret);
    console.log("==========================================\n");
} catch(e) {
    console.log("❌ Error creating merchant:", e.message);
}