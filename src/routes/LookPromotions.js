import { Table, Thead, Tbody, Tr, Th, Td, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure } from "@chakra-ui/react";
import { createBrowserHistory } from "history";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UsePromotion from '../context/Promotion/UsePromotion';

const LookPromotions = () => {
  const { promotions, deletePromotions, getPromotions } = UsePromotion();
  const [filteredPromotions, setPromotionFilters] = useState([]);
  const history = createBrowserHistory();
  const [filters, setFilters] = useState({
    name: "",
    priceOrder: "asc",
    active: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPromotion, setSelectedPromotion] = useState(null);

  useEffect(() => {
    if (promotions.length > 0) {
      setPromotionFilters(promotions);
    }
  }, [promotions]);

  useEffect(() => {
    getPromotions();
  }, []);


  useEffect(() => {
    const nameFilter = filters.name.toLowerCase();
    const priceOrder = filters.priceOrder === "asc" ? 1 : -1;
    const activeFilter = filters.active;
    console.log(nameFilter)

    const filteredPromotions = [...promotions]
      .filter((promotion) => {
        console.log(promotion.name)
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
              <Td>{promocion.stock}</Td>
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
