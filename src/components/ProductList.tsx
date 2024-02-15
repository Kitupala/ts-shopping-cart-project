import useProducts from "../hooks/useProducts";
import useCart from "../hooks/useCart";
import { ReactElement } from "react";

import Product from "./Product";

function ProductList() {
  const { dispatch, REDUCER_ACTIONS, cart } = useCart();
  const { products } = useProducts();

  let pageContent: ReactElement | ReactElement[] = <p>Loading...</p>;

  if (products?.length) {
    pageContent = products.map((product) => {
      const inCart: boolean = cart.some((item) => item.sku === product.sku);

      return (
        <Product
          key={product.sku}
          product={product}
          dispatch={dispatch}
          REDUCER_ACTIONS={REDUCER_ACTIONS}
          inCart={inCart}
        />
      );
    });
  }

  const content = (
    <main className="p-1 mx-4 flex gap-4 justify-between flex-row flex-wrap">
      {pageContent}
    </main>
  );

  return content;
}

export default ProductList;
