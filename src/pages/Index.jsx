import { useState } from 'react';
import { Box, Heading, Input, Button, List, ListItem, ListIcon, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editingValue, setEditingValue] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const handleEditTodo = (index) => {
    setEditingIndex(index);
    setEditingValue(todos[index]);
    onOpen();
  };

  const handleSaveEdit = () => {
    const newTodos = [...todos];
    newTodos[editingIndex] = editingValue.trim();
    setTodos(newTodos);
    onClose();
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
              aria-label="Edit todo"
              icon={<FaEdit />}
              onClick={() => handleEditTodo(index)}
              mr={2}
              colorScheme="green"
            />
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Edit your task"
              value={editingValue}
              onChange={(e) => setEditingValue(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveEdit}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;