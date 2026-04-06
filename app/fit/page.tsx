import type { Metadata } from "next";
import PageTransition from "@/app/components/PageTransition";
import FitClient from "./FitClient";

export const metadata: Metadata = {
  title: "Check Fit — Nick Carter",
  description:
    "Paste a job description and get an honest assessment of how well Nick Carter fits the role. Calibrated, specific, and willing to say no.",
};

export default function FitPage() {
  return (
    <PageTransition>
      <div className="py-8">
        <FitClient />
      </div>
    </PageTransition>
  );
}
