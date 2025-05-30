"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useExamState from "../hooks/useExam";
import QuestionCard from "./QuestionCard";
import QuestionNav from "./QuestionNav";
import ExamTimer from "./ExamTimer";
import ExamSummary from "./ExamSummary";

export default function ExamClient({ questions, year, day, useTimer }) {
  const [showSummary, setShowSummary] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(
    day == "1" ? 5.5 * 60 * 60 : 5 * 60 * 60, //5h30 ou 5h00
  );
  const timerKey = `examTimer-${year}-${day}`;

  const router = useRouter();

  const {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    answers,
    notes,
    selectAnswer,
    saveNote,
    allQuestionsAnswered,
  } = useExamState(questions, year, day);

  const currentQuestion = questions[currentQuestionIndex];
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleFinish = () => {
    if (allQuestionsAnswered()) {
      localStorage.removeItem(`examAnswers-${year}-${day}`);
      localStorage.removeItem(`examNotes-${year}-${day}`);

      localStorage.setItem("examReviewQuestions", JSON.stringify(questions));
      localStorage.setItem("examReviewAnswers", JSON.stringify(answers));
      router.push(
        `/mock-exams/results/${year}/${day}?score=${calculateScore()}&questions=${questions.length}`,
      );
    }
  };

  const calculateScore = () => {
    return questions.reduce((score, question) => {
      return answers[question.index] === question.correctAlternative
        ? score + 1
        : score;
    }, 0);
  };

  if (showSummary) {
    return (
      <ExamSummary
        questions={questions}
        answers={answers}
        onCurrentQuestion={(index) => setCurrentQuestionIndex(index)}
        onBack={() => setShowSummary(false)}
        onFinish={handleFinish}
        canFinish={allQuestionsAnswered()}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/4 bg-card rounded-lg p-4 shadow-sm h-fit ">
          <div className="mt-6 mb-6">
            <div className="mt-6 flex flex-col gap-2">
              <button
                onClick={() => setShowSummary(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md"
              >
                Revisar Respostas
              </button>
            </div>
          </div>
          <h2 className="text-xl font-bold mb-4">Navegação</h2>
          <QuestionNav
            questions={questions}
            answers={answers}
            currentIndex={currentQuestionIndex}
            onSelectQuestion={setCurrentQuestionIndex}
          />
        </div>

        <div className="lg:w-3/4">
          {currentQuestion && (
            <QuestionCard
              question={currentQuestion}
              selectedAnswer={answers[currentQuestion.index]}
              note={notes[currentQuestion.index] || ""}
              onSelectAnswer={(letter) =>
                selectAnswer(currentQuestion.index, letter)
              }
              onSaveNote={(text) => saveNote(currentQuestion.index, text)}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
            />
          )}

          <div className="mt-6 flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 py-2 px-4 rounded-md disabled:opacity-50"
            >
              Anterior
            </button>
            <button
              onClick={
                currentQuestionIndex !== questions.length - 1
                  ? handleNext
                  : () => setShowSummary(true)
              }
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 py-2 px-4 rounded-md disabled:opacity-50"
            >
              {currentQuestionIndex !== questions.length - 1
                ? "Próxima"
                : "Finalizar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
