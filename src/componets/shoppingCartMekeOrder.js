import { Stack, Image, Text, IconButton, Button } from "@chakra-ui/react";
import { MinusIcon, AddIcon, DeleteIcon } from '@chakra-ui/icons'
import useOrders from '../context/Orders/UseOrders';
import { useNavigate } from "react-router-dom";

export default function ShoppingCartProductList({ idCurtomer }) {
    const { listProductsOrder, increaseAmountItem,
        decreaseAmountItem, deliteProductList } = useOrders();
    const navigate = useNavigate();

    return <>
        {((typeof listProductsOrder !== 'undefined') && (listProductsOrder.length > 0))
            ?
            <Stack spacing={4}>

                {listProductsOrder.map((productCart) => (
                    <Stack direction="row" key={productCart._id}>
                        <Image src={productCart.image} boxSize="50px" />
                        <Stack>
                            <Text fontWeight="bold">{productCart.name}</Text>
                            <Text>Cantidad: {productCart.amountProduct}</Text>
                        </Stack>
                        <Stack direction="row" alignItems="center">
                            <IconButton color="black"
                                aria-label="incrementar cantidad"
                                icon={<AddIcon />}
                                onClick={() => { }}
                            />
                            <IconButton color="black"
                                aria-label="decrementar cantidad"
                                icon={<MinusIcon />}
                                onClick={() => { }}
                            />
                            <DeleteIcon
                                aria-label="decrementar cantidad"
                                icon={<MinusIcon />}
                                onClick={() => { }}
                            />
                        </Stack>
                    </Stack>
                ))}
            </Stack>

            : null}
    </>
}