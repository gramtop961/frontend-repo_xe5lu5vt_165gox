import { useState } from "react";
import { Search } from "lucide-react";

export default function FilterPanel({ onSearch }) {
  const [position, setPosition] = useState("");
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(32);
  const [maxValue, setMaxValue] = useState(50);
  const [league, setLeague] = useState("");
  const [style, setStyle] = useState({ pressing: 50, possession: 50, counter: 50 });

  const submit = (e) => {
    e.preventDefault();
    onSearch({ position, minAge, maxAge, maxValue, league, style });
  };

  return (
    <section id="search" className="border-y border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="text-2xl font-bold text-white">Подбор по параметрам</h2>
        <p className="mt-1 text-zinc-400">Настройте профиль игрока под вашу модель игры и бюджет.</p>

        <form onSubmit={submit} className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
            <label className="text-sm text-zinc-300">Позиция</label>
            <select
              className="mt-2 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            >
              <option value="">Любая</option>
              <option>GK</option>
              <option>CB</option>
              <option>LB</option>
              <option>RB</option>
              <option>DM</option>
              <option>CM</option>
              <option>AM</option>
              <option>LW</option>
              <option>RW</option>
              <option>ST</option>
            </select>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-zinc-300">Мин. возраст: {minAge}</label>
                <input
                  type="range"
                  min="16"
                  max="35"
                  value={minAge}
                  onChange={(e) => setMinAge(Number(e.target.value))}
                  className="mt-2 w-full"
                />
              </div>
              <div>
                <label className="text-sm text-zinc-300">Макс. возраст: {maxAge}</label>
                <input
                  type="range"
                  min="18"
                  max="40"
                  value={maxAge}
                  onChange={(e) => setMaxAge(Number(e.target.value))}
                  className="mt-2 w-full"
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
            <label className="text-sm text-zinc-300">Лига</label>
            <select
              className="mt-2 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              value={league}
              onChange={(e) => setLeague(e.target.value)}
            >
              <option value="">Любая</option>
              <option>Premier League</option>
              <option>La Liga</option>
              <option>Serie A</option>
              <option>Bundesliga</option>
              <option>Ligue 1</option>
              <option>Eredivisie</option>
              <option>Primeira Liga</option>
            </select>

            <div className="mt-4">
              <label className="text-sm text-zinc-300">Макс. стоимость (млн €): {maxValue}</label>
              <input
                type="range"
                min="1"
                max="200"
                value={maxValue}
                onChange={(e) => setMaxValue(Number(e.target.value))}
                className="mt-2 w-full"
              />
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
            <p className="text-sm text-zinc-300">Тактический профиль</p>
            <Slider label="Прессинг" value={style.pressing} onChange={(v) => setStyle((s) => ({ ...s, pressing: v }))} />
            <Slider label="Владение" value={style.possession} onChange={(v) => setStyle((s) => ({ ...s, possession: v }))} />
            <Slider label="Контратаки" value={style.counter} onChange={(v) => setStyle((s) => ({ ...s, counter: v }))} />

            <button
              type="submit"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700"
            >
              <Search className="h-4 w-4" /> Найти игроков
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Slider({ label, value, onChange }) {
  return (
    <div className="mt-3">
      <div className="flex items-center justify-between text-sm text-zinc-300">
        <span>{label}</span>
        <span className="text-zinc-400">{value}</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full"
      />
    </div>
  );
}
