// importing necessary modules and components
import { useState } from 'react';
import { PRIORITY_DEFAULT} from '../../constants/priorities';
import { TodoFormFields } from '../TodoFormFields/TodoFormFields';
import styles from './TodoForm.module.css';

export function TodoForm({onCreate}){
    
    //useState hook to handle the fields visibility 
    const[showAllFields, setShowAllFields] = useState(false);

    // function to handle form submission
    function handleSubmit(event){

        event.preventDefault();

        const {elements} = event.target;

        if(elements.name.value === "") return;

        // calling onCreate function passed as prop with new todo data
        onCreate({
            name: elements.name.value,
            description: elements.description?.value ?? "",
            deadline: elements.deadline?.value ?? "",
            priority: elements.priority?.value ?? PRIORITY_DEFAULT,
            completed: false,
        });

        event.target.reset();
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
                <form className={styles.form} onSubmit={handleSubmit}>
                    <TodoFormFields showAllFields={showAllFields} />
                    {/* Button to submit the form */}
                    <input type="submit" value="Add" />
                </form>
            </section>
        </>
    );
}