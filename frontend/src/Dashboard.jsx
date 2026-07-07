export default function Dashboard() {
  return (
    <main className="min-h-screen bg-white px-4 py-10 text-slate-900">
      <div className="mx-auto w-full max-w-3xl space-y-4 border border-slate-300 p-6">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-lg text-slate-700">Welcome to the Dashboard</p>
        <p className="text-sm text-slate-500">
          Esta página corresponde al template <code>Dashboard.html</code>.
        </p>
        <a
          className="inline-block rounded bg-slate-900 px-4 py-2 text-white"
          href="/"
        >
          Volver al inicio
        </a>
      </div>
    </main>
  );
}
