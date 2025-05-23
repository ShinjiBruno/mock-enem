"use client";

export default function QuestionNav({
  questions,
  answers,
  currentIndex,
  onSelectQuestion,
  showCorrection = false,
}) {
  return (
    <div className="grid grid-cols-5 gap-2 p-3 h-100 overflow-y-auto">
      {questions.length > 0 &&
        questions.map((question, index) => {
          if (!question) return;
          const isAnswered = answers[question.index] !== undefined;
          const isCurrent = index === currentIndex;
          const isCorrect =
            question.correctAlternative === answers[question.index];

          return (
            <button
              key={index}
              onClick={() => onSelectQuestion(index)}
              className={`h-10 w-10 flex items-center justify-center rounded-md 
              ${isAnswered ? "bg-primary text-primary-foreground" : "bg-muted"}
              ${isCurrent ? "ring-2 ring-primary ring-offset-2" : ""}
              ${showCorrection ? (isCorrect ? "bg-green-400" : "bg-red-400") : null}
            `}
            >
              {question.index}
            </button>
          );
        })}
    </div>
  );
}
