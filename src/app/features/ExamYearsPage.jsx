import ExamYearsClient from "@/app/features/ExamYearsClient";

export default async function ExamYearsPage() {
  const res = await fetch("https://api.enem.dev/v1/exams", {
    cache: "no-store",
  });
  const availableTests = await res.json();

  console.log(availableTests);

  return <ExamYearsClient availableTests={availableTests} />;
}
