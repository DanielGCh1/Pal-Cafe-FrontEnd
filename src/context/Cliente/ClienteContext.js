import React, { createContext, useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import API from '../api';

const ClienteContext = createContext(null)

const ClienteProvider = props => {

  const [clientes, setClientes] = useState([])
  const [clienteSelecionado, setClienteSelecionado] = useState(null)

  const pal_usuario = {
    usu_id_usuario: 1,
    usu_nombre: 'Daniel',
    usu_primer_apellido: 'Gómez',
    usu_segundo_apellido: 'Chacón',
    usu_fecha_registro: null,
    usu_numero_telefono1: 61282136,
    usu_numero_telefono2: null,
    usu_direccion: '35 mts oeste',
    usu_estado: "pendiente",
    usu_correo: 'dgchaarturo@gmail.com', 
    usu_url_foto: '',
    usu_contrasenna: "1234" 
}
  useEffect(() => {
  //  console.log(clienteSelecionado)
  }, [clienteSelecionado])

  const getClientes = async () => {
    try {
      const res = await API.get('/users/get-all');
      const data = res.data.data;
      setClientes(data)
      console.log(clientes)
    } catch (error) {
      console.error(error);
    }
  };

  const getCliente = async (id) => {
    try {
      const cliente = clientes.find((cliente) => { return cliente.id === id })
      console.log(cliente)
      setClienteSelecionado(cliente)
    } catch (error) { }
  };
  const logIn = async (correo, password) => {
    try {
      const res = await API.get('/use/login/:correo/:password');
      const data = res.data.data;
      setClienteSelecionado(data)
    } catch (error) {
      //console.error(error);
      console.log("Fallo buscar usuario a la bd, procedo a buscarlo de forma interna");
      if(pal_usuario.usu_correo == correo && pal_usuario.usu_contrasenna == password){
        
      }
    }
  };

  const setCliente = async () => {
    try {
      const res = await API.post('/users/add');
      getCliente()
      console.log(clientes)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ClienteContext.Provider
      value={{
        clientes,
        clienteSelecionado,
        setClienteSelecionado,
        getClientes,
        getCliente,
        setCliente
      }}
    >
      {props.children}
    </ClienteContext.Provider>
  );
};

export { ClienteProvider }
export default ClienteContext;
