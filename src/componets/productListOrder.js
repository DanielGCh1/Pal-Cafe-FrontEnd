import { Stack, Image, Text, IconButton, Button } from "@chakra-ui/react";
import { MinusIcon, AddIcon, DeleteIcon } from '@chakra-ui/icons'
import useOrders from '../context/Orders/UseOrders';
import { useNavigate } from "react-router-dom";
import ItemOrder from "./itemOrder";

export default function ProductListOrder({listProductsOrder}) {
    const { deliteProductList } = useOrders();
    const navigate = useNavigate();

    return <>
        {((typeof listProductsOrder !== 'undefined') && (listProductsOrder.length > 0))
            ?
            <Stack spacing={4}>

                {listProductsOrder.map((productCart) => (
                    <ItemOrder itemCart={productCart} color="white" 
                    deliteProductList={deliteProductList} />
                ))}
            </Stack>

            : null}
    </>
}