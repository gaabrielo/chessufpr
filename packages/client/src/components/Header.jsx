import { useLocation } from 'react-router-dom';

export function Header({ children }) {
  const location = useLocation();

  return (
    <header className="border-b border-zinc-700 text-gray-50">
      <div className="w-full flex gap-6 items-center p-4">
        <h1 className="text-2xl font-black text-left">
          Chess
          <span className="text-xl text-orange-500">.</span>
          <span className="text-lg font-semibold text-orange-500">ufpr</span>
        </h1>

        {children}
      </div>
    </header>
  );
}
