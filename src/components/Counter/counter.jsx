import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './styles.css';

export const Counter = ({ count, stock, onIncrement, onDecrement }) => {
    
    const style = { border: 'none', backgroundColor: 'white', textAlign: 'center'};
    return (
        <div className='input-group'>
        <button type="button" style={style}>
            <FontAwesomeIcon onClick={() => {if(count>1) onIncrement(count-1)}} icon={faMinus} />
        </button>
        <input 
            type="text"
            style={style}
            className="form-control input-number" 
            value={count}
            readOnly={true}
        />
        <button type="button" onClick={() => {if(count<stock) onDecrement(count+1)}} style={style}>
            <FontAwesomeIcon icon={faPlus} />
        </button>
    </div>
    );
}