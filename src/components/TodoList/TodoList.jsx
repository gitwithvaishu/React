// Importing necessary modules and components

import styles from './TodoList.module.css';
import { TodoListItem } from '../TodoListItem/TodoListItem';

export function TodoList({todos, onUpdate, onDelete}){
    return(
        <>
            <section>
                <h3>ToDo List</h3>

                {!todos.length && <p>Sorry, No todos to display</p> }
                <ul className={styles.todoList}>
                    {/* Displaying todos using map function */}
                    {todos.map((todo)=>
                    // to display each todo item by passing todo and onUpdate as props to TodoListItem component
                       <TodoListItem key={todo.id} todo={todo} onUpdate={onUpdate} onDelete={onDelete}/>
                    )}
                </ul>
            </section>

        </>
    );
}