import { Table, Thead, Tbody, Tr, Th, Td, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure, Checkbox } from "@chakra-ui/react";
import { createBrowserHistory } from "history";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UsePromotion from '../context/Promotion/UsePromotion';

const LookPromotions = () => {
  const { promotions, deletePromotions, getPromotions } = UsePromotion();
  const [filteredPromotions, setPromotionFilters] = useState([]);
  const [isChecked, setisChecked] = useState(false);
  const promocionesModificadas = [];
  const history = createBrowserHistory();
  const [filters, setFilters] = useState({
    name: "",
    priceOrder: "asc",
    active: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (promotions.length > 0) {
      setPromotionFilters(promotions);
    }
  }, [promotions]);

  useEffect(() => {
    getPromotions();
  }, []);
  const [editStockPromotions, setEditStockPromotions] = useState([]);

  function handleAddPromotion(promotion) {
    // Verificar si la promoción ya existe en el array
    const existingPromotionIndex = editStockPromotions.findIndex(
      (p) => p.id === promotion.id
    );

    // Si la promoción ya existe, actualizarla en el array
    if (existingPromotionIndex !== -1) {
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

  };


  const handleCheck = () => {
    setisChecked(!isChecked)
  }

  return (
    <>
      <form>
        <input
          type="text"
          placeholder="Nombre de la promoción"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
        />
        <select
          name="priceOrder"
          value={filters.priceOrder}
          onChange={handleFilterChange}
        >
          <option value="asc">Precio ascendente</option>
          <option value="desc">Precio descendente</option>
        </select>
        <select
          name="active"
          value={filters.active}
          onChange={handleFilterChange}
        >
          <option value="">Todos los estados</option>
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>
      </form>
      <Checkbox isChecked={isChecked} onChange={handleCheck}>
        Desbloquear existencias
      </Checkbox>
      <Button onClick={handleButtonClick} disabled={isButtonDisabled}>
        Guardar cambios en existencias
      </Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Existencias</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredPromotions?.map((promocion) => (
            <Tr key={promocion._id}>
              <Td>{promocion.name}</Td>
              <Td>
                {isChecked ?
                  <input
                    type="number"
                    placeholder={promocion.stock}
                    onChange={(e) => {
                      const newStock = parseInt(e.target.value);
                      if (!isNaN(newStock)) {
                        setIsButtonDisabled(false);
                        promocion.stock = newStock;
                        setPromotionFilters([...filteredPromotions]);
                      } else {
                        e.target.value = 0
                      }
                    }}></input>
                  :
                  promocion.stock
                }
              </Td>
              <Td>
                <Button
                  colorScheme="red"
                  onClick={() => handleDelete(promocion._id)}
                >
                  Eliminar
                </Button>
                <Link to={`/Home/EditarPromociones/${promocion._id}`}>
                  <Button onClick={() => handleEdit(promocion._id)}>
                    Editar
                  </Button>
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
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
    </>
  );
};

export default LookPromotions;
