import React, { createContext, useState } from 'react';
import Axios, { AxiosError } from "axios";

const EmployeeContext = createContext(null)

const EmployeeProvider = props => {

  const [employees, setEmployees] = useState([])
  const [employee, setEmployee] = useState(null)
  const [roles, setRoles] = useState([])
  const [imageUrl, setImageUrl] = useState(null)


  const getEmployeeById = async (id) => {
    try {
      const response = await Axios.get(`/users/${id}`, {
        withCredentials: true
      });
      return response.data[0];
    } catch (error) {
      console.error('Error fetching employee data:', error);
      return undefined;
    }
  };

  const findEmployeeById = async (id) => {
    try {
      let employee;
      if (employees) {
        employee = await getEmployeeById(id);
        console.log(employee)
      } else {
        employee = employees.find((emp) => emp._id === id);
      }

      const response = await Axios.get(`/usuarios/imagen/${id}`);
      if (response.status === 200) {
        setImageUrl(`http://localhost:3001/api/usuarios/imagen/${id}`);
      } else {
        setImageUrl(require('../../assets/ImagenNoEncontrada.png'));
      }

      setEmployee(employee);
    } catch (error) {
      if(error.response.message === "error"){

      }
      setEmployee((undefined));
      setImageUrl(require('../../assets/ImagenNoEncontrada.png'));
    }
  };

  const addEmployee = async (values, actions) => {
    try {
      const formData = new FormData();
      formData.append('image', values.image);
      formData.append('nombre', values.nombre);
      formData.append('usuario', values.usuario);
      formData.append('primerApellido', values.primerApellido);
      formData.append('segundoApellido', values.segundoApellido);
      formData.append('telefonoPrimer', values.telefonoPrimer);
      formData.append('telefonoSegundo', values.telefonoSegundo);
      formData.append('direccion', values.direccion);
      formData.append('correo', values.correo);
      formData.append('newPassword', values.newPassword);
      formData.append('state', "Aceptado");
      formData.append('roles', JSON.stringify(values.roles));

      console.log(formData);
      const response = await Axios.post('/users/addemployee', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status == 200) {
        window.alert(response.data.message);
      }
      else {
        window.alert(response.data.message);
      }
    } catch (error) {
      console.log(error)
      window.alert("Error inesperado al agregar el empleado");
    }
    actions.setSubmitting(false);
  };

  const editEmployee = async (values, actions, _id) => {
    try {
      const formData = new FormData();
      formData.append('image', values.image);
      formData.append('nombre', values.nombre);
      formData.append('usuario', values.usuario);
      formData.append('primerApellido', values.primerApellido);
      formData.append('segundoApellido', values.segundoApellido);
      formData.append('telefonoPrimer', values.telefonoPrimer);
      formData.append('telefonoSegundo', values.telefonoSegundo);
      formData.append('direccion', values.direccion);
      formData.append('correo', values.correo);
      formData.append('password', values.currentPassword);
      formData.append('newPassword', values.newPassword);
      formData.append('roles', JSON.stringify(values.roles));
      formData.append('newImage', values.newImage);
      formData.append('state', "Aceptado");
      formData.append('imageUrlLocal', values.imageUrlLocal);//TODO: si esta en null, es
      //TODO: porque borro la foto, y no planea dejar ninguna, pero solo aplica para clientes
      // TODO: pero se ocupa aqui, porque los empleados si ocupan foto, y ocupo saber si lo intento

      console.log(formData);
      const response = await Axios.put(`/users/edit/${_id}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status == 200) {
        // Find the index of the edited promotion in the promotions array
        const editedEmployeeIndex = employees.findIndex(employees => employees._id === _id);

        // Replace the edited promotion with the updated promotion
        const updatedEmployees = [...employees];
        updatedEmployees[editedEmployeeIndex] = { ...employees[editedEmployeeIndex], ...values };

        setEmployees(updatedEmployees);

        window.alert(response.data.message);
      } else {
        window.alert(response.data.message);
      }
    } catch (error) {
      window.alert("Error inesperado al editar el empleado");
    }
    actions.setSubmitting(false);
  };

  const getEmployee = async () => {
    try {
      const res = await Axios.get('/users-getall-empleados', {
        withCredentials: true
      });
      const data = res.data;
      setEmployees(data)
    } catch (error) {
      console.error(error);
    }
  };

  const getRoles = async () => {
    try {
      const res = await Axios.get('/roles/get-all', {
        withCredentials: true
      });
      const data = res.data;
      setRoles(data)
    } catch (error) {
      console.error(error);
    }
  };


  const deleteEmployee = async (id) => {
    try {
      let response;
      await Axios.delete(`/users/delete/${id}`).then((data => response = data));
      if (response.status == 200) {
        setEmployees((employees) => employees.filter((employees) => employees._id !== id));
        window.alert("Empleado eliminado de forma exitosa");
      }
      else {
        window.alert(response.data.message);
      }
    } catch (error) {
      window.alert("Error inesperado al eliminar el empleado");
    }
  };


  return (
    <EmployeeContext.Provider
      value={{
        employees,
        employee,
        roles,
        getEmployee,
        deleteEmployee,
        findEmployeeById,
        editEmployee,
        getRoles,
        addEmployee,
        imageUrl,
        setEmployee,
        setImageUrl,
        getEmployeeById
      }}
    >
      {props.children}
    </EmployeeContext.Provider>
  );
};

export { EmployeeProvider }
export default EmployeeContext;
