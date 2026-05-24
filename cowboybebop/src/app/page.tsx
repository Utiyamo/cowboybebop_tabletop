
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-900 text-zinc-100 font-sans">
      <main className="flex flex-1 flex-col items-center justify-center px-2 sm:px-4 py-12 sm:py-24 w-full max-w-full">
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-orange-400 drop-shadow-lg text-center break-words max-w-[95vw] sm:max-w-2xl">
          Bem-vindo ao Cowboy Bebop TableTop
        </h1>
        <a
          href="/auth"
          className="mt-4 w-full max-w-xs sm:max-w-sm md:max-w-md px-4 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-zinc-50 font-semibold text-base sm:text-lg shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-zinc-900 text-center"
        >
          Entrar / Autorizar
        </a>
      </main>
      <footer className="w-full py-4 sm:py-6 bg-zinc-950 text-zinc-400 text-center text-xs sm:text-sm border-t border-zinc-800 px-2">
        OpenSource project by Daniel Utiyama and DC Utiyama Technology
      </footer>
    </div>
  );
}
