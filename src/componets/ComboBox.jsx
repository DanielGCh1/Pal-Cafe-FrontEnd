import { Card, CardBody, Select, Box, Editable, EditablePreview, EditableInput, Input } from '@chakra-ui/react'
import { useState, useEffect} from 'react';

function ComboBox({ options, onChange, searchable }) {
  const [filterInput, setFilterInput] = useState('');

  const filteredOptions = options.filter(option =>
    option.nombre.toLowerCase().includes(filterInput.toLowerCase())
  );

  const handleChange = event => {
    const selected = options.find(p => (p.nombre === event.target.value))
    onChange(selected)
  };

  const handleFilterChange = event => {
    setFilterInput(event.target.value);
  };

  return (
    <>
      <Box w="230px" bg="rgba(0,0,0,0.3)" padding="1%" borderRadius="5px" >
          {searchable && (
              <Input variant='flushed' marginBottom="1" placeholder='Buscar' _placeholder={{ opacity: .4, color: 'white' }} onChange={handleFilterChange}  /> 
          )}
          <Select fontWeight= "bold" size='sm' border="none" hover="none" color="#000" onChange={handleChange} >
              {filteredOptions.map(option => (
              <option value={option.nombre} key={option.id}>
                  {option.nombre}
              </option>
              ))}
          </Select>
      </Box>
    </>
  );
}

export default ComboBox;