import express from 'express'
import { createUsuario, deleteUsuario, readUsuario,  loginUsuario, upadeteUsuario } from './controllers/usuarioController.js';
import { verificarToken, verificarAdmin } from './middlewares/authMiddleware.js';

const PORT = 3000;
const app = express()

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API Funcionando')
})

// Rotas públicas
app.post('/login', loginUsuario);
app.post('/usuarios', createUsuario);

// Rotas protegidas
app.get('/usuarios', verificarToken, readUsuario);
app.put('/usuarios/:id_usuarios', verificarToken, upadeteUsuario);
app.delete('/usuarios/:id_usuarios', verificarToken, verificarAdmin, deleteUsuario);

app.listen(PORT, () => {
    console.log(`API FUNCIONANDO NA PORTA ${PORT}`)
});