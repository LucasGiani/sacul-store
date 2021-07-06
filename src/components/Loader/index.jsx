import { Spinner } from "react-bootstrap";
import styles from './styles.css';

export const Loader = ({isShown, children}) => {
    return(
        <>
            {isShown &&
                <div className={`d-flex justify-content-center align-items-center flex-column pt-2 pb-2`}>
                    <Spinner className={styles.loader} animation="border" variant="dark"/> 
                    {children &&
                        <div className={styles.text}>
                            {children}
                        </div>
                    }
                </div>
            }
        </>
    );
}