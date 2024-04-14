export default function Header() {
  return (
    <header className="flex justify-between items-center w-full mt-5 border-b-2 pb-7 sm:px-4 px-2">
      <a href="/" className="flex space-x-3">
        <span className="text-4xl">🚀</span>
        <h1 className="sm:text-4xl text-2xl font-bold ml-2 tracking-tight">
          Ticket Board
        </h1>
        <span className="text-4xl">💻</span>
      </a>
    </header>
  );
}
