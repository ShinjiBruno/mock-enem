"use client";

export default function QuestionNav({
  questions,
  answers,
  currentIndex,
  onSelectQuestion,
}) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {questions.map((question, index) => {
        const isAnswered = answers[question.index] !== undefined;
        const isCurrent = index === currentIndex;

        return (
          <button
            key={index}
            onClick={() => onSelectQuestion(index)}
            className={`h-10 w-10 flex items-center justify-center rounded-md 
              ${isAnswered ? "bg-primary text-primary-foreground" : "bg-muted"}
              ${isCurrent ? "ring-2 ring-primary ring-offset-2" : ""}
            `}
          >
            {question.index}
          </button>
        );
      })}
    </div>
  );
}
