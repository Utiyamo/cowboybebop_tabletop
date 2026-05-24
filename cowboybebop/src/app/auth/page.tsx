import AuthForm from './form';

export default async function AuthPage() {

  return (
    <div className="min-h-screen flex flex-col bg-zinc-900 text-zinc-100 font-sans">
      <main className="flex flex-1 flex-col items-center justify-center px-2 sm:px-4 py-12 sm:py-24 w-full max-w-full">
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-orange-400 drop-shadow-lg text-center break-words max-w-[95vw] sm:max-w-2xl">
          Autenticação Cowboy Bebop TableTop
        </h1>
        <AuthForm />
      </main>
      <footer className="w-full py-4 sm:py-6 bg-zinc-950 text-zinc-400 text-center text-xs sm:text-sm border-t border-zinc-800 px-2">
        OpenSource project by Daniel Utiyama and DC Utiyama Technology
      </footer>
    </div>
  );
}