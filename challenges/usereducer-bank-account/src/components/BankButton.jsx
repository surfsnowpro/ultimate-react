export default function BankButton({ children, type, dispatch }) {
  return (
    <button
      onClick={() => dispatch({ type: type })}
    >
      {children}
    </button>
  );
}