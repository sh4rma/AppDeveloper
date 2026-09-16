import { useEffect, useState } from "react";
import { Download, CheckCircle2 } from "lucide-react";

export default function InstallModal({
  app,
  onComplete,
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let value = 0;

    const timer = setInterval(() => {
      value += Math.floor(Math.random() * 7) + 3;

      if (value >= 100) {
        value = 100;
        clearInterval(timer);

        setTimeout(() => {
          onComplete();
        }, 700);
      }

      setProgress(value);
    }, 170);

    return () => clearInterval(timer);
  }, []);

  const completed = progress >= 100;

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/60 p-4 backdrop-blur-sm">

      <div className="w-full max-w-sm rounded-2xl bg-white p-7 text-center shadow-2xl">

        <div className="mx-auto grid size-24 place-items-center rounded-2xl bg-blue-600 text-3xl font-black text-white">
          {app.name?.charAt(0)}
        </div>

        <h2 className="mt-5 text-xl font-black">
          {completed
            ? "Download ready"
            : "Preparing application"}
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          {app.name}
        </p>

        <div className="relative mx-auto mt-7 size-32 rounded-full"
          style={{
            background: `conic-gradient(#2563eb ${progress}%, #e8edf2 0)`,
          }}
        >
          <div className="absolute inset-2 grid place-items-center rounded-full bg-white">
            <span className="text-2xl font-black text-blue-600">
              {progress}%
            </span>
          </div>
        </div>

        <div className="mt-7 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-150"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <p className="mt-4 text-xs text-slate-400">
          {completed
            ? "Starting APK download..."
            : "Please wait while we prepare your download."}
        </p>

        {completed && (
          <CheckCircle2
            className="mx-auto mt-4 text-blue-600"
            size={24}
          />
        )}

      </div>
    </div>
  );
}