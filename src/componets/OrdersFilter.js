import { Button, Input, InputGroup, InputRightElement, Select, Box } from '@chakra-ui/react';
import { useState } from 'react';
import { useEffect } from 'react';

const isUndefined = obj => {
    if (obj === "undefined" || typeof obj === "undefined") {
        return true;
    }
    return false;
};

const isNull = obj => {
    if (obj === null) {
        return true;
    }
    return false;
};

const isUndefinedOrNull = obj => {
    if (isUndefined(obj) || isNull(obj)) {
        return true;
    }
    return false;
};

export default function OrdersFilter({ ordersAux, setOrder }) {
    const [searchValue, setSearchValue] = useState('');
    const [statusFilter, setStatusFilter] = useState('Todos'); // Estado inicial 'Todos'

    const handleFilterOrders = () => {
        const filteredOrders = ordersAux.filter((ord) =>
            ord.name_customer.toLowerCase().includes(searchValue.toLowerCase())
            && (statusFilter === 'Todos' || ord.state === statusFilter) // Filtrar por estado si no es 'Todos'
        );

        if (!isUndefinedOrNull(filteredOrders)) {
            const list = [];
            filteredOrders.map((data) => {
                const order = {
                    _id: data._id,
                    name_customer: data.name_customer,
                    address: data.address,
                    dateHour: data.dateHour,
                    reasonRejection: data.reasonRejection,
                    phoneNumber1: data.phoneNumber1,
                    phoneNumber2: data.phoneNumber2,
                    customerNote: data.customerNote,
                    customer_id: data.customer_id,
                    specialOrder: data.specialOrder,
                    listProductsOrder: data.listProductsOrder,
                    cost: data.cost,
                    state: data.state,
                    imagesOrder: data.imagesOrder,
                    sendeOrder: data.sendeOrder
                }
                list.push(order);
            });
            setOrder(list);
            console.log(list);
        }
    };

    useEffect(() => {
        handleFilterOrders();
    }, [searchValue, statusFilter]);

    return (
        <InputGroup size="md" width="300px" marginBottom="4">
            <Input
                color='white'
                placeholder="Buscar pedidos..."
                _placeholder={{ color: 'white' }}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <Select
                className="selectStyle"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                marginLeft="2"
            >
                <Box as="option" value="Todos" className="optionStyle">
                    Todos
                </Box>
                <Box as="option" value="Aceptado" className="optionStyle" >
                    Aceptado
                </Box>
                <Box as="option" value="Rechazado" className="optionStyle">
                    Rechazado
                </Box>
                <Box as="option" value="Pendiente" className="optionStyle">
                    Pendiente
                </Box>
                <Box as="option" value="Fallido" className="optionStyle" >
                    Concluido
                </Box>
            </Select>
        </InputGroup>
    );
}
