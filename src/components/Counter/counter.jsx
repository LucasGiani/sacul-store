import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './styles.css';

export const Counter = ({ count, stock, onIncrement, onDecrement }) => {
    
    return (
        <div className='input-group'>
        <button type="button" className="counter">
            <FontAwesomeIcon onClick={() => {if(count>1) onIncrement(count-1)}} icon={faMinus} />
        </button>
        <input 
            type="text"
            className="counter form-control input-number"
            value={count}
            readOnly={true}
        />
        <button type="button" onClick={() => {if(count<stock) onDecrement(count+1)}} className="counter">
            <FontAwesomeIcon icon={faPlus} />
        </button>
    </div>
    );
}