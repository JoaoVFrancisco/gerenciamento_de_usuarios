import { atualizarusuario, criarusuario, deletarusuario, visualizarusuario } from "../models/usuarioModel.js";

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