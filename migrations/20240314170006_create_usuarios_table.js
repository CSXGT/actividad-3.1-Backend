exports.up = function(knex) {
  return knex.schema.createTable('usuarios', function(table) {
    table.integer('id').primary();
    table.string('nombre').notNullable();
    table.string('correo').notNullable();
    table.enum('rol', ['Profesor', 'Director']).notNullable();
    table.integer('activo').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('usuarios');
};
