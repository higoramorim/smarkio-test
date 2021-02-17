const connection = require('./connection');

const getAll = async () =>
  connection.execute('SELECT * FROM comments;').then(([comment]) => comment);

const getById = async (id) =>
  connection
    .execute('SELECT * FROM comments WHERE id = ?', [id])
    .then(([[comment]]) => comment || null);

const add = async (comment) =>
  connection
    .execute('INSERT INTO comments (comment) VALUES (?)', [
      comment,
    ])
    .then(([result]) => ({ id: result.insertId, comment }));



module.exports = {
  getAll,
  getById,
  add,
};