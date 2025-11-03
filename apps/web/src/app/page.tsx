import { LayoutProvider } from "@/components/shared/layout.provider";
import { SummaryPage } from "@/features/summary/components/summary.page";

// const HEADER_WIDTH = "98px";
// const INPUT_WIDTH = "120px";

export default async function Home() {
  return (
    <LayoutProvider className={`border-x pt-[98px] pb-[120px]`}>
      <SummaryPage />
    </LayoutProvider>
  );
}
