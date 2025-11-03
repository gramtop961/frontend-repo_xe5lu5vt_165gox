import { useMemo } from "react";

export default function PlayerResults({ players, filters }) {
  const results = useMemo(() => scoreAndFilter(players, filters), [players, filters]);

  return (
    <section className="bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Рекомендуемые игроки</h3>
          <p className="text-sm text-zinc-400">Найдено: {results.length}</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <PlayerCard key={p.id} player={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function scoreAndFilter(players, filters) {
  if (!filters) return players.slice(0, 9);
  const { position, minAge, maxAge, maxValue, league, style } = filters;

  return players
    .filter((p) => (position ? p.position === position : true))
    .filter((p) => p.age >= minAge && p.age <= maxAge)
    .filter((p) => p.value <= maxValue)
    .filter((p) => (league ? p.league === league : true))
    .map((p) => ({ ...p, score: computeScore(p, style) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 9);
}

function computeScore(player, style) {
  // Базовый скор: форма + соответствие профилю
  const form = player.stats.form; // 0..100
  const fit =
    style.pressing * (player.style.pressing / 100) +
    style.possession * (player.style.possession / 100) +
    style.counter * (player.style.counter / 100);

  // Балансируем и нормализуем к 0..100
  const raw = 0.6 * form + 0.4 * (fit / 3);
  return Math.round(Math.min(100, Math.max(0, raw)));
}

function PlayerCard({ player }) {
  return (
    <div className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition hover:border-emerald-700 hover:bg-zinc-900">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-semibold text-white">{player.name}</h4>
          <p className="text-sm text-zinc-400">
            {player.position} • {player.club} • {player.league}
          </p>
        </div>
        <div className="rounded-lg bg-emerald-600/10 px-2 py-1 text-sm font-medium text-emerald-400">
          {player.score}%
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
        <MiniStat label="Возраст" value={player.age} />
        <MiniStat label="Стоимость" value={`${player.value}млн€`} />
        <MiniStat label="Форма" value={`${player.stats.form}`} />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-zinc-300">
        <Tag label="Прессинг" value={player.style.pressing} />
        <Tag label="Владение" value={player.style.possession} />
        <Tag label="Контратаки" value={player.style.counter} />
      </div>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3">
      <p className="text-[11px] uppercase tracking-wide text-zinc-400">{label}</p>
      <p className="mt-1 font-semibold text-white">{value}</p>
    </div>
  );
}

function Tag({ label, value }) {
  return (
    <div className="rounded-md border border-zinc-800 bg-zinc-950 p-2">
      <p className="flex items-center justify-between">
        <span className="text-zinc-400">{label}</span>
        <span className="text-white">{value}</span>
      </p>
      <div className="mt-2 h-1 w-full rounded bg-zinc-800">
        <div className="h-1 rounded bg-emerald-500" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
