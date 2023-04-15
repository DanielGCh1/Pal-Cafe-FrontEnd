import { Table, Thead, Tbody, Tr, Th, Td, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure, Checkbox, Tfoot, Text, VStack, Input, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Box, HStack } from "@chakra-ui/react";
import { createBrowserHistory } from "history";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UsePromotion from '../context/Promotion/UsePromotion';

const LookPromotions = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { promotions, deletePromotions, getPromotions, modifitedPromotions } = UsePromotion();
  const [filteredPromotions, setPromotionFilters] = useState([]);
  const [isChecked, setisChecked] = useState(false);
  const history = createBrowserHistory();
  const [filters, setFilters] = useState({
    name: "",
    priceOrder: "asc",
    active: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [editStockPromotions, setEditStockPromotions] = useState([]);

  // Sitios
  const inputStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    border: "2px solid #fff",
    borderRadius: "5px",
    padding: "2px",
    borderColor: isHovered ? "red" : "#fff" // Cambiar el borde a rojo si el input está en hover
  };

  const inputTableStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    border: "2px solid #fff",
    borderRadius: "5px",
    padding: "2px",
  };

  const selectStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    padding: "5px",
  };

  const optionStyle = {
    color: "#fff",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "5px",
  };


  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    if (promotions.length > 0) {
      setPromotionFilters(promotions);
    }
  }, [promotions]);

  useEffect(() => {
    getPromotions();
  }, []);

  function handleAddPromotion(promotion) {
    // Verificar si la promoción ya existe en el array
    const existingPromotionIndex = editStockPromotions.findIndex(
      (p) => p._id === promotion._id
    );

    // Si la promoción ya existe, actualizarla en el array
    if (existingPromotionIndex != -1) {
      const updatedPromotions = [...editStockPromotions];
      updatedPromotions[existingPromotionIndex] = promotion;
      setEditStockPromotions(updatedPromotions);
    } else {
      // Si la promoción no existe, agregarla al array
      setEditStockPromotions([...editStockPromotions, promotion]);
    }
  }

  useEffect(() => {
    const nameFilter = filters.name.toLowerCase();
    const priceOrder = filters.priceOrder === "asc" ? 1 : -1;
    const activeFilter = filters.active;

    const filteredPromotions = [...promotions]
      .filter((promotion) => {
        return (
          promotion.name.toLowerCase().includes(nameFilter) &&
          (activeFilter === "" || promotion.active === (activeFilter === "true"))
        );
      })
      .sort((a, b) =>
        (parseFloat(a.price.$numberDecimal) - parseFloat(b.price.$numberDecimal)) * priceOrder
      );

    setPromotionFilters(filteredPromotions);
  }, [filters, promotions]);

  function handleFilterChange(event) {
    const { name, value } = event.target;

    setFilters((filters) => ({ ...filters, [name]: value }));
  }

  const handleEdit = (id) => {
    history.push(`/EditarPromociones/${id}`);
  };

  const handleDelete = (promocion) => {
    setSelectedPromotion(promocion);
    onOpen();
  };

  const confirmDelete = () => {
    deletePromotions(selectedPromotion);
    onClose();
  };

  const handleButtonClick = () => {
    modifitedPromotions(editStockPromotions)
  };


  const handleCheck = () => {
    setisChecked(!isChecked)
  }

  return (
    <VStack width="70%" alignSelf="center">
      <Text fontWeight={"bold"} color={"white"} fontSize={"48px"}>
        Administrar empleados
      </Text>
      <HStack alignSelf={"flex-start"}>
        <form>
          <Text fontWeight={"bold"} color={"white"} fontSize={"18px"}>
            Filtros:
          </Text>
          <input
            type="text"
            placeholder="Nombre de la promoción"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
            style={inputStyle}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          />
          {/* <select
            name="priceOrder"
            value={filters.priceOrder}
            style={selectStyle}
            onChange={handleFilterChange}
          >
            <option value="asc" style={optionStyle}>Precio ascendente</option>
            <option value="desc" style={optionStyle}>Precio descendente</option>
          </select>
          <select
            name="active"
            value={filters.active}
            style={selectStyle}
            onChange={handleFilterChange}
          >
            <option value="" style={optionStyle}>
              Todos los estados
            </option>
            <option value="true" style={optionStyle}>
              Activo
            </option>
            <option value="false" style={optionStyle}>
              Inactivo
            </option>
          </select> */}
        </form>
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
            {filteredPromotions?.map((promocion) => (
              <Tr key={promocion._id}>
                <Td color="white">{promocion.name}</Td>
                <Td color="white">
                  {isChecked ?
                    <NumberInput defaultValue={promocion.stock} clampValueOnBlur={false}
                      placeholder="Existencias"
                      onChange={(value) => {
                        const newStock = parseInt(value);
                        if (!isNaN(newStock)) {
                          setIsButtonDisabled(false);
                          promocion.stock = newStock;
                          setPromotionFilters([...filteredPromotions]);
                          handleAddPromotion(promocion)
                        }
                      }}
                      _focus={{ borderColor: "red !important", outline: 'none' }}
                    >
                      <NumberInputField _focus={{ borderColor: 'red !important', boxShadow: '0 0 0 2px rgba(255, 0, 0, 0.5)' }} style={inputTableStyle} />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    :
                    promocion.stock
                  }
                </Td>
                <Td>
                  <Link to={`/Home/EditarPromociones/${promocion._id}`}>
                    <Button onClick={() => handleEdit(promocion._id)}>
                      Editar
                    </Button>
                  </Link>
                </Td>
                <Td>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDelete(promocion._id)}
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
            ¿Está seguro que desea eliminar la promoción{" "}
            {selectedPromotion?.name}?
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

export default LookPromotions;
