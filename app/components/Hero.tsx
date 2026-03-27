export default function Hero() {
  return (
    <section className="pt-20 pb-16">
      <h1 className="text-5xl md:text-6xl font-[family-name:var(--font-serif)] font-normal text-[#111] tracking-tight leading-[1.1]">
        Nick Carter
      </h1>
      <div className="mt-6 border-l-[3px] border-[#111] pl-5">
        <p className="text-lg md:text-xl text-[#555] leading-relaxed">
          Engineering leader who builds AI systems — and teaches teams to build them too
        </p>
      </div>
      <div className="mt-12 flex flex-col sm:flex-row gap-4">
        <a
          href="#artifacts"
          className="inline-block border-2 border-[#111] px-7 py-3 text-sm font-medium text-[#111] tracking-wide hover:bg-[#111] hover:text-white transition-colors text-center"
        >
          See the work
        </a>
        <div className="inline-block border border-[#ddd] px-7 py-3 text-sm text-[#aaa] tracking-wide text-center">
          Ask AI &middot; soon
        </div>
        <div className="inline-block border border-[#ddd] px-7 py-3 text-sm text-[#aaa] tracking-wide text-center">
          Check Fit &middot; soon
        </div>
      </div>
    </section>
  );
}
