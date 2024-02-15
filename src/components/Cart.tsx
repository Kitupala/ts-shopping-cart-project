import { useState } from "react";
import CartLineItem from "./CartLineItem";
import useCart from "../hooks/useCart";

function Cart() {
  const [confirm, setConfirm] = useState<boolean>(false);
  const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart } = useCart();

  const onSubmitOrder = () => {
    dispatch({ type: REDUCER_ACTIONS.SUBMIT });
    setConfirm(true);
  };

  const pageContent = confirm ? (
    <h2 className="text-2xl text-center mt-20">Thank you for your order!</h2>
  ) : (
    <>
      <h2 className="absolute left-[-10000px]">Cart</h2>
      <ul className="p-0 mt-2">
        {cart.map((item) => {
          return (
            <CartLineItem
              key={item.sku}
              item={item}
              dispatch={dispatch}
              REDUCER_ACTIONS={REDUCER_ACTIONS}
            />
          );
        })}
      </ul>
      <div className="flex flex-col gap-2">
        <p className="text-base">Total Items: {totalItems}</p>
        <p className="text-base">Total Price: {totalPrice}</p>
        <button
          className="max-w-72 border rounded-md text-base px-3 py-1 bg-slate-100 hover:bg-slate-200/80 mt-4"
          onClick={onSubmitOrder}
          disabled={!totalItems}
        >
          Place Order
        </button>
      </div>
    </>
  );

  const content = (
    <main className="p-1 mx-4 flex gap-4 flex-col flex-nowrap">
      {pageContent}
    </main>
  );

  return content;
}

export default Cart;
