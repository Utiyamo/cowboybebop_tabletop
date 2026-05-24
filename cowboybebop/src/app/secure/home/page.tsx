import Link from 'next/link';
import { FilePlus, Upload, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import routesConfiguration from '@/config/routesConfiguration';

export default function Home(){
    const criarFichaRoute = routesConfiguration.find(route => route.name === "Create Character")?.baseUrl || "/secure/createCharacter";
    const importarFichaRoute = routesConfiguration.find(route => route.name === "Import Character")?.baseUrl || "/secure/importCharacter";

    return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] gap-10 p-6 md:p-10">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl md:text-5xl text-center">
        Bem-vindo à Área Segura
      </h1>

      <div className="grid w-full max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
        {/* Card: Criar Ficha */}
        <Link href={criarFichaRoute} className="group relative block">
          <Card className="h-full border-zinc-800 bg-zinc-900/40 backdrop-blur transition-all duration-300 hover:border-orange-500/50 hover:bg-zinc-800/60 hover:shadow-lg hover:shadow-orange-500/5">
            <CardHeader className="flex flex-col items-center space-y-4 p-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white">
                <FilePlus className="h-7 w-7" />
              </div>
              <div className="space-y-2">
                <CardTitle className="text-xl text-zinc-100">Criar Ficha</CardTitle>
                <CardDescription className="text-zinc-400">
                  Monte um novo personagem do zero seguindo as regras do 3D&T Alpha.
                </CardDescription>
              </div>
              <div className="absolute bottom-6 right-6 flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700/50 text-zinc-500 transition-all duration-300 group-hover:border-orange-500/50 group-hover:bg-orange-500/10 group-hover:text-orange-500">
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
            </CardHeader>
          </Card>
        </Link>

        {/* Card: Importar Ficha */}
        <Link href={importarFichaRoute} className="group relative block">
          <Card className="h-full border-zinc-800 bg-zinc-900/40 backdrop-blur transition-all duration-300 hover:border-orange-500/50 hover:bg-zinc-800/60 hover:shadow-lg hover:shadow-orange-500/5">
            <CardHeader className="flex flex-col items-center space-y-4 p-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white">
                <Upload className="h-7 w-7" />
              </div>
              <div className="space-y-2">
                <CardTitle className="text-xl text-zinc-100">Importar Ficha</CardTitle>
                <CardDescription className="text-zinc-400">
                  Carregue uma ficha existente a partir de um arquivo JSON.
                </CardDescription>
              </div>
              <div className="absolute bottom-6 right-6 flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700/50 text-zinc-500 transition-all duration-300 group-hover:border-orange-500/50 group-hover:bg-orange-500/10 group-hover:text-orange-500">
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}