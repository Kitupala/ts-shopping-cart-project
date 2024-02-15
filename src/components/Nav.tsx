type PropsType = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

function Nav({ viewCart, setViewCart }: PropsType) {
  const button = (
    <button
      className="border rounded-md text-base px-3 py-1 bg-slate-100 hover:bg-slate-200/80 mt-2"
      onClick={() => setViewCart((prev) => !prev)}
    >
      {viewCart ? "View Products" : "View Cart"}
    </button>
  );

  const content = <nav className="flex justify-end gap-2">{button}</nav>;

  return content;
}

export default Nav;
