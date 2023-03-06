import React, { createContext, useState } from 'react';
import axios from 'axios';
import API from '../api';

const EmployeeContext = createContext(null)

const EmployeeProvider = props => {

  const [employees, setEmployees] = useState([])
  const [selected, setSelected] = useState(null)

  const getEmployees = async () => {
    try {
      const res = await axios.get('https://reqres.in/api/users');
      const data = res.data.data;
      setEmployees(data)
    } catch (error) {
      console.error(error);
    }
  };

  const guardar = async employee => {
    try {
    } catch (error) {}
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        selected,
        setSelected,
        getEmployees,
        guardar
      }}
    >
      {props.children}
    </EmployeeContext.Provider>
  );
};

export { EmployeeProvider }
export default EmployeeContext;
