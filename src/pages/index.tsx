import React from 'react'
import { TextInput,Container ,Text,Button,Divider  } from '@mantine/core';
import todo from '@/models/index/todo';
import TodoList from '@/components/index/TodoList';


export default function index() {
  const [title, setTitle] = React.useState<string>('')
  const [todos, setTodos] = React.useState<todo[]>([])

  const addTodo = () => {
    if (title) {
      const newTodo: todo = {
        id: todos.length + 1,
        title,
        completed: false,
      }
      setTodos([...todos, newTodo])
      setTitle('')
    }
  }

  const deleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  return (
    <div>
      <Container mt={'xl'} size={'xs'}>
        <Text fz={'xl'} fw={700}>Todo List</Text>
        <TextInput label="List Title" placeholder="title" value={title} onChange={handleTitleChange}/>
        <Button mt={'xl'} fullWidth onClick={addTodo} disabled={!title} >Add List</Button>
        <Divider mt={'xl'} mb={'xl'} />
        <Text fz={'xl'} fw={700} mb={'md'}>Your Todo List</Text>
        {todos.map((todo) => (
          <TodoList key={todo.id} aTodo={todo} deleteTodo={ deleteTodo } />
        ))}
      </Container>
    </div>
  )
}
