import { Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, HStack, Heading, Icon, Image, Input, Stack, StackDivider, Text, VStack, useDisclosure } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import React, { useContext, useEffect, useState } from "react"
import '../css/notificaciones.css';
//import NotiContext from '../context/Notificaciones/NotiContext';
import axios from 'axios';
import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/card";
import { ArrowDownIcon } from "@chakra-ui/icons"
import API from '../context/api';
import io from 'socket.io-client';


const Notificaciones = () => {
        const { isOpen, onOpen, onClose } = useDisclosure()
        const btnRef = React.useRef()
        
        //const { theme, toggleTheme } = useContext(NotiContext);

        const [notis, setNotis] = useState([])
        const [no_vistas, setNo_vistas] = useState(0)
        const [lista_no_vistas, setLista_no_vistas] = useState([])
        const [actualizar, setActualizar] = useState(false)

        useEffect(() => {
          async function getNotificaciones (){
            try {
              const res = await axios.get('/api/notificaciones')
              setNotis(res.data) 
            } catch (error) {
              console.log(error);
            } 
          }

          getNotificaciones()
        }, [actualizar])
        
        useEffect(() => {
          const num = notis.filter((noti) => !noti.visto).length
          setNo_vistas(num)
          const list = notis.filter(noti => noti.visto === false)
          setLista_no_vistas(list)
        }, [notis])
        

        async function vistas () {         
          try {
            if (lista_no_vistas.length !== 0) await axios.put('/api/notificaciones/edit/', lista_no_vistas);         
          } catch (error) {
            console.log("la consulta fallo, procedo a setear unos datos por defecto");
          }
        }

        const handleEliminar = (id) => {
            console.log("Eliminar") 
            axios.delete(`/api/notificaciones/delete/${id}`)
              .then((res) => {
                setNotis(notis.filter(noti => noti.id !== id)) 
                setActualizar(!actualizar)
                console.log(res.data)
              })
              .catch(error => console.error(error));
        }
      
        return (
          <>
            <div id="container">
              <Button id="notificaciones" ref={btnRef} onClick={() => {onOpen(); vistas(); setLista_no_vistas([]); setNo_vistas(0)}}>
                  <p id="qty">{no_vistas}</p>            
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
                <Text color="white" ml="6" mt="-3">{notis.length}<Icon as={ArrowDownIcon} /></Text>
                <DrawerBody >
                  {notis.map((n) => (
                    <Card 
                      bgGradient={
                        (n.asunto === "Pedido") ? ("linear(to-l, #ffffff00,#0061bda9)") : 
                        (n.asunto === "Cliente") ? ("linear(to-l, #ffffff00,#7e7e7ea9)") :
                        ("linear(to-l, #ffffff00,#be000083)")
                      }
                      borderRadius="xl"
                      color="white"
                      p={2}
                      my={2}
                      key={n.id}
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
                                  alt=''
                                /> ): 
                                (n.asunto === 'Cliente') ? (<Image
                                  objectFit='cover'
                                  maxW={{ base: '10%', sm: '40px' }}
                                  src={require('../assets/customer.png')}
                                  alt=''
                                /> ) : 
                                (<Image
                                  objectFit='cover'
                                  maxW={{ base: '10%', sm: '40px' }}
                                  src={require('../assets/inventory.png')}
                                  alt=''
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
                          <Button _hover={{ backgroundColor: "#ffffff49"}} width={"60%"} flex='1' variant='ghost' color="#bb0000" onClick={() => handleEliminar(n.id_notificacion)}>
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