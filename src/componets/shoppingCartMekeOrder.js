import { Stack, Image, Text, IconButton, Button } from "@chakra-ui/react";
import { MinusIcon, AddIcon, DeleteIcon } from '@chakra-ui/icons'
import useOrders from '../context/Orders/UseOrders';
import { useNavigate } from "react-router-dom";
import ItemOrderEdit from "./itemOrderEdit";

export default function ShoppingCartProductList({ idCurtomer, updateCost}) {
    const { listProductsOrder, deliteProductList } = useOrders();
    const navigate = useNavigate();

    return <>
        {((typeof listProductsOrder !== 'undefined') && (listProductsOrder.length > 0))
            ?
            <Stack spacing={4}>
                {listProductsOrder.map((productCart) => (
                    <ItemOrderEdit itemCart={productCart} color="black" 
                    deliteProductList={deliteProductList} updateCost={updateCost}/>
                ))}
            </Stack>
            : null}
    </>
}