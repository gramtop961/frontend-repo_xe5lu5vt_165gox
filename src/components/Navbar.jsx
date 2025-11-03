import { Rocket, Settings, User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 text-white">
            <Rocket className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold text-white">ScoutPro</span>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
          <a href="#features" className="hover:text-white">Возможности</a>
          <a href="#search" className="hover:text-white">Поиск игроков</a>
          <a href="#about" className="hover:text-white">О продукте</a>
        </nav>

        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-900">
            <Settings className="h-4 w-4" />
            Настройки
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-white shadow-inner shadow-white/10 hover:bg-white/20">
            <User className="h-4 w-4" />
            Войти
          </button>
        </div>
      </div>
    </header>
  );
}
