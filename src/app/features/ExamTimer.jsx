"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

export default function ExamTimer({
  duration,
  timerKey,
  onUpdateTimeRemining,
  onTimeEnd,
}) {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef();

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(timerKey, timeRemaining);
    }
    if (onUpdateTimeRemining) onUpdateTimeRemining(timeRemaining);
  }, [timeRemaining, timerKey, onUpdateTimeRemining]);

  useEffect(() => {
    if (!isRunning) return;
    if (timeRemaining <= 0) {
      onTimeEnd && onTimeEnd();
      return;
    }
    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeRemaining, onTimeEnd]);

  useEffect(() => {
    if (timeRemaining <= 0 && typeof window !== "undefined") {
      localStorage.removeItem(timerKey);
    }
  }, [timeRemaining, timerKey]);

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="text-2xl font-bold">
        {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </div>
      {/* <Button
        onClick={toggleTimer}
        variant="outline"
        size="sm"
        className="w-full"
      >
        {isRunning ? "Pausar" : "Continuar"}
      </Button> */}
    </div>
  );
}
