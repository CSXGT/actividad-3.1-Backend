exports.up = function(knex) {
  return knex.schema.createTable('eventos', function(table) {
    table.integer('id').primary();
    table.string('tipo').nullable();
    table.date('fecha').nullable();
    table.integer('materia_id').nullable();
    table.integer('seccion_id').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('eventos');
};
