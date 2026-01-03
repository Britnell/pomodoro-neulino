import { useEffect, useState, useRef } from "react";

type TimerState = "idle" | "work" | "break";

function App() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [state, setState] = useState<TimerState>("idle");
  const [time, setTime] = useState(40 * 60);
  const [isPaused, setIsPaused] = useState(false);
  const [completedCycles, setCompletedCycles] = useState(0);

  const [workDuration, setWorkDuration] = useState(40 * 60);
  const [breakDuration, setBreakDuration] = useState(6 * 60);

  useEffect(() => {
    if (!isPaused && state !== "idle") {
      const interval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 10);

      return () => clearInterval(interval);
    }
  }, [isPaused, state]);

  const startWork = () => {
    setState("work");
    setTime(workDuration);
    setIsPaused(false);
  };

  const startBreak = () => {
    setState("break");
    setTime(breakDuration);
    setIsPaused(false);
  };

  const togglePause = () => setIsPaused((prev) => !prev);

  const reset = () => {
    setState("idle");
    setTime(workDuration);
    setIsPaused(false);
  };

  const finishCycle = () => {
    setCompletedCycles((prev) => prev + 1);
    reset();
  };

  const formatTime = (seconds: number) => {
    const sign = seconds < 0 ? "-" : "";
    const abs = Math.abs(seconds);
    const mins = Math.floor(abs / 60);
    const secs = abs % 60;
    return `${sign}${String(mins).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  const buttonclick = () => {
    if (state === "idle") startWork();
    if (state !== "idle") togglePause();
  };

  const handleWorkDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = Number(e.target.value) * 60;
    setWorkDuration(newVal);
    if (state === "idle") setTime(newVal);
  };

  const handleBreakDurationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newVal = Number(e.target.value) * 60;
    setBreakDuration(newVal);
  };

  return (
    <div
      className={
        " min-h-screen p-2 " +
        (state === "break" ? "bg-[#6ad64f]" : "bg-red-400")
      }
    >
      <header className="flex">
        <button
          onClick={() => dialogRef.current?.showModal()}
          className=" ml-auto px-3 py-1 bg-red-700 rounded-full text-center font-semibold"
        >
          {completedCycles}
        </button>
      </header>
      <main className=" flex flex-col items-center">
        <h1 className=" text-2xl font-semibold mb-6">
          {state === "idle" && "Pomodoro timer"}
          {state === "work" && "Working"}
          {state === "break" && "Breaktime"}
        </h1>
        <button
          onClick={buttonclick}
          className={
            "group size-42 rounded-full font-bold flex flex-col justify-center border-4 hover:border-black " +
            (state === "work"
              ? " bg-red-700 border-red-700"
              : state === "break"
              ? " bg-green-600 border-green-600"
              : "")
          }
        >
          <span className="text-4xl ">{formatTime(time)}</span>
          <span className=" text-lg font-medium invisible group-hover:visible relative top-2">
            {state === "idle" ? "start" : isPaused ? "resume" : "pause"}
          </span>
        </button>
        <div
          className={" mt-4 flex gap-2 " + (state === "idle" ? "hidden" : "")}
        >
          {time <= 0 && (
            <button
              className=" border- font-semibold"
              onClick={state === "work" ? startBreak : finishCycle}
            >
              {state === "work" ? "Start Break" : "Finish"}
            </button>
          )}
          {isPaused && (
            <button
              className=" bg-transparent border-2 text-black opacity-70 px-2 hover:bg-red-500 hover:opacity-100 font-semibold"
              onClick={reset}
            >
              Reset
            </button>
          )}
        </div>
      </main>

      <dialog
        ref={dialogRef}
        onClick={(e) =>
          e.target === dialogRef.current && dialogRef.current?.close()
        }
        className="bg-red-300 p-2 rounded-lg mx-auto mt-20 w-100"
      >
        <div className="p-4 relative">
          <button
            onClick={() => dialogRef.current?.close()}
            className=" absolute top-0 right-0  px-2 bg-transparent"
          >
            X
          </button>
          <div className=" flex flex-col items-center">
            <p>Completed {completedCycles} cycles today</p>
            <button className="mx-auto" onClick={() => setCompletedCycles(0)}>
              reset
            </button>
          </div>

          <div className=" mt-4">
            <label className="block mb-2">Work (minutes):</label>
            <input
              type="number"
              value={workDuration / 60}
              onChange={handleWorkDurationChange}
              className="w-full p-2 rounded mb-4"
              min="1"
            />
            <label className="block mb-2">Break (minutes):</label>
            <input
              type="number"
              value={breakDuration / 60}
              onChange={handleBreakDurationChange}
              className="w-full p-2 rounded"
              min="1"
            />
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default App;
