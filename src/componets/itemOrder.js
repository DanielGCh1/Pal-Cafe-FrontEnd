import { Stack, Image, Text, IconButton } from "@chakra-ui/react";
import { MinusIcon, AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { useState } from "react";
import { useEffect } from 'react';

export default function ItemOrder({ itemCart, color }) {

    return <>
        <Stack direction="row" key={itemCart._id}>
            <Image src={itemCart.image} boxSize="50px" />
            <Stack>
                <Text fontWeight="bold">{itemCart.name}</Text>
                <Text>Cantidad: {itemCart.amountProduct}</Text>
            </Stack>
        </Stack>
    </>
}