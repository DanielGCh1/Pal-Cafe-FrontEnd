import React, { createContext, useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import API from '../api';

const ClienteContext = createContext(null)

const ClienteProvider = props => {

  const [clientes, setClientes] = useState([])
  const [clienteSelecionado, setClienteSelecionado] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    axios.get('/users-getall')
      .then(response => {
        const data = response.data;
        setClientes(data);
      })
      .catch(error => {
        setError(error.message || 'Ha ocurrido un error al obtener los datos');
      })
      .finally(() => setLoading(false));
  }, []);

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
      const res = await axios.get('/api/users-getall');
      const data = res.data;
      setClientes(data)
    } catch (error) {
      console.error(error);
    }
  };

  const modifyClientes = (clientes) => {
    axios.put('/api/clientes/edit-all-permission/', clientes)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const deleteCliente = async (id) => {
    try {
      const response = await axios.delete(`/api/users/delete/${id}`);
      if (response.status === 200) {
        setClientes((promotions) => promotions.filter((promocion) => promocion._id !== id));
      } else {
        console.log('Ocurrió un error al eliminar el cliente');
      }
    } catch (error) {
      console.error('Ocurrió un error al eliminar el cleinte', error);
    }
  }

  const getCliente = (id) => {
    try {
      const cliente = clientes.find(cliente => cliente._id === id);
      return cliente;
    } catch (error) {
      console.error('Ha ocurrido un error al buscar el cliente: ', error);
    }
  };

  const logIn = async (correo, password) => {
    try {
      const res = await axios.get('/use/login/:correo/:password');
      const data = res.data.data;
      setClienteSelecionado(data)
    } catch (error) {
      //console.error(error);
      console.log("Fallo buscar usuario a la bd, procedo a buscarlo de forma interna");
      if (pal_usuario.usu_correo == correo && pal_usuario.usu_contrasenna == password) {

      }
    }
  };

  const setCliente = async () => {
    try {
      const res = axios.put('/clientes/edit-all-permission/', clientes)
      console.log(res)
    } catch (error) {
      console.error(error);
    }
  };

  const editClient = async (values, actions) => {
    try {
      const res = await axios.put(`/cliente/edit/${values._id}`, values);
      if (res.status == 200) {
        // Find the index of the edited promotion in the promotions array
        const editedClientesIndex = clientes.findIndex(cliente => cliente._id === values._id);

        const updatedCliente = {
          usu_nombre: values.name,
          usu_correo: values.email,
          usu_direccion: values.address,
          usu_numero_telefono1: values.firstNumber,
          usu_contrasenna: values.newPassword,
          usu_numero_telefono2: values.secondNumber,
          usu_segundo_apellido: values.secondSurname,
          usu_primer_apellido: values.surname,
          usu_usuario: values.user
        };
        
        // Replace the edited promotion with the updated promotionif 
        const updatedClientes = [...clientes];
        updatedClientes[editedClientesIndex] = { ...clientes[editedClientesIndex], ...updatedCliente};

        console.log(updatedClientes[editedClientesIndex])
        setClientes(updatedClientes);
      }
      return res.data
    } catch (error) {
      console.error(error);
      return error
    }
  }

  return (
    <ClienteContext.Provider
      value={{
        clientes,
        clienteSelecionado,
        loading,
        error,
        setClienteSelecionado,
        getClientes,
        getCliente,
        setCliente,
        modifyClientes,
        editClient,
        deleteCliente
      }}
    >
      {props.children}
    </ClienteContext.Provider>
  );
};

export { ClienteProvider }
export default ClienteContext;
