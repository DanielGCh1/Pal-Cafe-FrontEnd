import { Stack} from "@chakra-ui/react";
import useOrders from '../context/Orders/UseOrders';
import ItemOrderEdit from "./itemOrderEdit";

export default function ShoppingCartProductList() {
    const { listProductsOrder, deliteProductList } = useOrders();

    return <>
        {((typeof listProductsOrder !== 'undefined') && (listProductsOrder.length > 0))
            ?
            <Stack spacing={4}>
                {listProductsOrder.map((productCart) => (
                    <ItemOrderEdit itemCart={productCart} color="black" 
                    deliteProductList={deliteProductList} />
                ))}
            </Stack>

            : null}
    </>
}