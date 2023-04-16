import { Stack, Image, Text, IconButton } from "@chakra-ui/react";
import { MinusIcon, AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { useState } from "react";
import { useEffect } from 'react';

export default function ItemOrder({ itemCart, color, deliteProductList }) {
    const [amount, setAmount] = useState(1)

    const increaseAmountItem = () => {
        if (itemCart.amountProduct < itemCart.stock) {
            itemCart.amountProduct++;
        }
      }
      
      const decreaseAmountItem = () => {
        if (itemCart.amountProduct > 1) {
            itemCart.amountProduct--;
        }
      }
    return <>
        <Stack direction="row" key={itemCart._id}>
            <Image src={itemCart.image} boxSize="50px" />
            <Stack>
                <Text fontWeight="bold">{itemCart.name}</Text>
                <Text>Cantidad: {itemCart.amountProduct}</Text>
            </Stack>
            <Stack direction="row" alignItems="center">
                <DeleteIcon
                    aria-label="decrementar cantidad"
                    icon={<MinusIcon />}
                    onClick={() => {deliteProductList(itemCart._id) }}
                />
            </Stack>
        </Stack>
    </>
}