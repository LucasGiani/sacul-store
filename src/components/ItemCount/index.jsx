import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";

export const ItemCount = ({stock, initial, onAdd}) => {

    useEffect(() => setCount(initial), [stock]);

    const [count, setCount] = useState(initial);

    const style = { border: 'none', backgroundColor: 'white', textAlign: 'center'};
    return (
        <>
            <div style={{ borderColor: 'grey', border: 'solid', borderRadius: '.325rem', borderWidth: '.125rem' }}className='input-group'>
                <button type="button" style={style}>
                    <FontAwesomeIcon onClick={() => {if(count>1) setCount(count-1)}} icon={faMinus} />
                </button>
                <input 
                    type="text"
                    style={style}
                    className="form-control input-number" 
                    value={count}
                    readOnly={true}
                />
                <button type="button" onClick={() => {if(count<stock) setCount(count+1)}} style={style}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            <Button variant="primary" style={{ marginTop: '1rem'}} disabled={!stock} onClick={() => onAdd(count)}>Agregar al carrito</Button>
        </>
    );
}