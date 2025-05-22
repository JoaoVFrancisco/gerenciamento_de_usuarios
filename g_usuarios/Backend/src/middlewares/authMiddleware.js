import jwt from 'jsonwebtoken';

const SECRET_KEY = 'sua_chave_secreta_super_segura';

export const verificarToken = (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (!token) {
        return res.status(403).json({ mensagem: 'Token não fornecido' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).json({ mensagem: 'Falha ao autenticar token' });
        }
        
        req.userId = decoded.id;
        req.userTipo = decoded.tipo;
        next();
    });
};

export const verificarAdmin = (req, res, next) => {
    if (req.userTipo !== 'ADM') {
        return res.status(403).json({ mensagem: 'Acesso restrito a administradores' });
    }
    next();
};