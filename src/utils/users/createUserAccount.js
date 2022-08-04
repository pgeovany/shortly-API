import bcrypt from 'bcrypt';
import connection from '../../databases/postgresql.js';

async function createUserAccount({ name, email, password }) {
  const SALT = 10;
  const passwordHash = bcrypt.hashSync(password, SALT);

  await connection.query(
    `
      INSERT INTO users (name, email, password) VALUES ($1, $2, $3)
    `,
    [name, email, passwordHash]
  );
}

export default createUserAccount;
