import bcrypt from 'bcrypt';
import connection from '../databases/postgresql.js';

async function getUserByEmail(email) {
  const { rows } = await connection.query(
    `
      SELECT * FROM users WHERE email = $1
    `,
    [email]
  );

  if (rows.length === 0) {
    return false;
  }

  return rows[0];
}

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

async function getUserVisitCount(id) {
  const { rows } = await connection.query(
    `
      SELECT users.id, users.name, COUNT (urls.visit_count) as "visitCount"
      FROM users
      JOIN urls
      ON urls.user_id = $1
      GROUP BY users.id;
    `,
    [id]
  );

  return rows[0];
}

const userRepository = {
  getUserByEmail,
  createUserAccount,
  getUserVisitCount,
};

export default userRepository;
