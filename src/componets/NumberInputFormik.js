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

export default function NumberInputFormik({ nam, value, val, orderNum }) {
    function increaseOrderNumber() {
        orderNum(value)
    }

    return (
        <>
            <Field name={nam} component={value} validate={val}>
                {({ field, form}) => (
                    <FormControl isInvalid={form.touched.name}>
                        <NumberInput {...field} >
                            <NumberInputField {...field} />
                            <NumberInputStepper >
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
                )}
            </Field>
        </>
    );
}
