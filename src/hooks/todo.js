import { useEffect, useState } from 'react';
import {api} from "../api"


export function useTodo(){
      const [todos, setTodos] = useState([]);
      const [filters, setFilters] = useState({});
      const [errorMessage, setErrorMessage] = useState();
      const [isLoading, setIsLoading] = useState(false);
    
      async function fetchTodos(){
        setIsLoading(true);
        try {
          const data = await api.todos.getAll(filters);
          setTodos(data);
        } catch (error) {
          setErrorMessage("Failed to fetch the Data")
        } finally{
          setIsLoading(false);
        }
        // api.todos.getAll(filters).then(setTodos);
      }
    
      useEffect(()=>{
        fetchTodos();
      }, [filters]);
      
      async function handleCreate(newTodo){
        setIsLoading(true);
        try {
          const data = await api.todos.create(newTodo);
          await fetchTodos(data);
        } catch (error) {
          setErrorMessage("Failed to create new todo.");
        } finally{
          setIsLoading(false);
        }
        // setTodos((prevTodos) =>(
        //   [
        //     ...prevTodos,
        //     {id : `${prevTodos.length + 1}`, ...newTodo},
        //   ]
        // ));
        
        // api.todos.create(newTodo).then(fetchTodos);
      }
    
      async function handleUpdate(id, newTodo){
        setIsLoading(true);
        try {
          const data = await api.todos.update(id, newTodo);
          await fetchTodos(data);
        } catch (error) {
          setErrorMessage("Failed to update the todo.");
        } finally{
          setIsLoading(false);
        }
        // setTodos((prevTodos)=> 
        //   prevTodos.map((todo) => 
        //     id === todo.id ? newTodo: todo)
        // );
        
        // api.todos.update(id,newTodo).then(fetchTodos);
      }
    
      async function handleDelete(id){
        setIsLoading(true);
        try {
          await api.todos.delete(id);
          await fetchTodos();
        } catch (error) {
          setErrorMessage("Failed to delete the todo");
        } finally{
          setIsLoading(false);
        }
        // setTodos((prevTodos)=> prevTodos.filter((todo) => todo.id != id));
        
        // api.todos.delete(id).then(fetchTodos);
      }
    
    return ({
        isLoading,
        data: todos,
        fetch: fetchTodos,
        filter: setFilters,
        create: handleCreate,
        update: handleUpdate,
        delete: handleDelete,
        error: {
            message: errorMessage,
            clear: () => setErrorMessage(),
        },
    });
}