// importing necessary modules and components
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PRIORITY_DEFAULT} from '../../constants/priorities';
import { TodoFormFields } from '../TodoFormFields/TodoFormFields';
import { getTodoSchema } from '../../schemas/todo';
import styles from './TodoForm.module.css';

export function TodoForm({onCreate}){
    
    //useState hook to handle the fields visibility 
    const[showAllFields, setShowAllFields] = useState(false);
    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: yupResolver(getTodoSchema({isNew:true})),
        defaultValues: {
            description: "",
            deadline: "",
            priority: PRIORITY_DEFAULT,
            completed:false
        },
    });

    // function to handle form submission
    function handleCreate(data){
        // calling onCreate function passed as prop with new todo data
        onCreate(data);
        reset();
    }
    return(
        <>
            <section>
                <h3 className={styles.title}>
                    New To-do
                    {/* button to toggle all fields visibility */}
                    <button onClick={()=> setShowAllFields(!showAllFields)}>
                        {showAllFields?"Hide":"Show"} All Fields</button>
                </h3>

                {/* form to add new todo */}
                <form className={styles.form} onSubmit={handleSubmit(handleCreate)}>
                    <TodoFormFields showAllFields={showAllFields} register={register} errors={errors} />
                    {/* Button to submit the form */}
                    <input type="submit" value="Add" />
                </form>
            </section>
        </>
    );
}