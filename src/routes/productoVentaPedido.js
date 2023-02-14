import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';

import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import useProducts from '../context/Product/UseProduct';
import { object } from 'yup';

//TODO:  
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

const isEmptyString = obj => {
  if (obj === "" || obj.trim() === "") {//Trim: remove blank spaces
    return true;
  }
  return false;
};

const getImage = obj => {
  if (!isUndefinedOrNull(obj) && !isEmptyString(obj.pro_imagen)) {//Trim: remove blank spaces
    return obj.pro_imagen;
  }
  return require('../assets/ImagenNoEncontrada.png');
};

const getName = obj => {
  if (!isUndefinedOrNull(obj) && !isEmptyString(obj.pro_nombre)) {
    return obj.pro_nombre;
  }
  return "No disponible";
};

const getUnits = obj => {
  if (!isUndefinedOrNull(obj)) {
    if (obj.pro_unidades == 1) {
      return obj.pro_unidades + " Unidad";
    }
    else {
      return obj.pro_unidades + " Unidades";
    }
  }
  return "No disponible";
};
const getPrice = obj => {
  if (!isUndefinedOrNull(obj)) {
    return "₡ " + obj.pro_valor_venta;
  }
  return "No disponible";

};
const getStock = obj => {
  if (!isUndefinedOrNull(obj)) {
    return obj.pro_existencias;
  }
  return 0;
};

const getStockText = obj => {
  if (!isUndefinedOrNull(obj)) {
    if (getStock(obj) == 1) {
      return obj.pro_existencias + " Existencia";
    }
    else {
      return obj.pro_existencias + " Existencias";
    }
  }
  return 0;
};


const getDescription = obj => {
  if (!isUndefinedOrNull(obj) && !isEmptyString(obj.pro_descripcion)) {
    return obj.pro_descripcion;
  }
  return "No disponible";
};




export default function ProductoVentaPedido() {

  const addCart = obj => {
    console.log(valueQuantityOrdered);
    /*if (!isUndefinedOrNull(obj) && !isEmptyString(obj.pro_descripcion)) {
      return obj.pro_descripcion;
    }
    return "No disponible";*/
  };
  const { products, productSelected, setProducts, getProduct, getProducts, setProductSelected } =
    useProducts();
  const params = useParams()

  const [valueQuantityOrdered, setValueQuantityOrdered] = useState(1);

  const handleInputChangeQuantityOrdered = (e) => setValueQuantityOrdered(e.target.value);

  useEffect(() => {
    console.log("Params", params)

    var hola = "undefined";

    if (isUndefinedOrNull(hola)) {
      console.log("El valor  indefinido o nulo");
    }


    var nulo = "";
    if (isNull(nulo)) {
      console.log("El valor si es nulo");
    }

    var espacios = "";
    if (isEmptyString(espacios)) {
      console.log("El string si esta vacio");
    }

    if (isUndefinedOrNull(products) || products.length <= 0) {
      getProducts();
    }

    if (isUndefinedOrNull(productSelected)) {
      getProduct(params.id);
    }

  }, [products, productSelected]);

  /*
const errors = validate(
selected ? selected.id : '',
selected ? selected.last_name : 'hola',
selected ? selected.first_name : '',
selected ? selected.email : '',
selected ? selected.first_name : '',
selected ? selected.first_name : ''
);*/

  const handleClick = id => {
    getProduct(params.id);
  };

  //const { match: { params } } = this.props;
  const hola = id => {

    console.log(products);
    console.log(productSelected);
    console.log("Lo que imprime idProdu", params.id, ".")
    console.log(valueQuantityOrdered);
  };




  return <>



    <Button onClick={hola}>

    </Button>

    <Stack backgroundSize='cover' maxW='100%' h='calc(100vh)' p='0'
      justifyContent='center' >

    </Stack>

    <SimpleGrid
      columns={{ base: 1, lg: 2 }}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 18, md: 24 }}>
      <Flex>
        <Image

          rounded={'md'}
          alt={'product image'}
          src={/*!isUndefinedOrNull(productSelected) ? productSelected.pro_imagen : require('../assets/ImagenNoEncontrada.png')*/
            getImage(productSelected)}
          fit={'cover'}
          align={'center'}
          w={'100%'}
          h={{ base: '100%', sm: '400px', lg: '500px' }}
        />
      </Flex>
      <Stack spacing={{ base: 6, md: 10 }}>
        <Box as={'header'}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
            {getName(productSelected)}
          </Heading>
          <Text
            color={useColorModeValue('gray.900', 'gray.400')}
            fontWeight={300}
            fontSize={'2xl'}>
            {getUnits(productSelected)}
          </Text>
          <Text
            color={useColorModeValue('gray.900', 'gray.400')}
            fontWeight={300}
            fontSize={'2xl'}>
            {getStockText(productSelected)}
          </Text>
          <Text
            color={useColorModeValue('gray.900', 'gray.400')}
            fontWeight={300}
            fontSize={'2xl'}>
            {getPrice(productSelected)}
          </Text>
        </Box>

        <Stack
          spacing={{ base: 4, sm: 6 }}
          direction={'column'}
          divider={
            <StackDivider
              borderColor={useColorModeValue('gray.200', 'gray.600')}
            />
          }>
          <VStack spacing={{ base: 4, sm: 6 }}>
            <Text fontSize={'lg'}>
              {getDescription(productSelected)}
            </Text>
          </VStack>
          {(getStock(productSelected) >= 1) ?

            <Formik
              initialValues={{ name: 'Sasuke' }}
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2))
                  actions.setSubmitting(false)
                }, 1000)
              }}
            >
              <Form>
                <NumberInput min={1} max={getStock(productSelected)}
                  name={'quantityOrdered'}
                  defaultValue={valueQuantityOrdered}
                  value={valueQuantityOrdered}
                  onChange={handleInputChangeQuantityOrdered}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Button
                  mt={4}
                  colorScheme='red'
                  onClick={addCart(valueQuantityOrdered)}
                  type='submit'
                  marginTop='10'
                >
                  Guardar Cambios
                </Button>
              </Form>
            </Formik>
            : null
          }



        </Stack>
      </Stack>
    </SimpleGrid>



  </>
}
/*
const validate = (
  name,
  description,
  amount,
  materialPrice,
  salePrice,
  preparationTime
) => {
  if (name !== undefined) if (name.length === 0) return 'Se requiere un nombre';
  if (description !== undefined)
    if (description.length === 0) return 'Se requiere una descripcion';
  if (amount !== undefined)
    if (amount.length === 0) return 'Se requiere una cantidad';
  if (materialPrice !== undefined)
    if (materialPrice.length === 0)
      return 'Se requiere el gasto en ingredientes';
  if (salePrice !== undefined)
    if (salePrice.length === 0) return 'Se requiere el precio de venta';
  if (preparationTime !== undefined)
    if (preparationTime.length === 0)
      return 'Se requiere el tiempo preparacion';
};*/
