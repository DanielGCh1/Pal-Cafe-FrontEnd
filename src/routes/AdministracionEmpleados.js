import { Table, Thead, Tbody, Tr, Th, Td, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure, Checkbox, Tfoot, Text, VStack, Input, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Box, HStack } from "@chakra-ui/react";
import { createBrowserHistory } from "history";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useEmployees from "../context/Employee/UseEmployees";

const AdministracionEmpleados = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Sitios
  const inputStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    border: "2px solid #fff",
    borderRadius: "5px",
    padding: "2px",
    borderColor: isHovered ? "red" : "#fff" // Cambiar el borde a rojo si el input está en hover
  };

  const { employees,
    getEmployee,
    deleteEmpleado } = useEmployees();
  const [filteredEmployees, setEmployeesFilters] = useState([]);
  const history = createBrowserHistory();
  const [filters, setFilters] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEmployees, setSelectedEmployees] = useState(null);


  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    if (employees.length > 0) {
      setEmployeesFilters(employees);
    }
  }, [employees]);

  useEffect(() => {
    getEmployee();
  }, []);


  useEffect(() => {
    const nameFilter = filters.toLowerCase();

    const filteredEmployees = [...employees]
      .filter((employees) => {
        return (
          employees.usu_nombre.toLowerCase().includes(nameFilter)
        );
      })
    setEmployeesFilters(filteredEmployees);
  }, [filters, employees]);

  function handleFilterChange(event) {
    const { value } = event.target;

    setFilters(value);
  }

  const handleEdit = (id) => {
    history.push(`/EditarPromociones/${id}`);
  };

  const handleDelete = (employee) => {
    setSelectedEmployees(employee);
    onOpen();
  };

  const confirmDelete = () => {
    deleteEmpleado(selectedEmployees);
    onClose();
  };


  const getDate = (fechaISO) => {
    let fechaObj = new Date(fechaISO);
    let dia = fechaObj.getDate();
    let mes = fechaObj.getMonth() + 1;
    let anio = fechaObj.getFullYear();
    let hora = fechaObj.getHours();
    let minutos = fechaObj.getMinutes();
    let segundos = fechaObj.getSeconds();

    return `${dia}/${mes}/${anio} ${hora}:${minutos}:${segundos}`;
  }

  return (
    <VStack width="70%" alignSelf="center">
      <Text fontWeight={"bold"} color={"white"} fontSize={"48px"}>
        Administrar empleados
      </Text>
      <HStack alignSelf={"flex-start"}>
        <Text fontWeight={"bold"} color={"black"} fontSize={"18px"}>
          Filtros:
        </Text>
        <input
          type="text"
          placeholder="Nombre de el empleado"
          name="name"
          value={filters}
          onChange={handleFilterChange}
          style={inputStyle}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        />
      </HStack>
      <Box maxH="55vh" width="100%" borderRadius="10px" overflowY="scroll" maxHeight="37rem" sx={{
        "&::-webkit-scrollbar": {
          width: "7px",
          backgroundColor: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          bg: "gray.400",
          borderRadius: "full",
          opacity: "0.4",
          "&:hover": {
            opacity: "0.7",
          },
        },
      }} >
        <Table variant="simple" width="100%" bg="rgba(0,0,0,0.5)" bgOpacity="25%">
          <Thead color="white">
            <Tr>
              <Th color="white" fontWeight={"bold"}>Nombre</Th>
              <Th color="white" fontWeight={"bold"}>Primer apellido</Th>
              <Th color="white" fontWeight={"bold"}>Segundo apellido</Th>
              <Th color="white" fontWeight={"bold"}>Fecha de registro</Th>
              <Th color="white" fontWeight={"bold"}>Modificar</Th>
              <Th color="white" fontWeight={"bold"}>Eliminar</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredEmployees?.map((emp) => (
              <Tr key={emp._id}>
                <Td color="white">{emp.usu_nombre}</Td>
                <Td color="white">{emp.usu_primer_apellido}</Td>
                <Td color="white">{emp.usu_segundo_apellido}</Td>
                <Td color="white">{getDate(emp.usu_fecha_registro)}</Td>
                <Td>
                  <Link to={`/Home/EditarEmpleados/${emp._id}`}>
                    <Button onClick={() => handleEdit(emp._id)}>
                      Editar
                    </Button>
                  </Link>
                </Td>
                <Td>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDelete(emp)}
                  >
                    Eliminar
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th color="white" fontWeight={"bold"}>Nombre</Th>
              <Th color="white" fontWeight={"bold"}>Primer apellido</Th>
              <Th color="white" fontWeight={"bold"}>Segundo apellido</Th>
              <Th color="white" fontWeight={"bold"}>Fecha de registro</Th>
              <Th color="white" fontWeight={"bold"}>Modificar</Th>
              <Th color="white" fontWeight={"bold"}>Eliminar</Th>
            </Tr>
          </Tfoot>
        </Table >
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Eliminar promoción</ModalHeader>
          <ModalBody>
            ¿Está seguro que desea eliminar el empleado{" "}
            {selectedEmployees?.usu_nombre}?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={confirmDelete}>
              Eliminar
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack >
  );
};

export default AdministracionEmpleados;
