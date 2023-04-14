import { Box, ButtonGroup, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, HStack, Heading, Image, Input, Stack, StackDivider, Text, VStack, useDisclosure } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import React, { useContext, useEffect, useState } from "react"
import '../css/notificaciones.css';
//import NotiContext from '../context/Notificaciones/NotiContext';
import axios from 'axios';
import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/card";
import API from '../context/api';


const Notificaciones = () => {
        const { isOpen, onOpen, onClose } = useDisclosure()
        const btnRef = React.useRef()
        
        //const { theme, toggleTheme } = useContext(NotiContext);

        //const [notis, setNotis] = useState([]);
        const [no_vistas, setNo_vistas] = useState(0);

        useEffect(() => {
          getProducts()
        }, )
        
        const getProducts = async () => {
          try {
            //Obtener todos los productos de la parte del cliente, sin todos los datos
            const res = await axios.get('/api/notificaciones');
            //const res = await axios.get('https://reqres.in/api/users');
            console.log(res.data)
          } catch (error) {
            console.log("la consulta fallo, procedo a setear unos datos por defecto");
          }
        };
        
        const notificaciones = [
          {
              "id_notificacion": "6434c526dc04f4fa82f67cd1",
              "asunto": "Pedido",
              "nombre": "Juan",
              "detalle": "Para este martes",
              "visto": true
          },
          {
              "id_notificacion": "6434c5e2dc04f4fa82f67cd2",
              "asunto": "Cliente",
              "nombre": "Maria",
              "detalle": "Cliente nivel excelente",
              "visto": false
          },
          {
            "id_notificacion": "6434c5e2dc04f4fa82f67cd3",
            "asunto": "Ingrediente",
            "nombre": "Azucar",
            "detalle": "Apunto de agotarse",
            "visto": false
          }
        ]

        const qty_no_vistas = () => {
          notificaciones.map(noti => {
            if (noti.visto === false) setNo_vistas(no_vistas += 1)
          })
          console.log(no_vistas)
          return no_vistas
        }
      
        return (
          <>
            <div id="container">
                <Button id="notificaciones" ref={btnRef} onClick={onOpen}>
                    <p id="qty">{qty_no_vistas}</p>            
                </Button>
            </div>
            
            <Drawer
              isOpen={isOpen}
              placement='right'
              onClose={onClose}
              finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent bg="#000000de" style={{borderRadius: 20}} m="4" >
                <DrawerCloseButton color="white" mt="2"/>
                <DrawerHeader color="white" >Notificaciones</DrawerHeader>
      
                <DrawerBody >
                  {notificaciones.map((n) => (
                    <Card 
                      bgGradient={
                        (n.asunto === "Pedido") ? ("linear(to-l, #ffffff00,#00eeff79)") : 
                        (n.asunto === "Cliente") ? ("linear(to-l, #ffffff00,#fbff0079)") :
                        ("linear(to-l, #ffffff00,#ff000079)")
                      }
                      borderRadius="xl"
                      color="white"
                      p={2}
                      my={2}
                    >
                      <CardBody>
                        <VStack my="2">
                          <HStack>
                            <div>
                              {
                                (n.asunto === 'Pedido') ? (<Image
                                  objectFit='cover'
                                  maxW={{ base: '10%', sm: '40px' }}
                                  src={require('../assets/buy.png')}
                                  alt='Caffe Latte'
                                /> ): 
                                (n.asunto === 'Cliente') ? (<Image
                                  objectFit='cover'
                                  maxW={{ base: '10%', sm: '40px' }}
                                  src={require('../assets/customer.png')}
                                  alt='Caffe Latte'
                                /> ) : 
                                (<Image
                                  objectFit='cover'
                                  maxW={{ base: '10%', sm: '40px' }}
                                  src={require('../assets/inventory.png')}
                                  alt='Caffe Latte'
                                />)
                              }
                            </div>
                            <h2 style={{fontSize: "1.5rem", fontWeight: "bold" }}>{n.asunto}</h2>
                          </HStack>
                          <Divider />
                          <HStack>
                              <h3 style={{fontSize: "1rem", fontWeight: "bold" }}>{n.nombre} :</h3>
                          </HStack>
                          <HStack>
                              <h4>{n.detalle}</h4>
                          </HStack>
                          <Divider />
                          <Button width={"70%"} flex='1' variant='ghost' color="red">
                              Eliminar
                          </Button>
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                </DrawerBody>
      
                <DrawerFooter>
                  
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </>
        )
}

export default Notificaciones