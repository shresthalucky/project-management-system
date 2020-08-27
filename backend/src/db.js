import Knex from 'knex';
import Bookshelf from 'bookshelf';

const connection = Knex({
  client: 'pg',
  connection: process.env.DB_URL
});

const bookshelf = Bookshelf(connection);

export default bookshelf;
