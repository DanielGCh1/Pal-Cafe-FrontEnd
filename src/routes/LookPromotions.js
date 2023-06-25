import { Table, Thead, Tbody, Tr, Th, Td, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure, Checkbox, Tfoot, Text, VStack, Input, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Box, HStack, Select } from "@chakra-ui/react";
import { createBrowserHistory } from "history";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UsePromotion from '../context/Promotion/UsePromotion';
import { ChevronDownIcon } from "@chakra-ui/icons";

const LookPromotions = () => {
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


  useEffect(() => {
    if (promotions.length > 0) {
      setPromotionFilters(promotions);
    }
  }, [promotions]);

  useEffect(() => {
    getPromotions();
  }, []);

  function handleAddPromotion(promotion) {
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
    console.log(event)
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
    <VStack w={"100%"} height={"100%"} overflowY={"scroll"}>
      <VStack width="70%" alignSelf="center">
        <Text fontWeight={"bold"} color={"white"} fontSize={"48px"}>
          Buscar promociones
        </Text>
        <HStack alignSelf={"flex-start"} width={"100%"}>
          <form className="formFiltros">
            <Text fontWeight={"bold"} color={"black"} fontSize={"18px"}>
              Filtros:
            </Text>
            <input
              type="text"
              placeholder="Nombre de la promoción"
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
              className={"inputStyle"}
            />
            <div className="content-select">
              <Select
                name="priceOrder"
                value={filters.priceOrder}
                className="selectStyle"
                onChange={handleFilterChange}
                icon={<ChevronDownIcon />}
              >
                <Box as="option" value="asc" className="optionStyle" _hover={{ bg: "#b31b1b" }}>
                  Precio ascendente
                </Box>
                <Box as="option" value="desc" className="optionStyle" _hover={{ bg: "#b31b1b !important" }}>
                  Precio descendente
                </Box>
              </Select>
              <span className="select-arrow">&#9662;</span>
            </div>

            <div className="content-select">
              <Select
                name="active"
                value={filters.active}
                className="selectStyle"
                onChange={handleFilterChange}
                icon={<ChevronDownIcon />}
              >
                <Box as="option" value="" >
                  Todos los estados
                </Box>
                <Box as="option" value="true">
                  Activo
                </Box>
                <Box as="option" value="false">
                  Inactivo
                </Box>
              </Select>
              <span className="select-arrow">&#9662;</span>
            </div>

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
                <Th color="white" fontWeight={"bold"}>Existencias</Th>
                <Th color="white" fontWeight={"bold"}>Editar</Th>
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
                        <NumberInputField _focus={{ borderColor: 'red !important', boxShadow: '0 0 0 2px rgba(255, 0, 0, 0.5)' }} classname={"inputTableStyle"} />
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
                <Th color="white">Nombre</Th>
                <Th color="white">Existencias</Th>
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
        <VStack alignSelf={"flex-end"}>
          <Checkbox isChecked={isChecked} onChange={handleCheck} colorScheme="red" color={"white"}>
            Desbloquear existencias
          </Checkbox>
          <Button onClick={handleButtonClick} disabled={isButtonDisabled}>
            Guardar cambios en existencias
          </Button>
        </VStack>
      </VStack >
    </VStack>
  );
};

export default LookPromotions;
