import connection from '../../databases/postgresql.js';

async function getUrlById(id) {
  const { rows } = await connection.query(
    `
      SELECT id, short_url AS "shortUrl", url, user_id
      FROM urls
      WHERE id = $1
    `,
    [id]
  );

  if (rows.length === 0) {
    return false;
  }

  return rows[0];
}

export default getUrlById;
