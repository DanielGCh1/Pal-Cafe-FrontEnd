import React, { createContext, useState } from 'react';
import API from '../api';

const EmployeeContext = createContext(null)

const EmployeeProvider = props => {

  const [employees, setEmployees] = useState([])
  const [selected, setSelected] = useState(null)
  const [roles, setRoles] = useState([])

  const findEmployeeById = (id) => {
    const employee = employees.find(emp => emp._id === id);
    return employee;
  }

  const addEmployee = async (values, actions) => {

    try {
      const response = await API.post(`/users/addemployee`, values);

      if (response.status == 200) {
        console.log(response.data)

      } else {
        console.log("Errror al ingresar el empleado");
      }
    } catch (error) {
      console.log(error);
    }
    actions.setSubmitting(false);
  };

  const editEmployee = async (values, actions, _id) => {

    try {
      const response = await API.put(`/users/edit/${_id}`, values);

      if (response.status == 200) {
        // Find the index of the edited promotion in the promotions array
        const editedEmployeeIndex = employees.findIndex(employees => employees._id === _id);

        // Replace the edited promotion with the updated promotion
        const updatedEmployees = [...employees];
        updatedEmployees[editedEmployeeIndex] = { ...employees[editedEmployeeIndex], ...values };

        setEmployees(updatedEmployees);

        console.log(response.data);
      } else {
        console.log("Errror al ingresar el empleado");
      }
    } catch (error) {
      console.log(error);
    }
    actions.setSubmitting(false);
  };

  const getEmployee = async () => {
    try {
      const res = await API.get('/users-getall-empleados', {
        withCredentials: true
      });
      const data = res.data;
      console.log(data)
      setEmployees(data)
    } catch (error) {
      console.error(error);
    }
  };

  const getRoles = async () => {
    try {
      const res = await API.get('/roles/get-all', {
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
      const response = await API.delete(`/promociones/delete/${id}`);
      if (response.status === 200) {
        setEmployees((employees) => employees.filter((employees) => employees._id !== id));
      } else {
        console.log('Ocurrió un error al eliminar la promoción');
      }
    } catch (error) {
      console.error('Ocurrió un error al eliminar la promoción', error);
    }
  };


  return (
    <EmployeeContext.Provider
      value={{
        employees,
        selected,
        roles,
        getEmployee,
        deleteEmployee,
        findEmployeeById,
        editEmployee,
        getRoles,
        addEmployee
      }}
    >
      {props.children}
    </EmployeeContext.Provider>
  );
};

export { EmployeeProvider }
export default EmployeeContext;
