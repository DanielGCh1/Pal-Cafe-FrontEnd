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
  VisuallyHidden,
  List,
  ListItem,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import { Link } from '@chakra-ui/react'

export default function ProductoPresentacion() {
  return (
    <Link href='/ProductoVentaPedido'>
      <Image
        rounded={'md'}
        alt={'product image'}
        src={require('../assets/panDulce.png')}
        fit={'cover'}
        align={'center'}
        w={'10rem'}
        h={'10rem'}
      />
    </Link>

  );
}