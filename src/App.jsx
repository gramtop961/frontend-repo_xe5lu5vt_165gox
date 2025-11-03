import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FilterPanel from "./components/FilterPanel";
import PlayerResults from "./components/PlayerResults";

const SAMPLE_PLAYERS = [
  {
    id: 1,
    name: "João Gomes",
    position: "DM",
    age: 22,
    club: "Wolves",
    league: "Premier League",
    value: 25,
    stats: { form: 78 },
    style: { pressing: 85, possession: 65, counter: 70 },
  },
  {
    id: 2,
    name: "Florian Wirtz",
    position: "AM",
    age: 20,
    club: "Leverkusen",
    league: "Bundesliga",
    value: 90,
    stats: { form: 92 },
    style: { pressing: 75, possession: 90, counter: 60 },
  },
  {
    id: 3,
    name: "Victor Osimhen",
    position: "ST",
    age: 24,
    club: "Napoli",
    league: "Serie A",
    value: 110,
    stats: { form: 88 },
    style: { pressing: 70, possession: 55, counter: 85 },
  },
  {
    id: 4,
    name: "Bukayo Saka",
    position: "RW",
    age: 22,
    club: "Arsenal",
    league: "Premier League",
    value: 120,
    stats: { form: 91 },
    style: { pressing: 80, possession: 85, counter: 75 },
  },
  {
    id: 5,
    name: "Khvicha Kvaratskhelia",
    position: "LW",
    age: 22,
    club: "Napoli",
    league: "Serie A",
    value: 95,
    stats: { form: 86 },
    style: { pressing: 65, possession: 80, counter: 82 },
  },
  {
    id: 6,
    name: "Aurelien Tchouaméni",
    position: "DM",
    age: 23,
    club: "Real Madrid",
    league: "La Liga",
    value: 100,
    stats: { form: 84 },
    style: { pressing: 78, possession: 88, counter: 70 },
  },
  {
    id: 7,
    name: "William Saliba",
    position: "CB",
    age: 22,
    club: "Arsenal",
    league: "Premier League",
    value: 80,
    stats: { form: 87 },
    style: { pressing: 72, possession: 82, counter: 68 },
  },
  {
    id: 8,
    name: "Jamal Musiala",
    position: "AM",
    age: 20,
    club: "Bayern",
    league: "Bundesliga",
    value: 110,
    stats: { form: 90 },
    style: { pressing: 77, possession: 92, counter: 65 },
  },
  {
    id: 9,
    name: "Mikel Merino",
    position: "CM",
    age: 27,
    club: "Real Sociedad",
    league: "La Liga",
    value: 45,
    stats: { form: 81 },
    style: { pressing: 68, possession: 84, counter: 60 },
  },
  {
    id: 10,
    name: "Jeremie Frimpong",
    position: "RB",
    age: 22,
    club: "Leverkusen",
    league: "Bundesliga",
    value: 55,
    stats: { form: 85 },
    style: { pressing: 88, possession: 70, counter: 92 },
  },
  {
    id: 11,
    name: "Theo Hernández",
    position: "LB",
    age: 25,
    club: "Milan",
    league: "Serie A",
    value: 70,
    stats: { form: 83 },
    style: { pressing: 75, possession: 78, counter: 90 },
  },
  {
    id: 12,
    name: "Diogo Costa",
    position: "GK",
    age: 23,
    club: "Porto",
    league: "Primeira Liga",
    value: 45,
    stats: { form: 80 },
    style: { pressing: 60, possession: 82, counter: 70 },
  },
];

function App() {
  const [filters, setFilters] = useState(null);

  const handleSearch = (f) => setFilters(f);

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <Hero />
      <FilterPanel onSearch={handleSearch} />
      <PlayerResults players={SAMPLE_PLAYERS} filters={filters} />

      <footer id="about" className="border-t border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-zinc-400">
          ScoutPro © {new Date().getFullYear()} • Аналитика трансферного рынка и подбор игроков.
        </div>
      </footer>
    </div>
  );
}

export default App;
