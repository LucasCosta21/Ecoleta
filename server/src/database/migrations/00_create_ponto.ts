import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('pontos', table => {
        table.increments('id').primary();
        table.string('caminho_imagem').notNullable();
        table.string('nome').notNullable();
        table.string('email').notNullable();
        table.string('numero').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('cidade').notNullable();
        table.string('uf', 2).notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('point');
}