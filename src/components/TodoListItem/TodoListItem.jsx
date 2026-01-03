// importing necessary modules and components
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// using PRIORITIES and PRIORITY_DEFAULT constants for priority handling for color coding and default value
import { PRIORITIES, PRIORITY_DEFAULT} from '../../constants/priorities';
import styles from './TodoListItem.module.css';
import { getTodoSchema } from '../../schemas/todo';
import { TodoFormFields } from '../TodoFormFields/TodoFormFields';

export function TodoListItem({todo , onUpdate, onDelete}){

    const [isEdit, setIsEdit] = useState(false);
    const {register, handleSubmit, formState:{errors}} = useForm(
        {resolver: yupResolver(getTodoSchema()),
        defaultValues: todo},);
 
    // function to handle the completed status change based on checkbox input event
    function handleCompleted(event){
        onUpdate(todo.id, {...todo, completed: event.target.checked});
    }

    function handleEdit(data){
        // calling onCreate function passed as prop with new todo data
        onUpdate(todo.id, data);
        setIsEdit(false);
    }

    const viewingTemplate = (
        <>
            <div className={styles.content}>
                {/* checkbox to mark todo as completed */}
                <input type="checkbox" name="completed" checked ={todo.completed} 
                // calling funnction when checkbox value changes
                onChange={handleCompleted} 
                className={styles.status}/>
                <div className={styles.info}>
                    <strong>{todo.name}</strong>
                    {todo.description &&(
                        <span className={styles.description}>{todo.description}</span>
                    )}
                    <div className={styles.additionalInfo}>
                        {todo.deadline}
                        {" "}
                        {/* changing the color of the priority based the priority value */}
                        {todo.priority !== PRIORITY_DEFAULT && (
                            <span style={{ color: PRIORITIES[todo.priority].color }}>
                                {PRIORITIES[todo.priority].label}
                            </span>
                        )}
                    </div>
                </div>

                <div>
                    <button onClick={() => setIsEdit(true)}>📝</button>
                    <button onClick={()=> onDelete(todo.id)}>🗑️</button>
                </div>
            </div>
        </>
    );
    

    const editingTemplate = (
        <form className={styles.content} onReset={()=>setIsEdit(false)} onSubmit={handleSubmit(handleEdit)}>
            <TodoFormFields todo={todo} register={register} errors={errors} />

            <div className={styles.controls}>
                <input type="submit" value="💾" />
                <input type="reset" value="❌" />
            </div>
        </form>
    );

    
    return (
        <>
            {/* rendering each todo item */}
            <li 
                key={todo.id}
                className={styles.todoListItem}
                // data attribute to indicate completed status for styling
                data-completed={todo.completed}>

                    {isEdit ? editingTemplate: viewingTemplate}
                    
            </li>
        </>
    );
}