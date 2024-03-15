exports.up = function(knex) {
  return knex.schema.createTable('secciones', function(table) {
    table.integer('id').primary();
    table.string('nombre').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('secciones');
};
