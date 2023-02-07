import { Card, CardBody, Select, Box, Editable, EditablePreview, EditableInput, Input } from '@chakra-ui/react'
import { useState, useEffect} from 'react';

function ComboBox({ options, onChange, searchable }) {
  const [searchString, setSearchString] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  
  useEffect(() => {
    setFilteredOptions(
      options.filter((option) =>
        option.name.toLowerCase().includes(searchString.toLowerCase())
      )
    );
  }, [searchString, options])
  

  const handleChange = (event) => {
    const selected = options.find(p => (p.name === event.target.value))
    onChange(selected);
  };

  const handleSearch = (event) => {
    setSearchString(event.target.value);
  };

  return (
    <>
      <Box w="230px" bg="rgba(0,0,0,0.3)" padding="1%" borderRadius="5px">
          {searchable && (
              <Input value={searchString} onChange={handleSearch} /> 
          )}
          <Select style={{fontWeight: "bold"}} color="#fff" onChange={handleChange}>
              {filteredOptions.map((option) => (
              <option value={option.name} key={option.id}>
                  {option.name}
              </option>
              ))}
          </Select>
      </Box>
    </>
  );
}

export default ComboBox;