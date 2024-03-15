exports.up = function(knex) {
  return knex.schema.createTable('auth', function(table) {
    table.integer('id').primary();
    table.string('usuario').notNullable();
    table.string('password').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('auth');
};