import { ChangeEvent, ReactElement, memo } from "react";
import { CartItemType } from "../context/CartProvider";
import { ReducerAction, ReducerActionType } from "../context/CartProvider";

type PropsType = {
  item: CartItemType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
};

function CartLineItem({ item, dispatch, REDUCER_ACTIONS }: PropsType) {
  const img: string = new URL(`../images/${item.sku}.jpg`, import.meta.url)
    .href;

  const lineTotal: number = item.qty * item.price;

  const highestQty: number = 10 > item.qty ? 10 : item.qty;

  const optionValues: number[] = [...Array(highestQty).keys()].map(
    (i) => i + 1
  );

  const options: ReactElement[] = optionValues.map((val) => {
    return (
      <option key={`opt${val}`} value={val}>
        {val}
      </option>
    );
  });

  const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: REDUCER_ACTIONS.QUANTITY,
      payload: { ...item, qty: Number(e.target.value) },
    });
  };

  const onRemoveFromCart = () =>
    dispatch({ type: REDUCER_ACTIONS.REMOVE, payload: item });

  const content = (
    <li className="grid grid-cols-[4fr,3fr,1fr,1fr] gap-4 my-4 sm:grid-cols-[3fr,15fr,5fr,1fr,8fr,1fr] items-center">
      <img
        className="hidden min-w-16 sm:block rounded-md shadow-md"
        src={img}
        alt={item.name}
      />
      <div aria-label="Item Name">{item.name}</div>
      <div aria-label="Item Per Price">
        {new Intl.NumberFormat("fi-FI", {
          style: "currency",
          currency: "EUR",
        }).format(item.price)}
      </div>
      <label className="absolute left-[-10000px]" htmlFor="itemQty">
        Item Quantity
      </label>
      <select
        className="max-h-12"
        name="itemQty"
        id="itemQty"
        value={item.qty}
        aria-label="Item Quantity"
        onChange={onChangeQty}
      >
        {options}
      </select>
      <div className="block" aria-label="Line Item Subtotal">
        {new Intl.NumberFormat("fi-FI", {
          style: "currency",
          currency: "EUR",
        }).format(lineTotal)}
      </div>
      <button
        className="flex justify-self-end max-h-12"
        aria-label="Remove Item From Cart"
        title="Remove Item From Cart"
        onClick={onRemoveFromCart}
      >
        ❌
      </button>
    </li>
  );

  return content;
}

function areItemsEqual(
  { item: prevItem }: PropsType,
  { item: nextItem }: PropsType
) {
  return Object.keys(prevItem).every((key) => {
    return (
      prevItem[key as keyof CartItemType] ===
      nextItem[key as keyof CartItemType]
    );
  });
}

const MemoizedCartLineItem = memo<typeof CartLineItem>(
  CartLineItem,
  areItemsEqual
);

export default MemoizedCartLineItem;
