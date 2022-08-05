import connection from '../../databases/postgresql.js';

async function deleteUrlById(id) {
  await connection.query(
    `
      DELETE FROM urls 
      WHERE id = $1
    `,
    [id]
  );
}

export default deleteUrlById;
