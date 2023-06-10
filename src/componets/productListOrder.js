import { Stack, Image, Text, IconButton, Button, SimpleGrid } from "@chakra-ui/react";
import { MinusIcon, AddIcon, DeleteIcon } from '@chakra-ui/icons'
import useOrders from '../context/Orders/UseOrders';
import { useNavigate } from "react-router-dom";
import ItemOrder from "./itemOrder";
import ItemOrderEdit from "./itemOrderEdit";

export default function ProductListOrder({ listProductsOrder, edit, color, updateCost }) {
    const { deliteProductOrederList } = useOrders();
    const navigate = useNavigate();

    return <>
        {((typeof listProductsOrder !== 'undefined') && (listProductsOrder.length > 0))
            ?
            <SimpleGrid columns={[1, 2, 3]} spacing='30px' alignItems='center' w="100%">
                {listProductsOrder.map((productCart) => (
                    <ItemOrder key={productCart._id} itemCart={productCart} color={color}
                    />
                ))}
            </SimpleGrid>

            : null}
    </>
}