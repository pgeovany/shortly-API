import connection from '../../databases/postgresql.js';

async function updateVisitCount(id) {
  await connection.query(
    `
      UPDATE urls SET visit_count = visit_count + 1
      WHERE id = $1
    `,
    [id]
  );
}

export default updateVisitCount;
