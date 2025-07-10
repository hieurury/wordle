import ActionButton from "../components/ActionButton";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center dark:bg-slate-800 bg-white py-12 px-4">
      <div className="my-4">
        <span className="text-slate-500 dark:text-slate-100 text-2xl tracking-widest">Welcome to</span>
        <h1 className="text-6xl text-slate- dark:text-slate-200 font-bold uppercase">Wordle Rury</h1>
      </div>
      <div>
        <ActionButton title="Quick Start" link="/easy" />
      </div>
    </div>
  );
}
