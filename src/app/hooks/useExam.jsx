"use client";

import { useState, useEffect } from "react";

export default function useExamState(questions, year, day) {
  const [answers, setAnswers] = useState({});

  const [notes, setNotes] = useState({});

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const allQuestionsAnswered = () => {
    return questions.every((q) => answers[q.index] !== undefined);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && Object.keys(answers).length > 0) {
      localStorage.setItem(
        `examAnswers-${year}-${day}`,
        JSON.stringify(answers),
      );
    }
  }, [answers, year, day]);

  useEffect(() => {
    if (typeof window !== "undefined" && Object.keys(notes).length > 0) {
      localStorage.setItem(`examNotes-${year}-${day}`, JSON.stringify(notes));
    }
  }, [notes, year, day]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedAnswers = localStorage.getItem(`examAnswers-${year}-${day}`);
      const savedNotes = localStorage.getItem(`examNotes-${year}-${day}`);
      if (savedAnswers) {
        setAnswers(JSON.parse(savedAnswers));
      }

      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
    }
  }, [year, day]);

  const selectAnswer = (questionIndex, letter) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: letter,
    }));
  };

  const saveNote = (questionIndex, text) => {
    setNotes((prev) => ({
      ...prev,
      [questionIndex]: text,
    }));
  };

  return {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    answers,
    notes,
    selectAnswer,
    saveNote,
    allQuestionsAnswered,
  };
}
