exports.up = function(knex) {
  return knex.schema.createTable('profesores', function(table) {
    table.integer('id').primary();
    table.string('nombre').nullable();
    table.string('apellido').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('profesores');
};
