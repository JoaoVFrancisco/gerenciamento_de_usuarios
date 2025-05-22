import jwt from 'jsonwebtoken';
import { atualizarusuario, criarusuario, deletarusuario, visualizarusuario } from "../models/usuarioModel.js";

const SECRET_KEY = 'sua_chave_secreta_super_segura';

export const createUsuario = async (req, res) => {
    console.log("usuarioController :: createUsuario");
    const {nome, email, senha, tipo} = req.body

    try {
        const [status, resposta] = await criarusuario(nome, email, senha, tipo);
        return res.status(status).json(resposta)
    } catch (error) {
        console.error(error);
        return res.status(500).json({mensagem: "erro ao criar usuario"})
    }
}

export const loginUsuario = async (req, res) => {
    const { email, senha } = req.body;
    
    try {
        // Aqui você deve implementar a lógica para verificar email e senha no banco de dados
        // Este é um exemplo simplificado
        const usuario = await buscarUsuarioPorEmail(email);
        
        if (!usuario || usuario.senha !== senha) {
            return res.status(401).json({ mensagem: 'Email ou senha inválidos' });
        }
        
        const token = jwt.sign(
            { id: usuario.id_usuarios, tipo: usuario.tipo },
            SECRET_KEY,
            { expiresIn: '1h' }
        );
        
        return res.status(200).json({ token, tipo: usuario.tipo });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: 'Erro ao fazer login' });
    }
}

// ... outras funções permanecem iguais
export const readUsuario = async (req, res) => {
    console.log("usuarioController :: readUsuario");
    try {
        const [status, resposta] = await visualizarusuario()
        return res.status(status).json(resposta)
    } catch (error) {
        console.error(error);
        return res.status(500).json({mensagem: "erro ao criar usuario"})
    }
}
export const upadeteUsuario = async (req, res) => {
    console.log("usuarioController :: updateUsuario");
    const {nome, email, senha} = req.body
    const {id_usuarios} = req.params

    try {
        const [status, resposta] = await atualizarusuario(nome, email, senha, id_usuarios);

        return res.status(status).json(resposta)
    } catch (error) {
        console.error(error);
        return res.status(500).json({mensagem: "erro ao criar usuario"})
    }
}
export const deleteUsuario = async ( req, res) => {
    console.log("usuarioController :: deleteUsuario");
    const {id_usuarios} =req.params

    try {
        const [status, resposta] = await deletarusuario(id_usuarios);
        return res.status(status).json(resposta)
    } catch (error) {
        console.error(error);
        return res.status(500).json({mensagem: "erro ao criar usuario"})
    }
}