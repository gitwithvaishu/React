import { PRIORITIES, PRIORITY_DEFAULT} from '../../constants/priorities';
import styles from './TodoFormFields.module.css';

export function TodoFormFields({todo={}, showAllFields = true}){
    return(
        <>
            <div className={styles.formFields}>
                        <div className={styles.formField}>
                            {/* input field for todo name required */}
                            <input type="text" name="name" aria-label="Name" placeholder="Name" autoComplete="off" 
                            defaultValue={todo.name}/>
                        </div>
                        {/* visible only when showAllFields is true */}
                        {showAllFields && (
                        <>
                            <div className={styles.formField}>
                                <textarea name="description" placeholder="Description" aria-label="Description" rows="3" defaultValue={todo.description}></textarea>
                            </div>

                            <div className={styles.formGroup}>
                                <div className={styles.formField}>
                                    <label htmlFor="deadline">Dead Line</label>
                                    <input type="date" name="deadline" id="deadline" defaultValue={todo.deadline}/>
                                </div>
                                <div className={styles.formField}>
                                    <label htmlFor="priority">Priority</label>
                                    {/* dropdown menu for priority selection using map function for object entries */}
                                    <select name="priority" id="priority" defaultValue={todo.priority ?? PRIORITY_DEFAULT}>
                                        {Object.entries(PRIORITIES).map(([key, {label} ]) =>(
                                            <option value={key}>{label}</option>
                                        ))}                        
                                    </select>
                                </div>
                            </div>
                        </>
                        )}
                    </div>
        </>
    );
}