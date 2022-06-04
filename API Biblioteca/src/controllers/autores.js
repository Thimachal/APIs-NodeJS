const conection = require('../conection');

const listarAutores = async (req, res) => {
   
    try {
        const{rows: autores} = await conection.query('select * from autores');

                return res.status(200).json(autores);
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

const obterAutor = async (req, res) => {
    const {id} = req.params;
    try {
        const autor = await conection.query('select * from autores where id = $1', [id]);

        if (autor.rowCount === 0) {
            return res.status(404).json('Nenhum autor encontrado');
        }

        return res.status(200).json(autor.rows[0]);
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

const cadastrarAutor = async (req, res) => {
    const {nome, idade} = req.body;
    try {
        if(!nome){
            return res.status(400).json('O nome é obrigatório');
        }
        if(idade < 0){
            return res.status(400).json('A idade não é permitida');
        }
        
        //inserindo o autor é bem aqui

        const autor = await conection.query('insert into autores (nome, idade) values ($1, $2)', [nome, idade]);

        if (autor.rowCount === 0) {
            return res.status(400).json('Não foi possível inserir o autor');
        }

        res.status(201).json('autor cadastrado');

    } catch (error) {
        return res.status(400).send(error.message);
    }
};

const atualizarAutor = async (req, res) => {
    const {id} = req.params;
    const {nome, idade} = req.body;
    try {
        const autor = await conection.query('select * from autores where id = $1', [id]);
        if(!nome){
            return res.status(400).json('O nome é obrigatório');
        }

        if (autor.rowCount === 0) {
            return res.status(404).json('Nenhum autor encontrado');
        }

        const autorAtualizado = await conection.query('update autores set nome = $1, idade = $2 where id = $3' , [nome, idade, id]);

        if (autorAtualizado.rowCount === 0) {
            return res.status(400).json('Não foi possível atualizar o autor');
        }

        return res.status(200).json('Autor foi atualizado!');
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

const excluirAutor = async (req, res) => {
    const {id} = req.params;
    
    try {
        const autor = await conection.query('select * from autores where id = $1', [id]);

        if (autor.rowCount === 0) {
            return res.status(404).json('Nenhum autor encontrado');
        }

        const autorExcluido = await conection.query('delete from autores where id = $1', [id]);

        if (autorExcluido.rowCount === 0) {
            return res.status(400).json('Não foi possível excluir o autor');
        }

        return res.status(200).json('Autor foi excluido!');
    } catch (error) {
        return res.status(400).send(error.message);
    }
};
module.exports = {
    listarAutores,
    obterAutor,
    cadastrarAutor,
    atualizarAutor,
    excluirAutor
};