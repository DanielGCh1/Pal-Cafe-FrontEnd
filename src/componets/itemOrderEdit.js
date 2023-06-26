import { Stack, Image, Text, IconButton } from "@chakra-ui/react";
import { MinusIcon, AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { useState } from "react";
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

export default function ItemOrderEdit({ itemCart, color, deliteProductList, updateCost }) {
    const [amount, setAmount] = useState(1)

    useEffect(() => {
        setAmount(itemCart.amount);
    }, [itemCart.amount]);

    function increaseAmountItem() {
        if (itemCart.amountProduct < itemCart.stock) {
            itemCart.amountProduct++;
            if (!isUndefinedOrNull(updateCost)) {
                updateCost();
            }
        }
        return itemCart.amountProduct;
    }

    function decreaseAmountItem() {
        if (itemCart.amountProduct > 1) {
            itemCart.amountProduct--;
            if (!isUndefinedOrNull(updateCost)) {
                updateCost();
            }
        }
        return itemCart.amountProduct;
    }
    return <>
        <Stack direction="row" key={itemCart._id}>
            <Image src={itemCart.image} boxSize="50px" />
            <Stack>
                <Text fontWeight="bold">{itemCart.name}</Text>
                <Text>Cantidad: {itemCart.amountProduct}</Text>
            </Stack>
            <Stack direction="row" alignItems="center">
                <IconButton color={color}
                    aria-label="incrementar cantidad"
                    icon={<AddIcon />}
                    onClick={() => setAmount(increaseAmountItem())}
                />
                <IconButton color={color}
                    aria-label="decrementar cantidad"
                    icon={<MinusIcon />}
                    onClick={() => setAmount(decreaseAmountItem())}
                />
                <IconButton color={color}
                    aria-label="decrementar cantidad"
                    icon={<DeleteIcon />}
                    onClick={() => { deliteProductList(itemCart._id) }}
                />
            </Stack>
        </Stack>
    </>
}