import type { Metadata } from "next";
import DocumentPage from "@/app/components/DocumentPage";
import { renderMarkdown } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "How It Was Built — Agentic — Nick Carter",
  description:
    "The full story of how the Agentic novel drafting system was built in one evening — summary, narrative, and process.",
};

export default function ProcessPage() {
  const summaryHtml = renderMarkdown("agentic-novel/process-summary.md");
  const narrativeHtml = renderMarkdown(
    "agentic-novel/process-narrative.md"
  );

  return (
    <DocumentPage
      title="How It Was Built — Process & Transcript"
      description="The full story of building the Agentic drafting system in one evening: 4 hours, 29 files, 3 chapters drafted."
      backLink={{ href: "/portfolio/agentic-novel", label: "Agentic Overview" }}
    >
      <section>
        <h2 className="text-xl font-semibold text-zinc-900 mb-4">Summary</h2>
        <div dangerouslySetInnerHTML={{ __html: summaryHtml }} />
      </section>

      <hr className="my-10 border-zinc-200" />

      <section>
        <h2 className="text-xl font-semibold text-zinc-900 mb-4">
          Full Narrative
        </h2>
        <div dangerouslySetInnerHTML={{ __html: narrativeHtml }} />
      </section>

      <hr className="my-10 border-zinc-200" />

      <section>
        <h2 className="text-xl font-semibold text-zinc-900 mb-4">
          Session Transcript
        </h2>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-6">
          <p className="text-base text-zinc-600 italic">
            Full session transcript coming soon.
          </p>
        </div>
      </section>
    </DocumentPage>
  );
}
