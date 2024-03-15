exports.up = function(knex) {
  return knex.schema.createTable('profesores_materias', function(table) {
    table.integer('profesor_id').notNullable();
    table.integer('materia_id').notNullable();
    table.primary(['profesor_id', 'materia_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('profesores_materias');
};
