import connection from '../../databases/postgresql.js';

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

export default getUserByEmail;
