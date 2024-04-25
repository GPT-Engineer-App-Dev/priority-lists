import { useState } from 'react';
import { Box, Heading, Input, Button, List, ListItem, ListIcon, IconButton } from '@chakra-ui/react';
import { FaPlus, FaTrash } from 'react-icons/fa';

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTodo = () => {
    if (input.trim() !== '') {
      setTodos([...todos, input.trim()]);
      setInput('');
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <Box p={8}>
      <Heading mb={6}>Todo App</Heading>
      <Box display="flex" mb={4}>
        <Input
          placeholder="Add a new task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
        />
        <Button onClick={handleAddTodo} ml={2} colorScheme="blue">
          <FaPlus />
        </Button>
      </Box>
      <List spacing={3}>
        {todos.map((todo, index) => (
          <ListItem key={index} display="flex" alignItems="center">
            {todo}
            <IconButton
              aria-label="Delete todo"
              icon={<FaTrash />}
              onClick={() => handleDeleteTodo(index)}
              ml="auto"
              colorScheme="red"
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;