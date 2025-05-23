import FireWorkConfetti from "@/components/confetti";
import SimpleHeader from "./Header";
import ExamScore from "./ExamScore";

export default async function ExamScorePage({ searchParams }) {
  const score = (await searchParams)?.score;
  const questions = (await searchParams)?.questions ?? 90;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SimpleHeader />
      <FireWorkConfetti />
      <ExamScore score={score} questions={questions} />
    </div>
  );
}
