import ExamYearsClient from "@/app/features/ExamYearsClient";
import SimpleHeader from "./Header";

export default async function ExamYearsPage() {
  const res = await fetch("https://api.enem.dev/v1/exams", {
    cache: "no-store",
  });
  const availableTests = await res.json();

  return (
    <div>
      <SimpleHeader />
      <ExamYearsClient availableTests={availableTests} />
    </div>
  );
}
