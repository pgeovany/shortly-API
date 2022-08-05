import connection from '../../databases/postgresql.js';

async function saveUrl(userId, url, shortUrl) {
  await connection.query(
    `
      INSERT INTO urls (user_id, url, short_url)
      VALUES ($1, $2, $3)
    `,
    [userId, url, shortUrl]
  );
}

export default saveUrl;
