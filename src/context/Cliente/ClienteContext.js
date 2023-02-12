import React, { createContext, useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import API from '../api';

const ClienteContext = createContext(null)

const ClienteProvider = props => {

  const [clientes, setClientes] = useState([])
  const [clienteSelecionado, setClienteSelecionado] = useState(null)

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

  const getCliente = id => {
    try {
      const cliente = clientes.find((cliente) => { return cliente.id === id })
      console.log(cliente)
      setClienteSelecionado(cliente)

    } catch (error) { }
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
