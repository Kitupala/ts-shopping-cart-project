import useCart from "../hooks/useCart";

type PropsType = {
  viewCart: boolean;
};

function Footer({ viewCart }: PropsType) {
  const { totalItems, totalPrice } = useCart();

  const year: number = new Date().getFullYear();

  const pageContent = viewCart ? (
    <p className="text-xs my-4 text-slate-500">ShoppingCart &copy; {year}</p>
  ) : (
    <>
      <p className="text-base">Total Items: {totalItems}</p>
      <p className="text-base">Total Price: {totalPrice}</p>
      <p className="text-xs my-4 text-slate-500">ShoppingCart &copy; {year}</p>
    </>
  );

  const content = (
    <footer className="p-3 mx-4 flex grow justify-end flex-col flex-nowrap">
      {pageContent}
    </footer>
  );

  return content;
}

export default Footer;
