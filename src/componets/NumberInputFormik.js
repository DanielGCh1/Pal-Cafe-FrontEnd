import { Field, Form, Formik } from 'formik';
import React, { createContext, useState } from 'react';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Button,
    Box,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    isInvalid,
    isError,
    Input,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper
} from "@chakra-ui/react";

import { Stack, Image, Text, IconButton } from "@chakra-ui/react";
import { MinusIcon, AddIcon, DeleteIcon } from '@chakra-ui/icons'

export default function NumberInputFormik({ nam, value, val, item }) {

    const [amount, setAmount] = useState(value);

    function increaseAmountItem() {
        console.log(value);
        console.log(item.stock);
        if (value < item.stock) {
            value++;
            return value;
        }
        else {
            return amount;
        }
    }

    function decreaseAmountItem() {
        if (value > 1) {
            value--;
        }
        return value;
    }

    return (
        <>
            <Field name={nam} component={value} validate={val}>
                {({ field, form }) => (
                    <Stack direction="row" alignItems="center">

                        <Text>Cantidad: {amount}</Text>

                        <IconButton color={'black'}
                            aria-label="incrementar cantidad"
                            icon={<AddIcon />}
                            onClick={() => setAmount(increaseAmountItem())}
                        />
                        <IconButton color={'black'}
                            aria-label="decrementar cantidad"
                            icon={<MinusIcon />}
                            onClick={() => setAmount(decreaseAmountItem())}
                        />
                    </Stack>
                )}
            </Field>

        </>
    );
}
