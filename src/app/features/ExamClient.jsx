"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useExamState from "../hooks/useExam";
import QuestionCard from "./QuestionCard";
import QuestionNav from "./QuestionNav";
import ExamTimer from "./ExamTimer";
import ExamSummary from "./ExamSummary";

export default function ExamClient({
  questions,
  year,
  day,
  language,
  useTimer,
}) {
  const [showSummary, setShowSummary] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
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
      setExamFinished(true);
      localStorage.removeItem("examAnswers");
      localStorage.removeItem("examNotes");
      router.push(`/results/${year}/${day}?score=${calculateScore()}`);
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
            {useTimer && <ExamTimer duration={5 * 60 * 60} />}

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
              onClick={handleNext}
              disabled={currentQuestionIndex === questions.length - 1}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 py-2 px-4 rounded-md disabled:opacity-50"
            >
              Próxima
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
