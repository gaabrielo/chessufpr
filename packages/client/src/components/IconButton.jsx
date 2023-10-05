export function IconButton({ children, styles, onClick }) {
  return (
    <button
      className={`p-3 bg-zinc-700 rounded-lg text-gray-50 ${styles}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
