import db from '../db.js'
import mysql from 'mysql2/promise'

const conexao = mysql.createPool(db);

export const criarusuario = async (nome, email, senha, tipo) => {
    console.log("usuarioModel :: criarusuario");
    const sql = `INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)`;
    const params = [nome, email, senha, tipo];

    try {
        const [resposta] = await conexao.query(sql, params);
        return [201, {mensagem: 'Usuario Criado com sucesso!!'}]
    } catch (error) {
        console.error({mensagem: "Erro ao criar usuario", code:error.code, sql:error.sqlMenssage });
        return [500, {mensagem: "Error ao criar usuario", code:error.code, sql:error.sqlMenssage}]
    }
};

export const visualizarusuario = async () => {
    console.log("usuarioModel :: visualizarusuario");
    const sql = `SELECT * FROM usuarios`;
    
    try {
        const [resposta] = await conexao.query(sql);
        return [200, resposta]; // Adicione esta linha
    } catch (error) {
        console.error({mensagem: "Erro ao visualizar usuario", code:error.code, sql:error.sqlMenssage });
        return [500, {mensagem: "Error ao visualizar usuario", code:error.code, sql:error.sqlMenssage}];
    }
};

export const atualizarusuario = async (nome, email, senha, id_usuarios) => {
    console.log("usuarioModel :: atualizarusuario");
    const sql = `UPDATE usuarios SET nome=?, email=?, senha=? WHERE id_usuarios=?`; // Adicione WHERE
    const params = [nome, email, senha, id_usuarios];

    try {
        const [resposta] = await conexao.query(sql, params)

        if(resposta.affectedRows < 1){
            return [404, {mesagem: "Usuario não encontrado"}];
        }

        return [200, {mensagem: "Usuario Atualizado!!"}]
    } catch (error) {
        console.error({mensagem: "Erro ao atualizar usuario", code:error.code, sql:error.sqlMenssage });
        return [500, {mensagem: "Error ao atualizar usuario", code:error.code, sql:error.sqlMenssage}]
    }
};

export const deletarusuario = async (id_usuarios) => {
    console.log("usuarioModel :: deletarusuario");
    const sql = `DELETE FROM usuarios WHERE id_usuarios=?`;
    const params = [id_usuarios];

    try {
        const [resposta] = await conexao.query(sql, params);

        if(resposta.affectedRows < 1){
            return [404, {mensagem: "Usuario não encontrado!!!"}];
        }

        return [200, {mensagem: "Usuario deletado!!"}]
    } catch (error) {
        console.error({mensagem: "Erro ao deletar usuario", code:error.code, sql:error.sqlMenssage });
        return [500, {mensagem: "Error ao deletar usuario", code:error.code, sql:error.sqlMenssage}]
    }
};

export const buscarUsuarioPorEmail = async (email) => {
    console.log("usuarioModel :: buscarUsuarioPorEmail");
    const sql = `SELECT * FROM usuarios WHERE email = ?`;
    const params = [email];

    try {
        const [resposta] = await conexao.query(sql, params);
        
        if (resposta.length === 0) {
            return null; // Nenhum usuário encontrado
        }

        return resposta[0]; // Retorna o primeiro usuário encontrado
    } catch (error) {
        console.error({mensagem: "Erro ao buscar usuário por email", code: error.code, sql: error.sqlMessage });
        throw error; // Propaga o erro para ser tratado no controller
    }
};