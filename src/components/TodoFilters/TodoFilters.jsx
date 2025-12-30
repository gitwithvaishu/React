import { useEffect, useState } from 'react';
import { COMPLETED_FILTER, PRIORITY_FILTER } from '../../constants/filters';
import styles from './TodoFilters.module.css';

export function TodoFilters({onFilters}){

    const [completed, setCompleted] = useState("all");
    const [priority, setPriority] = useState("all");

    useEffect(()=>{
        const filters = {
            completed: COMPLETED_FILTER[completed].value,
            priority: PRIORITY_FILTER[priority].value,
        };
        onFilters(filters);
    }, [completed, priority]);

    
    return(
        <>
        <section>
            <h3>Filters</h3>

            <div className={styles.filters}>
                <label htmlFor="completed">Completed</label>
                <select name="completed" id="completed" defaultValue={completed} onChange={(event)=> setCompleted(event.target.value)} >
                    {Object.entries(COMPLETED_FILTER).map(([key, {label}])=>
                    (
                         <option key={key} value={key}>{label}</option>
                    ))};
                </select>

                <label htmlFor="priority">Priority</label>
                <select name="priority" id="priority" defaultValue={priority} onChange={(event)=> setPriority(event.target.value)} >
                    {Object.entries(PRIORITY_FILTER).map(([key,{label}])=>(
                        <option key={key} value={key}>{label}</option>
                    ))};
                    
                </select>
            </div>
        </section>
        </>
    );
}