<h1 align="center">
    <img alt="Ecologia" title="#Ecologia" src="./readmeAssets/ecologia.svg" width="250px" />
</h1>

<h4 align="center"> 
	Solução digital proposta na Next Level Week da rocketseat que facilita a coleta seletiva
</h4>
<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/LucasCosta21/Ecoleta?color=%2304D361">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/LucasCosta21/Ecoleta">
	
  <a href="https://www.linkedin.com/in/lucas-costa-44b4a9175/">
    <img alt="Made by Lucas Costa" src="https://img.shields.io/badge/made%20by-LucasCosta-%2304D361">
  </a>

  <a href="https://github.com/DanielObara/NLW-1.0/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/LucasCosta21/Ecoleta">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
   <a href="https://github.com/LucasCosta21/Ecoleta/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/LucasCosta21/Ecoleta?style=social">
  </a>
</p>

<p align="center">
  <a href="#Introdução">Introdução</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Rodando">Rodando</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Arquitetura">Arquitetura</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Fontes">Fontes</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

## Introdução
A solução neste repositório, é uma implementação do aplicativo, web page e API propostos na 1º NLW (Next Level Week). Obrigado equipe da rocketseat, pela enorme oportunidade dada por vocês, para que dev's de todo o Brasil possam aprender tecnologias atuais e com grande uso no mercado!
Este conjunto de aplicações permite aos usuários o cadastro de pontos de coleta via uma página web, construida em ReactJS. Os pontos cadastrados nesta página podem ser buscados posteriormente no app mobile, feito em React Native. Todas essas telas são integradas e interfaceadas via API, também disponível neste repositório, construída em node com auxílio do express.js.

## Rodando

É necessário que você tenha o node instalado em sua máquina -> https://nodejs.org/en/download/

após baixar o repositório, a primeira coisa à se fazer é abrir a pasta server em uma janela do cmd (Pode-se usar o comando `cd nome do diretório`, para facilitar a navegação até o diretório). Uma vez dentro da pasta, deverão ser executados dois comandos para começar à executar a API:

`npm install` -> para a instalação das dependências da api

`npm run dev` -> para a execução do programa no ambiente node

A partir do momento em que a API está rodando, tanto nosso app mobile, quanto nossa página web já estarão disponíveis para uso. Começando pela página web, primeiro, com outra janela do cmd, navegue até a pasta web, e rode os seguintes comandos:
	
`npm install` -> para a instalação das dependências do Front-end

`npm start` -> para a execução do React

Após cadastrar alguns pontos na página web, você já pode visualizá-los no app, mas para isso, você precisará do aplicativo Expo instalado em seu celular, você pode instalá-los nos seguintes links:

<a href="https://play.google.com/store/apps/details?id=host.exp.exponent&hl=pt_BR">Android</a>

<a href="https://apps.apple.com/br/app/expo-client/id982107779">IOS</a>
	
Após a instalação do app em seu dispositivo, entre na pasta AppMobile em uma janela do cmd, e rode os mesmos comandos rodados na pasta da página web. Após rodar o segundo comando, aguarde o carregamento de um QR code no cmd onde foi rodado o comando, com o app Expo aberto na opção de rastrear QR code no celular, escaneie o código e aguarde o carregamento do app!!.
	
## Arquitetura

Este sistema apresenta uma arquitetura relativamente simples. No back-end são utilizadas as patterns de controllers e services, que se mostraram suficientes para manter uma boa modularização, e simultaneamente, uma facilidade.
No Front-end foram utilizadas as ferramentas do Redux, a implementação da arquitetura Flux do React, junto de algumas práticas de programação funcional. Desta forma, a troca reativa de dados na aplicação se manteve simples, devido também à pouca quantidade de dados que são utilizados por toda a aplicação

Fluxo básico dos dados.
![data flow](/readmeAssets/dataFlow.png)

Para o armazenamento dos dados, foi utilizado o Sqlite 3, devido à grande facilidade e rapidez que esta ferramenta proporciona.

DER do banco sqlite 3 utilizado na implementação.

![der](/readmeAssets/EcoletaDER.png)
	
## Tecnologias
Project is created with:
* Node: 13.6.0
* React: 16.13.1
* Typescript: 3.9.3
* express: 4.17.1
* knex: 0.21.1
* sqlite3: 4.2.0

## Fontes

* <div>Ícone do início do repositório feito por <a href="https://www.flaticon.com/br/autores/roundicons" title="Roundicons">Roundicons</a> from <a href="https://www.flaticon.com/br/" title="Flaticon">www.flaticon.com</a></div>
* Uma implementação da 1º Next Level Week, by -> https://rocketseat.com.br/
