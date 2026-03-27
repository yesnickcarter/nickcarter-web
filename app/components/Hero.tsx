export default function Hero() {
  return (
    <section className="py-16 px-6 md:px-0">
      <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight">
        Nick Carter
      </h1>
      <p className="mt-4 text-lg md:text-xl text-zinc-600 max-w-2xl leading-relaxed">
        Engineering leader who builds AI systems — and teaches teams to build them too
      </p>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <a
          href="#artifacts"
          className="flex flex-col items-center justify-center rounded-lg border border-zinc-200 px-6 py-5 text-center hover:border-zinc-400 hover:shadow-sm transition-all"
        >
          <span className="text-base font-medium text-zinc-900">See What I Build</span>
        </a>
        <div className="flex flex-col items-center justify-center rounded-lg border border-zinc-100 bg-zinc-50 px-6 py-5 text-center">
          <span className="text-base font-medium text-zinc-400">Ask AI About Me</span>
          <span className="mt-1 text-xs text-zinc-400">Coming soon</span>
        </div>
        <div className="flex flex-col items-center justify-center rounded-lg border border-zinc-100 bg-zinc-50 px-6 py-5 text-center">
          <span className="text-base font-medium text-zinc-400">Check Fit</span>
          <span className="mt-1 text-xs text-zinc-400">Coming soon</span>
        </div>
      </div>
    </section>
  );
}
