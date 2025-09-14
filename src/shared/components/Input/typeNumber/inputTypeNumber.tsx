import React, { forwardRef, useState, useCallback } from "react";

interface NumberInputProps {
  name: string;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "filled";
  showSteppers?: boolean;
  error?: boolean;
  errorMessage?: string;
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      name,
      value,
      defaultValue,
      onChange,
      placeholder = "Введите число",
      min = 0,
      max,
      step = 1,
      disabled = false,
      className = "",
      size = "md",
      variant = "default",
      showSteppers = true,
      error = false,
      errorMessage,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState<string>(
      defaultValue?.toString() || value?.toString() || "",
    );

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInternalValue(newValue);

        if (newValue === "") {
          onChange?.(NaN);
          return;
        }

        const numValue = parseFloat(newValue);
        if (!isNaN(numValue)) {
          onChange?.(numValue);
        }
      },
      [onChange],
    );

    const handleStep = useCallback(
      (direction: "up" | "down") => {
        const currentValue = parseFloat(internalValue) || min;
        let newValue = currentValue + (direction === "up" ? step : -step);

        if (min !== undefined && newValue < min) newValue = min;
        if (max !== undefined && newValue > max) newValue = max;

        setInternalValue(newValue.toString());
        onChange?.(newValue);
      },
      [internalValue, min, max, step, onChange],
    );

    const handleBlur = useCallback(() => {
      if (internalValue === "") return;

      const numValue = parseFloat(internalValue);
      if (isNaN(numValue)) {
        setInternalValue(min.toString());
        onChange?.(min);
        return;
      }

      let validatedValue = numValue;
      if (min !== undefined && numValue < min) validatedValue = min;
      if (max !== undefined && numValue > max) validatedValue = max;

      if (validatedValue !== numValue) {
        setInternalValue(validatedValue.toString());
        onChange?.(validatedValue);
      }
    }, [internalValue, min, max, onChange]);

    const sizeClasses = {
      sm: "h-8 text-sm",
      md: "h-10 text-base",
      lg: "h-12 text-lg",
    };

    const variantClasses = {
      default: "bg-primary-900 border-primary-600 focus:border-accent-300",
      outline: "bg-transparent border-primary-600 focus:border-accent-300",
      filled: "bg-primary-800 border-transparent focus:bg-primary-700",
    };

    const baseClasses = `
      w-full px-4 rounded-lg border transition-all duration-200
      focus:ring-2 focus:ring-accent-300 focus:border-transparent
      disabled:opacity-50 disabled:cursor-not-allowed
      placeholder:text-primary-400
      ${sizeClasses[size]}
      ${variantClasses[variant]}
      ${error ? "border-red-500 focus:ring-red-300" : ""}
    `;

    return (
      <div className="relative">
        <div className="relative flex items-center">
          <input
            ref={ref}
            name={name}
            type="text"
            value={internalValue}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            className={`${baseClasses} ${showSteppers ? "pr-12" : ""} ${className}`}
            {...props}
          />

          {showSteppers && (
            <div className="absolute right-1 flex space-x-1 text-xl">
              <button
                type="button"
                onClick={() => handleStep("up")}
                disabled={
                  disabled ||
                  (max !== undefined && parseFloat(internalValue || "0") >= max)
                }
                className="p-2 rounded-md hover:bg-primary-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => handleStep("down")}
                disabled={
                  disabled ||
                  (min !== undefined && parseFloat(internalValue || "0") <= min)
                }
                className="p-2 rounded-md hover:bg-primary-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                -
              </button>
            </div>
          )}
        </div>

        {error && errorMessage && (
          <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
        )}
      </div>
    );
  },
);

NumberInput.displayName = "NumberInput";

export default NumberInput;
