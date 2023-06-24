import { Table, Thead, Tbody, Tr, Th, Td, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure, Checkbox, Tfoot, Text, VStack, Input, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Box, HStack, InputRightElement, Image } from "@chakra-ui/react";
import { createBrowserHistory } from "history";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UseClientes from '../context/Cliente/UseClientes';

const LookClientes = () => {
  const { clientes, modifyClientes, deleteCliente, loading } = UseClientes();
  const [filteredClientes, setClientesFilters] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    state: "",
  });
  const [isChecked, setisChecked] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [editedClientes, setEditedClientes] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (loading == false) {
      const nameFilter = filters.name.toLowerCase();
      const stateFilter = filters.state;

      console.log(stateFilter)

      const filteredClientes = clientes
        .filter((cliente) => {
          return (
            cliente.usu_nombre.toLowerCase().includes(nameFilter) &&
            (stateFilter === "" || cliente.usu_estado === stateFilter)
          );
        })
      setClientesFilters(filteredClientes);
    }
  }, [filters, clientes]);

  function handleFilterChange(event) {
    const { name, value } = event.target;

    setFilters((filters) => ({ ...filters, [name]: value }));
  }

  const handleDelete = (cliente) => {
    setSelectedCliente(cliente);
    onOpen();
  };


  const handleAddEditedCliente = (cliente) => {
    // Verificar si el cliente ya existe en el array
    const existingClientIndex = editedClientes.findIndex(
      (c) => c._id === cliente._id
    );

    // Si el cliente ya existe, actualizarla en el array
    if (existingClientIndex != -1) {
      const updatedClientes = [...editedClientes];
      updatedClientes[existingClientIndex] = cliente;
      setEditedClientes(updatedClientes);
    } else {
      // Si el cliente no existe, agregarla al array
      setEditedClientes([...editedClientes, cliente]);
    }

    console.log(editedClientes)
  }


  const handleEditedClientesClick = () => {
    modifyClientes(editedClientes)
  };


  const handleCheck = () => {
    setisChecked(!isChecked)
  }

  const confirmDelete = () => {
    deleteCliente(selectedCliente);
    onClose();
  };

  const handleChangeClientePermission = (value, cliente) => {
    cliente.usu_estado = value;
    handleAddEditedCliente(cliente)
    setIsButtonDisabled(false)
  }

  return (
    loading ? <Box
      className="divLoading"
      width="550px"
      position="relative"
      top="0"
      left="0"
      bottom="0"
      right="0"
      margin="auto"
      height="fit-content"
      color={"white"}
      bg="rgba(0,0,0)"
      padding={"20px"}
      borderRadius={"100px"}
      overflow={"hidden"}
      opacity={"0.8"}
    >
      <Box width={"100%"} position={"relative"} zIndex={1} bg={"black"} borderRadius={"100px"}>
        <div className="imgLoading" />
        <Text fontSize={"32px"} alignSelf={"center"} w={"100%"} textAlign={"center"}>
          Cargando..
        </Text>
      </Box>
    </Box> : <VStack width="70%" alignSelf="center">
      <Text fontWeight={"bold"} color={"white"} fontSize={"48px"}>
        Buscar Clientes
      </Text>
      <form>
        <Text fontWeight={"bold"} color={"white"} fontSize={"18px"}>
          Filtros:
        </Text>
        <HStack alignSelf={"flex-start"}>
          <input
            type="text"
            placeholder="Nombre de el cliente"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
            className={"inputStyle"}
          />
          <Text fontWeight={"bold"} color={"white"} fontSize={"18px"}>
            Estado:
          </Text>
          <select
            name="state"
            value={filters.state}
            className={"selectStyle"}
            onChange={handleFilterChange}
          >
            <option value="" className={"optionStyle"}>Todos</option>
            <option value="Aceptado" className={"optionStyle"}>Aceptado</option>
            <option value="Rechazado" className={"optionStyle"}>Rechazado</option>
            <option value="Pendiente" className={"optionStyle"}>Pendiente</option>
            <option value="De baja" className={"optionStyle"}>De baja</option>
          </select>
        </HStack>
      </form>
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
        <Table variant="simple" width="100%" bg="rgba(0,0,0,0.5)" bgopacity="25%">
          <Thead color="white">
            <Tr>
              <Th color="white" fontWeight={"bold"}>Nombre</Th>
              <Th color="white" fontWeight={"bold"}>Correo</Th>
              <Th color="white" fontWeight={"bold"}>Estado</Th>
              <Th color="white" fontWeight={"bold"}>Editar</Th>
              <Th color="white" fontWeight={"bold"}>Eliminar</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredClientes?.map((cliente) => (
              <Tr key={cliente._id}>
                <Td color="white">{cliente.usu_nombre}</Td>
                <Td color="white">{cliente.usu_correo}</Td>
                <Td color="white">
                  {isChecked ? <>
                    <select
                      value={cliente.usu_estado}
                      className={"content-select"}
                      onChange={(e) => {
                        handleChangeClientePermission(e.target.value, cliente)
                      }}
                    >
                      <option value="Aceptado" className={"optionStyle"}>Aceptado</option>
                      <option value="Rechazado" className={"optionStyle"}>Rechazado</option>
                      <option value="Pendiente" className={"optionStyle"}>Pendiente</option>
                      <option value="De baja" className={"optionStyle"}>De baja</option>
                    </select>
                  </> :
                    cliente.usu_estado}
                </Td>
                <Td>
                  <Link to={`/Home/EditarClientes/${cliente._id}`}>
                    <Button>
                      Editar
                    </Button>
                  </Link>
                </Td>
                <Td>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDelete(cliente._id)}
                  >
                    Eliminar
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th color="white">Nombre</Th>
              <Th color="white">Correo</Th>
              <Th color="white">Correo</Th>
              <Th color="white">Editar</Th>
              <Th color="white">Eliminar</Th>
            </Tr>
          </Tfoot>
        </Table >
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Eliminar promoción</ModalHeader>
          <ModalBody>
            ¿Está seguro que desea eliminar la promoción{" "}
            {selectedCliente?.name}?
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
      <VStack alignSelf={"flex-end"}>
        <Checkbox isChecked={isChecked} onChange={handleCheck} colorScheme="red" color={"white"}>
          Desbloquear permisos
        </Checkbox>
        <Button onClick={handleEditedClientesClick} disabled={isButtonDisabled}>
          Guardar cambios en permisos de clientes
        </Button>
      </VStack>
    </VStack >

  );
};

export default LookClientes;
