require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('../config/database');

async function main() {
  const args = process.argv.slice(2);
  const email = args[0] || 'admin@judge.local';
  const password = args[1] || 'Admin123!';
  const name = args[2] || 'System Administrator';

  console.log(`Setting up Admin account for: ${email}`);

  try {
    const existing = await db.query('SELECT id, role, email_verified FROM users WHERE email = $1', [email.toLowerCase()]);
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    if (existing.rows.length > 0) {
      await db.query(
        `UPDATE users 
         SET name = $1, password_hash = $2, role = 'ADMIN', email_verified = TRUE, verification_token_hash = NULL, verification_token_expiry = NULL
         WHERE id = $3`,
        [name, passwordHash, existing.rows[0].id]
      );
      console.log(`Successfully promoted existing user (ID: ${existing.rows[0].id}) to ADMIN role with verified status.`);
    } else {
      const username = email.split('@')[0];
      const result = await db.query(
        `INSERT INTO users (username, name, email, password_hash, role, email_verified)
         VALUES ($1, $2, $3, $4, 'ADMIN', TRUE)
         RETURNING id, username, email, role`,
        [username, name, email.toLowerCase(), passwordHash]
      );
      console.log(`Successfully created new ADMIN user (ID: ${result.rows[0].id}, Email: ${result.rows[0].email}).`);
    }

    console.log('\n--- Admin Credentials ---');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log(`Role: ADMIN`);
    console.log('-------------------------\n');
    process.exit(0);
  } catch (err) {
    console.error('Error creating admin account:', err);
    process.exit(1);
  }
}

main();