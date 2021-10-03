const { Router } = require('express')
const ClienteController = require('../controllers/ClienteController')

const router = Router()

router.get('/clientes', ClienteController.pegaTodasOsClientes)
router.get('/clientes/:id', ClienteController.pegaUmCliente)
router.get('/clientes/:id/foto', ClienteController.pegaUmClienteFoto)
router.post('/clientes', ClienteController.criaUmCliente)
router.put('/clientes/:id', ClienteController.atualizaCliente)
router.delete('/clientes/:id', ClienteController.apagaCliente)

module.exports = router