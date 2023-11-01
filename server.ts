import express, {json} from "express";
import mysql from "mysql2";

const conexao = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "hotel"
});

const app = express();
app.use(json());
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(3000, ()=>{
    console.log('Conectado corretamente!');
})

/**
 * REALIZANDO UMA CONSULTA NO BANCO DE DADOS PELO BACKEND
 */

/**
 * Fazedo Busca dados funcionario
 */
app.get('/funcionario', (req, res)=>{

    const consulta = "SELECT funcionario.nome,funcionario.cargo FROM hotel.funcionario;";

    conexao.query(consulta, (erro, resultado) => {
    if(erro){
        console.log(erro)
        res.status(404).json({'erro':erro});
    } else{
        res.status(200).json(resultado);
    }
})
})

/**
 * Cadastrando os dados dos funcionario 
 */ 
app.post('/cadastrar', (req, res)=>{
    const dados = req.body;

    const sql = "INSERT INTO hotel.funcionario SET ?;"

    conexao.query(sql, dados,(erro, resultado) => {
        if(erro){
            console.log(erro)
            res.status(400).json({'erro':erro});
        } else{
            res.status(201).json(resultado);
        }
    })
})

/**
 * Fazendo Busca por ID 
 */

app.get('/funcionario/:id', (req, res)=>{
    
    const id = req.params.id
    const sql = "SELECT * FROM hotel.funcionario WHERE idFuncionario =?;"

    conexao.query(sql,id,(erro, resultado) => {
        if(erro){
            console.log(erro)
            res.status(404).json({'erro':erro});
        } else{
            res.status(200).json(resultado);
        }
    })
})

/**
 * Alterando os dados de funcionario
 */

app.put('/alterar/:id', (req, res)=>{
    
    const id = req.params.id
    const dados = req.body; 
    const sql = "UPDATE funcionario SET ? WHERE idFuncionario =?;"

    conexao.query(sql,[dados,id],(erro, resultado) => {
        if(erro){
            console.log(erro)
            res.status(404).json({'erro':erro});
        } else{
            res.status(200).json(resultado);
        }
    })
})

/**
 * Deletando dados de funcionario por ID
 */

app.delete('/excluir/:id', (req, res)=>{
    
    const id = req.params.id    
    const sql = "DELETE FROM hotel.funcionario WHERE idFuncionario =?;"

    conexao.query(sql,id,(erro, resultado) => {
        if(erro){
            console.log(erro)
            res.status(404).json({'erro':erro});
        } else{
            res.status(201).json(resultado);
        }
    })
})

// =================================================================

/**
 * Recuperando os dados da tabela chamado
 */
app.get('/chamado', (req, res)=>{

    const consulta = "select idchamado, descricao, data_abertura, data_fechamento, status from hotel.chamado;";

    conexao.query(consulta, (erro, resultado) => {
        if(erro){
            console.log(erro)
            res.status(404).json({'erro':erro});
        } else{
            res.status(200).json(resultado);
        }
    })
})

/**
 * Inserindo os dados da tabela chamado
 */
app.post('/cadastrarchamados', (req, res)=>{

    const dados = req.body;
    const sql = "INSERT INTO hotel.chamado SET ?;"

    conexao.query(sql, dados,(erro, resultado) => {
        if(erro){
            console.log(erro)
            res.status(400).json({'erro':erro});
        } else{
            res.status(201).json(resultado);
        }
    })
})

/**
 * Buscar chamado po ID
 */
app.get('/chamado/:id', (req, res)=>{
    
    const id = req.params.id
    const sql = "SELECT * FROM hotel.chamado WHERE idchamado =?;"

    conexao.query(sql,id,(erro, resultado) => {
        if(erro){
            console.log(erro)
            res.status(404).json({'erro':erro});
        } else{
            res.status(200).json(resultado);
        }
    })
})

/**
 * Alterar dados do chamado
 */
app.put('/alterarchamado/:id', (req, res)=>{
    
    const id = req.params.id
    const dados = req.body; 
    const sql = "UPDATE chamado SET ? WHERE idchamado =?;"

    conexao.query(sql,[dados,id],(erro, resultado) => {
        if(erro){
            console.log(erro)
            res.status(404).json({'erro':erro});
        } else{
            res.status(200).json(resultado);
        }
    })
})

/**
 * Deletando chamado
 */
app.delete('/excluirchamado/:id', (req, res)=>{
    
    const id = req.params.id    
    const sql = "DELETE FROM hotel.chamado WHERE idchamado =?;"

    conexao.query(sql,id,(erro, resultado) => {
        if(erro){
            console.log(erro)
            res.status(404).json({'erro':erro});
        } else{
            res.status(201).json(resultado);
        }
    })
})

/**
 * Recuperando os dados da tabela funcionarios e chamado
 */
app.get('/funcionariochamado', (req, res) => {
    
    const consulta = "SELECT funcionario.nome, chamado.descricao " +
                    "FROM hotel.funcionario " +
                    "INNER JOIN hotel.chamado " +
                    "ON hotel.funcionario.idfuncionario = hotel.chamado.fk;";

    conexao.query(consulta, (erro, resultado) => {
        if (erro) {
            console.log(erro);
            res.status(404).json({'erro': erro});
        } else {
            res.status(200).json(resultado);
        }
    });
});


