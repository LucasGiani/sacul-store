import { Button } from "react-bootstrap";
import { useState } from "react";
import { Counter } from "../Counter/counter";

export const ItemCount = ({stock, initial, onAdd}) => {

    const [count, setCount] = useState(initial);

    return (
        <>
            <Counter
                count={count}
                stock={stock}
                onIncrement={(amount) => setCount(amount)}
                onDecrement={(amount) => setCount(amount)}
            />
            <Button variant="primary" style={{ marginTop: '1rem' }} disabled={!stock} onClick={() => onAdd(count)}>Agregar al carrito</Button>
        </>
    );
}