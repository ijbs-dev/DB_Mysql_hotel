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
 * Fazedo Busca dados funcionarios
 */
app.get('/funcionarios', (req, res)=>{

    const consulta = "SELECT funcionarios.nome,funcionarios.cargo FROM hotel.funcionarios;";

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
 * Cadastrando os dados dos funcionarios 
 */ 
app.post('/cadastrar', (req, res)=>{
    const dados = req.body;

    const sql = "INSERT INTO hotel.funcionarios SET ?;"

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

app.get('/funcionarios/:id', (req, res)=>{
    
    const id = req.params.id
    const sql = "SELECT * FROM hotel.funcionarios WHERE idFuncionario =?;"

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
 * Alterando os dados de Funcionarios
 */

app.put('/alterar/:id', (req, res)=>{
    
    const id = req.params.id
    const dados = req.body; 
    const sql = "UPDATE funcionarios SET ? WHERE idFuncionario =?;"

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
 * Deletando dados de Funcionarios por ID
 */

app.delete('/excluir/:id', (req, res)=>{
    
    const id = req.params.id    
    const sql = "DELETE FROM hotel.funcionarios WHERE idFuncionario =?;"

    conexao.query(sql,id,(erro, resultado) => {
        if(erro){
            console.log(erro)
            res.status(404).json({'erro':erro});
        } else{
            res.status(201).json(resultado);
        }
    })
})