import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementByAmount } from "./counterSlice";
import { RootState } from "./store";

export function Counter() {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counter.value);

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleIncrementByAmount = () => {
    dispatch(incrementByAmount(10));
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>
      <button onClick={handleIncrementByAmount}>+10</button>
    </div>
  );
}
