const database = require('../models')

class ClienteController {
    static async pegaTodasOsClientes(req, res) {
        try{
            const todosOsClientes = await database.Clientes.findAll()
            return res.status(200).json(todosOsClientes)
        }catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmCliente(req, res) {
        const { id } = req.params
        try{
            const umCliente = await database.Clientes.findOne( { 
                where: {
                    id: Number(id)
                }
            })
            //if(umCliente != undefined){
            if(umCliente){
                return res.status(200).json(umCliente)
            } else {
                return res.status(404).json("cliente não encontrado!")    
            }
        }catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmClienteFoto(req, res) {
        const { id } = req.params
        try{
            const umCliente = await database.Clientes.findOne( { 
                where: {
                    id: Number(id)
                }
            })
            //if(umCliente != undefined){
            if(umCliente){
                res.setHeader('Content-Length', umCliente.imagem.length);
                res.setHeader('Content-Type', "image/jpeg");
                return res.status(200).write(umCliente.imagem)
            } else {
                return res.status(404).json("cliente não encontrado!")    
            }
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
    
    static async criaUmCliente(req, res) {
        const novoCliente = req.body
        try{
            const novoClienteCriado = await database.Clientes.create(novoCliente)
            return res.status(200).json(novoClienteCriado)
        }catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async atualizaCliente(req, res) {
        const { id } = req.params
        const novasInfos = req.body
        try{
            await database.Clientes.update(novasInfos, { 
                where: { id: Number(id) } })
            const clienteAtualizado =  await database.Clientes.findOne( { 
                where: { id: Number(id) } })
                return res.status(200).json(clienteAtualizado)
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
    static async apagaCliente(req, res){
        const { id } = req.params 
        try{
            await database.Clientes.destroy( { where: { id: Number(id) } })
            return res.status(200).json( { message: `id ${id} deletado com sucesso` })
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
}

module.exports = ClienteController

