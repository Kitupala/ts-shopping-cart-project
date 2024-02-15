import Nav from "./Nav";
import useCart from "../hooks/useCart";

type PropsType = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

function Header({ viewCart, setViewCart }: PropsType) {
  const { totalItems, totalPrice } = useCart();

  const content = (
    <header className="bg-white text-xl text-slate-800 sticky top-0 z-10 border-b border-slate-300 p-3">
      <div className="flex justify-between mb-2">
        <h1 className="text-4xl">Acme Co.</h1>
        <div className="text-right">
          <p className="text-base">Total Items: {totalItems}</p>
          <p className="text-base">Total Price: {totalPrice}</p>
        </div>
      </div>
      <Nav viewCart={viewCart} setViewCart={setViewCart} />
    </header>
  );

  return content;
}

export default Header;
