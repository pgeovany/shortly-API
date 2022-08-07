import connection from '../databases/postgresql.js';

async function saveUrl(userId, url, shortUrl) {
  await connection.query(
    `
      INSERT INTO urls (user_id, url, short_url)
      VALUES ($1, $2, $3)
    `,
    [userId, url, shortUrl]
  );
}

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

async function updateVisitCount(id) {
  await connection.query(
    `
      UPDATE urls SET visit_count = visit_count + 1
      WHERE id = $1
    `,
    [id]
  );
}

async function deleteUrl(id) {
  await connection.query(
    `
      DELETE FROM urls 
      WHERE id = $1
    `,
    [id]
  );
}

async function getUrlsByUserId(userId) {
  const { rows } = await connection.query(
    `
      SELECT id, short_url AS "shortUrl", url, 
      visit_count AS "vistiCount" 
      FROM urls
      WHERE urls.user_id = $1;
    `,
    [userId]
  );

  return rows;
}

const urlsRepository = {
  saveUrl,
  getUrlById,
  getUrlByShortUrl,
  updateVisitCount,
  deleteUrl,
  getUrlsByUserId,
};

export default urlsRepository;
