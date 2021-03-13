# Navedex API
Solução para o [desafio](https://github.com/naveteam/back-end-challenge) de back-end da Nave.

## Instalação
Rodar dentro do diretório do projeto para instalar as dependências necessárias:
```bash
yarn
```

## Configuração
O arquivo *ormconfig.json* contem as configuração de conexão com o banco de dados.
O campo *database* é referente ao nome da base de dados dentro do BD (por padrão
o BD vem com o *public*)

O projeto possui um arquivo no formato json para importação da API no Insomnia.

Após login, alterar a variável de ambiente *token* para a correta utilização das rotas.

## Uso

Inicializando o servidor local
```bash
yarn dev:server
```

## Rotas

> Os dados de filtragem das rotas Index são pegos via parametros Query

**Autenticação**
- Cadastro: `POST /signup`
- Login: `POST /login`

**Naver**
- Index: `GET /navers`
  > A busca por tempo de empresa está em meses
- Show: `GET /navers/:id`
- Store: `POST /navers`
- Update: `PUT /navers/:id`
- Delete: `DELETE /navers/:id`

**Project**
- Index: `GET /projects`
- Show: `GET /projects/:id`
- Store: `POST /projects`
- Update: `PUT /projects/:id`
- Delete: `DELETE /projects/:id`
