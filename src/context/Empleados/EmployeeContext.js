import React, { createContext, useState } from 'react';
import axios from 'axios';

const EmployeeContext = createContext(null)

const EmployeeProvider = props => {

  const [employees, setEmployees] = useState([])
  const [selected, setSelected] = useState(null)

  const getEmployees = async () => {
    try {
      const res = await axios.get('https://reqres.in/api/users');
      const data = res.data.data;
      setEmployees(data)
      console.log(employees)
    } catch (error) {
      console.error(error);
    }
  };

  const getEmployee = id => {
    try {
      const employee = employees.find((employee) => {return employee.id === id})
       setSelected(employee)  
    } catch (error) {}
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        selected,
        setSelected,
        getEmployees,
        getEmployee,
      }}
    >
      {props.children}
    </EmployeeContext.Provider>
  );
};

export { EmployeeProvider }
export default EmployeeContext;
