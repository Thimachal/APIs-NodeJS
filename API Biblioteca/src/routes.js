const express = require('express');
const {listarAutores,
    obterAutor,
    cadastrarAutor,
    atualizarAutor,
    excluirAutor} = require('./controllers/autores');
const {listarLivros,
    obterLivros,
    cadastrarLivros,
    atualizarLivros,
    excluirLivros} = require('./controllers/livros');

const routes = express();

//autores
routes.get('/autores', listarAutores);
routes.get('/autores/:id', obterAutor);
routes.post('/autores', cadastrarAutor);
routes.put('/autores/:id', atualizarAutor);
routes.delete('/autores/:id', excluirAutor);

//livros
routes.get('/livros', listarLivros);
routes.get('/livros/:id', obterLivros);
routes.post('/livros', cadastrarLivros);
routes.put('/livros/:id', atualizarLivros);
routes.delete('/livros/:id', excluirLivros);

module.exports = routes;