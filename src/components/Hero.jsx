import { TrendingUp, Shield, Users, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-zinc-950 to-zinc-900">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-600/10 via-transparent to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 md:gap-16 md:py-24">
        <div className="relative z-10">
          <h1 className="text-3xl font-black leading-tight text-white sm:text-5xl">
            Умный подбор игроков для вашей команды
          </h1>
          <p className="mt-4 max-w-xl text-zinc-300">
            SaaS-платформа, которая анализирует трансферный рынок и подбирает футболистов по вашим параметрам, учитывая стиль игры, бюджет и специфику лиги.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href="#search" className="rounded-lg bg-emerald-500 px-5 py-3 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-600">
              Начать поиск
            </a>
            <a href="#features" className="rounded-lg border border-zinc-800 px-5 py-3 text-zinc-200 hover:bg-zinc-900">
              Узнать больше
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Feature icon={TrendingUp} title="Аналитика" desc="Метрики производительности" />
            <Feature icon={Shield} title="Риски" desc="Оценка травматичности" />
            <Feature icon={Users} title="Совместимость" desc="Под стиль команды" />
            <Feature icon={Star} title="Ценность" desc="Справедливая цена" />
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-10 top-10 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl md:h-80 md:w-80" />
          <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-2xl backdrop-blur">
            <div className="grid grid-cols-2 gap-4 text-sm text-zinc-300">
              <Stat label="Игроков в базе" value="120k+" />
              <Stat label="Лиг" value="75" />
              <Stat label="Параметров" value="40+" />
              <Stat label="Клубов" value="2000+" />
            </div>
            <div className="mt-6 rounded-xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 p-4 text-zinc-300">
              «Системно сокращаем время скаутинга и точнее попадаем в профиль — фит под тактику вырос на 32%.»
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({ icon: Icon, title, desc }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
      <div className="flex items-center gap-2">
        <div className="rounded-md bg-zinc-800 p-2 text-emerald-400">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-medium text-white">{title}</p>
          <p className="text-xs text-zinc-400">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4">
      <p className="text-xs text-zinc-400">{label}</p>
      <p className="mt-1 text-xl font-semibold text-white">{value}</p>
    </div>
  );
}
