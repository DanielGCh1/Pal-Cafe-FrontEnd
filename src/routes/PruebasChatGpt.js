
import {
    Button,
    Box,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
  } from "@chakra-ui/react";
  import { FaBars } from "react-icons/fa";
  
  export default function PruebasChatGpt() {
  
    const { isOpen, onOpen, onClose } = useDisclosure();
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
  