import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ClienteContext = createContext(null)

const ClienteProvider = props => {

  const [clientes, setClientes] = useState([])
  const [clienteSelecionado, setClienteSelecionado] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null)
  const [customerEditAdm, setCustomerEditAdm] = useState(null)
  const navigate = useNavigate();

  const getCustomerId = async id => {
    try {
      const response = await axios.get(`/users/${id}`);
      const data = response.data[0];
      setCustomerEditAdm(data);
    } catch (error) {
    }
  };

  const getImageUrl = async id => {
    try {
      const response = await axios.get(`/usuarios/imagen/${id}`);
      if (response.status = 200) {
        setImageUrl(`http://localhost:3001/api/usuarios/imagen/${id}`);
      }
      else {
        setImageUrl(require('../../assets/ImagenNoEncontrada.png'));
      }
    } catch (error) {
      console.log('La consulta para obtener la imagen del usuario falló');
      setImageUrl(require('../../assets/ImagenNoEncontrada.png'));
    }
  };

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
      const res = await axios.get('/users-getall');
      const data = res.data;
      setClientes(data)
    } catch (error) {
      console.error(error);
    }
  };

  const modifyClientes = (clientes) => {
    axios.put('/clientes/edit-all-permission/', clientes)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const deleteCliente = async (id) => {
    try {
      const response = await axios.delete(`/users/delete/${id}`);
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

  // const logIn = async (correo, password) => {
  //   try {
  //     const res = await axios.get('/use/login/:correo/:password');
  //     const data = res.data.data;
  //     setClienteSelecionado(data)
  //   } catch (error) {
  //     //console.error(error);
  //     console.log("Fallo buscar usuario a la bd, procedo a buscarlo de forma interna");
  //     if (pal_usuario.usu_correo == correo && pal_usuario.usu_contrasenna == password) {
  //     }
  //   }
  // };

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
      const formData = new FormData();
      formData.append('image', values.image);
      formData.append('nombre', values.name);
      formData.append('usuario', values.user);
      formData.append('primerApellido', values.surname);
      formData.append('segundoApellido', values.secondSurname);
      formData.append('telefonoPrimer', values.firstNumber);
      formData.append('telefonoSegundo', values.secondNumber);
      formData.append('direccion', values.address);
      formData.append('correo', values.email);
      formData.append('password', values.password);
      formData.append('newPassword', values.newPassword);
      formData.append('roles', JSON.stringify(values.roles));
      formData.append('newImage', values.newImage);
      formData.append('state', values.state);
      formData.append('imageUrlLocal', values.imageUrlLocal);//TODO: si esta en null, es
      //TODO: porque borro la foto, y no planea dejar ninguna, pero solo aplica para clientes
      // TODO: pero se ocupa aqui, porque los empleados si ocupan foto, y ocupo saber si lo intento

      console.log(formData);
      const response = await axios.put(`/users/edit/${values._id}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status == 200) {
        // Find the index of the edited promotion in the promotions array
        const editedClientesIndex = clientes.findIndex(cliente => cliente._id === values._id);

        const updatedCliente = {
          usu_foto_url: values.image,
          usu_nombre: values.name,
          usu_usuario: values.user,
          usu_primer_apellido: values.surname,
          usu_segundo_apellido: values.secondSurname,
          usu_numero_telefono1: values.firstNumber,
          usu_numero_telefono2: values.secondNumber,
          usu_direccion: values.address,
          usu_correo: values.email,
          usu_contrasenna: values.password,
          usu_roles: [],
          usu_estado: values.state
        };

        // Replace the edited promotion with the updated promotionif 
        const updatedClientes = [...clientes];
        updatedClientes[editedClientesIndex] = { ...clientes[editedClientesIndex], ...updatedCliente };

        console.log(updatedClientes[editedClientesIndex])
        setClientes(updatedClientes);

        window.alert(response.data.message);
      } else {
        window.alert(response.data.message);
      }
    } catch (error) {
      window.alert("Error inesperado al editar el empleado");
    }
    actions.setSubmitting(false);
    /*
        try {
          const res = await axios.put(`/cliente/edit/${values._id}`, values);
          if (res.status == 200) {
            // Find the index of the edited promotion in the promotions array
            const editedClientesIndex = clientes.findIndex(cliente => cliente._id === values._id);
    
            const updatedCliente = {
              usu_nombre: values.name,
              usu_usuario: values.user,
              usu_primer_apellido: values.surname,
              usu_segundo_apellido: values.secondSurname,
              usu_numero_telefono1: values.firstNumber,
              usu_numero_telefono2: values.secondNumber,
              usu_direccion: values.address,
              usu_correo: values.email,
              usu_contrasenna: values.newPassword,
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
        }*/
  }

  const addClient = async (values, actions) => {
    try {
      const formData = new FormData();
      formData.append('image', values.image);
      formData.append('nombre', values.name);
      formData.append('usuario', values.user);
      formData.append('primerApellido', values.surname);
      formData.append('segundoApellido', values.secondSurname);
      formData.append('telefonoPrimer', values.firstNumber);
      formData.append('telefonoSegundo', values.secondNumber);
      formData.append('direccion', values.address);
      formData.append('correo', values.email);
      formData.append('password', values.password);
                
      console.log(formData);
      const response = await axios.post("/users/add", formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status == 200) {
        window.alert(response.data.message);
        navigate("/PalCafe/LoginCustomer")
      } else {
        window.alert(response.data.message);
      }
    } catch (error) {
      window.alert("Error inesperado al editar el empleado");
    }
    actions.setSubmitting(false);
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
        deleteCliente,
        imageUrl,
        getImageUrl,
        setImageUrl,
        customerEditAdm,
        setCustomerEditAdm,
        getCustomerId,
        addClient
      }}
    >
      {props.children}
    </ClienteContext.Provider>
  );
};

export { ClienteProvider }
export default ClienteContext;
