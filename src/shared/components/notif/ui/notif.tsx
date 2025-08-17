"use client";

import { useEffect, useState } from "react";

interface NotifProps {
  children: React.ReactNode;
  type?: "success" | "warning" | "error";
  setOnOpen: (state: boolean) => void; // Добавляем колбэк
}

export default function Notif({
  children,
  type = "success",
  setOnOpen,
}: NotifProps) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timerId = setInterval(() => {
      setProgress((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 40);

    return () => clearInterval(timerId);
  }, []);

  // Вызываем onClose после завершения прогресса
  useEffect(() => {
    if (progress === 0) {
      setOnOpen(false);
    }
  }, [progress]);

  if (progress === 0) return null; // Не рендерим, если прогресс закончился

  return (
    <div className="fixed bottom-4 right-1/2 translate-x-1/2 md:translate-x-0 md:right-4 z-50 animate-slideIn">
      <div
        className="bg-primary-800 border border-primary-700 rounded-lg p-4 
                     shadow-xl min-w-[300px] relative overflow-hidden"
      >
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className={`shrink-0 p-2 rounded-full bg-accent-300/20`}>
            {type === "success" && (
              <svg
                className="w-5 h-5 text-green-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
            {type === "error" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#fb2c36 "
              >
                <path d="M440-400v-360h80v360h-80Zm0 200v-80h80v80h-80Z" />
              </svg>
            )}
            {type === "warning" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="oklch(70.5% 0.213 47.604)"
              >
                <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
              </svg>
            )}
          </div>

          {/* Content */}
          <div className="flex-1">
            <p className="text-primary-50 text-sm font-medium">{children}</p>
            <p className="text-primary-200 text-xs mt-1">Только что</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-700">
          <div
            style={{ maxWidth: `${progress}%` }}
            className="h-full bg-secondary-300 animate-progress w-full origin-left"
          ></div>
        </div>
      </div>
    </div>
  );
}
