import { Button, Box, Heading, VStack, Spacer } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import useOrders from '../context/Orders/UseOrders';
import TableComponent from '../componets/TableManagerOrders';
import { Link, useNavigate } from "react-router-dom";
import OrdersFilter from '../componets/OrdersFilter';

export default function ManargeOrders() {
    const { orders, deliteOrder, editOrders, getOrders, getListProductsOrder, ordersAux, setOrder,setOrders } = useOrders();
    const navigate = useNavigate();
    const [searchOrders, setSearchOrders] = useState(true)

    useEffect(() => {
        if ((typeof orders == 'undefined' || orders.length <= 0) && searchOrders) {
            getOrders();
            setSearchOrders(false);
        }
    }, )

    const handleEdit = (value) => {//TODO:
        if (window.confirm("¿Estás seguro de que quieres habandonar esta pagina, para cargar la ventana de editar este pedido?")) {
            setOrder(null);
            navigate(`/home/EditarOrden/${value._id}`)
        }
    };

    const handleDelete = (id) => {//TODO:
        if (window.confirm("¿Estás seguro de que quieres eliminar este pedido?")) {
            console.log(`Eliminar ${id}`);
            deliteOrder(id);
        }
    };

    const handleEditOrders = () => {//TODO:
        editOrders();
    };
    return <>
        <VStack  alignItems='center' h='100vh' maxHeight="55rem">

            <Box p='6' display="flex" justifyContent={'center'}>
                <Heading color="white" fontWeight="bold" size='2xl'>Administrar Pedidos</Heading>
            </Box>
            <OrdersFilter ordersAux={ordersAux} setOrder={setOrders}></OrdersFilter>
            <VStack maxWidth="100rem" margin="0 auto" display="flex" flexDirection='column' h='100vh' maxHeight="55rem">
                <TableComponent data={orders} onEdit={handleEdit} onDelete={handleDelete} saveChangesOrders={handleEditOrders} getListProductsOrder={getListProductsOrder}/>
            </VStack>
        </VStack>

    </>
}