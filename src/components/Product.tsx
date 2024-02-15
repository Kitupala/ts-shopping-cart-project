import { ProductType } from "../context/ProductsProvider";
import { ReducerActionType, ReducerAction } from "../context/CartProvider";
import { ReactElement } from "react";

type PropsType = {
  product: ProductType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
  inCart: boolean;
};

function Product({
  product,
  dispatch,
  REDUCER_ACTIONS,
  inCart,
}: PropsType): ReactElement {
  const img: string = new URL(`../images/${product.sku}.jpg`, import.meta.url)
    .href;
  console.log(img);

  const onAddToCart = () =>
    dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, qty: 1 } });

  const itemInCart = inCart ? " → Item In Cart ✔️" : null;

  const content = (
    <article className="flex flex-col my-6 sm:w-[30%]">
      <h3 className="text-xl">{product.name}</h3>
      <img
        src={img}
        alt={product.name}
        className="max-w-80 my-4 block w-full h-auto rounded-lg drop-shadow-md"
      />
      <p className="text-base flex justify-end font-bold">
        {new Intl.NumberFormat("fi-FI", {
          style: "currency",
          currency: "EUR",
        }).format(product.price)}
        {itemInCart}
      </p>
      <button
        className="border rounded-md text-base font-bold px-3 py-1 bg-slate-100 hover:bg-slate-200/80 mt-2 mb-6 uppercase"
        onClick={onAddToCart}
      >
        Add To Cart
      </button>
    </article>
  );

  return content;
}

export default Product;
