import styles from "./Alert.module.css"; 

export function Alert({children, onClear}){
    return(
          <div className={styles.alert}>
            {children}
            <span onClick={onClear}>X</span>
          </div>
    );
}