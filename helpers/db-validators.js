const {Categoria, Usuario, Producto} = require('../models');
const Role = require('../models/role')
const mongoose = require("mongoose");

const esRoleValido = async(rol='')=>{
    const existeRol = await Role.findOne({rol});
    if (!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en BD.`)
    }
}

const emailExiste = async( correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail) {
        throw new Error(`El correo: ${correo}, ya esta registrado.`)    
    }
}

const existeUsuarioPorId = async( id ) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id ${id}, no existe.`)    
    }
}
const existeCategoriaPorId = async(id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No es un id de Mongo valido`)
    }
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`Èl id no existe ${id}`);
    }
}
const existeProductoPorId = async( id ) => {
    const existeProducto = await Producto.findById(id);
    if ( !existeProducto ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}