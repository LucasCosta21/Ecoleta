import Knex from 'knex';

export async function seed(knex: Knex){
    await knex('itens').insert([
        { nome: 'Lâmpadas', caminho_imagem: 'lampadas.svg' },
        { nome: 'Pilhas e Baterias', caminho_imagem: 'baterias.svg' },
        { nome: 'Papeis e Papelão', caminho_imagem: 'papeis-papelao.svg' },
        { nome: 'Resíduos Eletrônicos', caminho_imagem: 'eletronicos.svg' },
        { nome: 'Resíduos Orgânicos', caminho_imagem: 'organicos.svg' },
        { nome: 'Óleo de Cozinha', caminho_imagem: 'oleo.svg' }
    ]);
}