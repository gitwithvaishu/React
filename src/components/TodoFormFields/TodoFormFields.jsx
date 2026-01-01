import { PRIORITIES, PRIORITY_DEFAULT} from '../../constants/priorities';
import styles from './TodoFormFields.module.css';

export function TodoFormFields({todo={}, showAllFields = true, register, errors={}}){
    return(
        <>
            <div className={styles.formFields}>
                        <div className={styles.formField}>
                            {/* input field for todo name required */}

                            <input type="text"
                            aria-label="Name" 
                            aria-invalid ={!!errors.name}
                            placeholder="Name" 
                            autoComplete="off" 
                            defaultValue={todo.name} 
                            {...register("name")} />
                            {!!errors.name && 
                            <span className={styles.formFieldsError}>{errors.name.message}</span>
                            }

                        </div>
                        {/* visible only when showAllFields is true */}
                        {showAllFields && (
                        <>
                            <div className={styles.formField}>
                                <textarea  
                                placeholder="Description" 
                                aria-label="Description"
                                aria-invalid={!!errors.description}
                                rows="3" 
                                defaultValue={todo.description}
                                {...register("description")}></textarea>
                                {!!errors.description && <span className={styles.formFieldsError}>{errors.description.message}</span>}
                            </div>

                            <div className={styles.formGroup}>
                                <div className={styles.formField}>
                                    <label htmlFor="deadline">Dead Line</label>
                                    <input type="date"
                                    id="deadline"
                                    aria-invalid ={!!errors.deadline}
                                    defaultValue={todo.deadline}
                                    {...register("deadline")}
                                    />
                                    {!!errors.deadline && <span className={styles.formFieldsError}>{errors.deadline.message}</span>}
                                </div>
                                <div className={styles.formField}>
                                    <label htmlFor="priority">Priority</label>
                                    {/* dropdown menu for priority selection using map function for object entries */}
                                    <select id="priority"
                                    aria-invalid ={!!errors.priority}
                                    defaultValue={todo.priority ?? PRIORITY_DEFAULT}
                                    {...register("priority")}>
                                        {Object.entries(PRIORITIES).map(([key, {label} ]) =>(
                                            <option value={key}>{label}</option>
                                        ))}                        
                                    </select>
                                    {!!errors.priority && <span className={styles.formFieldsError}>{errors.priority.message}</span>}
                                </div>
                            </div>
                        </>
                        )}
                    </div>
        </>
    );
}