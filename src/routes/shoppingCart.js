
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
import { FaBars } from "react-icons/fa";
import { Field, Form, Formik } from 'formik';
import { FormikProps } from "formik";
import React, { createContext, useState } from 'react';
import NumberInputFormik from '../componets/NumberInputFormik'
import { useRef } from "react";
const isNumber = obj => {
  if (typeof obj === "number") {
    return true;
  }
  return false;
};

const validateOrderQuantity = obj => {
  if (isNumber(obj) && obj >= 1 && obj <= 10) {
    return true;
  }
  return false;
};

export default function PruebasChatGpt() {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [input, setInput] = useState('')

  const handleInputChange = (e) => setInput(e.target.value)

  const isError = input === ''

  function validateName(value) {
    console.log(value);
    let error
    if (!value) {
      error = 'Name is required'
    } else if (value.toLowerCase() !== 'naruto') {
      error = "Jeez! You're not a fan 😱"
    }
    return error
  }
  function increaseOrderNumber(props) {
    console.log("Ref");
    console.log(ref.current.values)
    console.log("Ref "+ typeof ref.current.values.amount);

    if (ref.current.values.amount < 10) {
      ref.current.values.amount++;
    }
    return ref.current.values.amount
  }

  function decreaseOrderNumber(value) {

  }

  function validateOrderValue(value) {
    console.log("Valor de props.values.amount " + typeof value);
    var order = parseInt(value);
    if (!isNumber(order)) {
    
    }
    if (order < 1) {
    
      console.log("Menor que 1");
    }
    if (order > 10) {
     
      console.log("Mayor que 1");
      //value = String(order);
    }
    console.log("Esta bien");
    
    value = order
  };

  const ref = useRef(null);
  return (
    <>
      <Button leftIcon={FaBars} onClick={onOpen} />

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />

        <DrawerContent>

          <DrawerCloseButton />

          <Box p={4}>Menu</Box>

        </DrawerContent>

      </Drawer>

    </>
  );
}
