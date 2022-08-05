import connection from '../../databases/postgresql.js';

async function getUrlByShortUrl(shortUrl) {
  const { rows } = await connection.query(
    `
      SELECT id, url, visit_count
      FROM urls
      WHERE short_url = $1
    `,
    [shortUrl]
  );

  if (rows.length === 0) {
    return false;
  }

  return rows[0];
}

export default getUrlByShortUrl;
