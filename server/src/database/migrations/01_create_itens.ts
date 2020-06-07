import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('itens', table => {
        table.increments('id').primary();
        table.string('caminho_imagem').notNullable();
        table.string('nome').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('itens');
}