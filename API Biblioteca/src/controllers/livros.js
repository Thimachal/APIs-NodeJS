const conection = require('../conection');

const listarLivros = async (req, res) => {
    try {
        const{rows: livros} = await conection.query('select * from livros');

        return res.status(200).json(livros);
        
    } catch (error) {
        res.status(400).send(error.message);
    }

};

const obterLivros = async (req, res) => {
    const {id} = req.params;
    try {
        const livro = await query('select * from livros where id = $1', [id]);

        if (livro.rowCount === 0) {
            return res.status(404).json('Nenhum livro encontrado');
        }

        return res.status(200).json(livro.rows[0]);
        
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const cadastrarLivros = async (req, res) => {
    const {autor_id, nome, editora, genero, data_publicacao} = req.body;
    try {
        
        const livro = await conection.query('insert into livros (autor_id, nome, editora, genero, data_publicacao) values ($1, $2, $3, $4, $5)', [autor_id, nome, editora, genero, data_publicacao]);

        if (livro.rowCount === 0) {
            return res.status(400).json('Não foi possível inserir o livro');
        }

        res.status(201).json('livro cadastrado');


    } catch (error) {
        res.status(400).send(error.message);
    }
};

const atualizarLivros = async (req, res) => {
    const {id} = req.params;
    const {autor_id, nome, editora, genero, data_publicacao} = req.body;
    try {
        const livro = await conection.query('select from livros where id = $1', [id]);

        if (livro.rowCount === 0) {
            return res.status(404).json('Nenhum livro encontrado');
        }



       const livroAtualziado = await query ('update livros set autor_id = $1, nome = $2, editora = $3, genero = $4, data_publicacao = $5 where id = $6', [autor_id, nome, editora, genero, data_publicacao, id]);

        return res.status(200).json('Livro Atualizado');
        
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const excluirLivros = async (req, res) => {
    const {id} = req.params;
    try {
        const livro = await query('select * from livros where id = $1', [id]);
        if (livro.rowCount === 0) {
            return res.status(404).json('Nenhum livro encontrado');
        }
        const livroExcluido = await query('delete from livros where id = $1', [id]);

        if (livroExcluido.rowCount === 0) {
            return res.status(400).json('Não foi possível excluir o livro');
        }
        return res.status(200).json('Livro Excluido');
    } catch (error) {
        res.status(400).send(error.message);
    }
};
module.exports = {
   listarLivros,
    obterLivros,
    cadastrarLivros,
    atualizarLivros,
    excluirLivros
};