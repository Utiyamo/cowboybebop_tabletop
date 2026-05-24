'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, FilePlus, Upload, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import RouteConfiguration from '@/config/routesConfiguration';

interface AppSidebarProps {
  initialCollapsed: boolean;
}

export function AppSidebar({ initialCollapsed }: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(initialCollapsed);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const createCharacterRoute = RouteConfiguration.find(route => route.name === "Create Character")?.baseUrl || "/secure/createCharacter";
  const importCharacterRoute = RouteConfiguration.find(route => route.name === "Import Character")?.baseUrl || "/fichas/importar";

  // 🔁 Sincroniza colapso com Cookie (UI-only, não sobrecarrega memória)
  useEffect(() => {
    const expires = new Date(Date.now() + 30 * 864e5).toUTCString(); // 30 dias
    document.cookie = `sidebar_collapsed=${collapsed}; expires=${expires}; path=/; SameSite=Lax`;
  }, [collapsed]);

  const handleLogout = () => {
    // ⚠️ Se seu authToken for httpOnly, use uma Server Action aqui para limpar.
    // Exemplo simplificado para cookies acessíveis via JS:
    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
    router.push('/login');
  };

  const navItems = [
    { label: 'Criar Ficha', icon: FilePlus, href: createCharacterRoute },
    { label: 'Importar Ficha', icon: Upload, href: importCharacterRoute },
  ];

  return (
    <>
      {/* 🌐 Overlay Mobile */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* 📱 Drawer Mobile */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-zinc-900 border-r border-zinc-800 z-50 transform transition-transform duration-300 md:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <h2 className="text-orange-500 font-bold text-xl tracking-tight">3D&T Alpha</h2>
          <button onClick={() => setMobileOpen(false)} className="p-1 rounded hover:bg-zinc-800 text-zinc-400">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                pathname === item.href
                  ? 'bg-orange-500/15 text-orange-500 border-l-2 border-orange-500'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
              }`}
              onClick={() => setMobileOpen(false)}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 mt-4 rounded-lg hover:bg-red-900/20 text-red-400 hover:text-red-300 transition-all border border-transparent hover:border-red-800/50"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">Sair</span>
          </button>
        </nav>
      </aside>

      {/* 🖥️ Sidebar Desktop */}
      <aside
        className={`hidden md:flex flex-col border-r border-zinc-800 bg-zinc-900 transition-all duration-300 ease-in-out ${
          collapsed ? 'w-16' : 'w-64'
        }`}
      >
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} p-4 border-b border-zinc-800`}>
          {!collapsed && (
            <h2 className="text-orange-500 font-bold text-lg tracking-tight truncate">3D&T Alpha</h2>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 transition-colors"
            aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                pathname === item.href
                  ? 'bg-orange-500/15 text-orange-500 border-l-2 border-orange-500'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
              }`}
              title={collapsed ? item.label : ''}
            >
              <item.icon className="w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110" />
              {!collapsed && <span className="font-medium truncate">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-zinc-800">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-900/20 text-red-400 hover:text-red-300 transition-all border border-transparent hover:border-red-800/50 ${
              collapsed ? 'justify-center' : ''
            }`}
            title={collapsed ? 'Sair' : ''}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="font-medium">Sair</span>}
          </button>
        </div>
      </aside>

      {/* 📱 Botão Flutuante Mobile (aparece apenas quando o drawer está fechado) */}
      {!mobileOpen && (
        <button
          className="fixed top-4 left-4 z-30 md:hidden p-2 bg-zinc-800/90 backdrop-blur rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-700 transition-all shadow-lg"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </button>
      )}
    </>
  );
}