import { FormEvent } from "react";
import { emailValidation } from "./utils/validation";

export type Data = {
  email: string;
  password: string;
  rememberMe: boolean;
};
export default function useValidate() {
  const errorClasses = [
    "border-red-500",
    "focus:ring-red-500",
    "focus:border-red-500",
  ];

  const errorMessages = {
    email: {
      required: "Email обязателен для заполнения",
      invalid: "Пожалуйста, введите корректный email",
    },
    password: {
      required: "Пароль обязателен для заполнения",
      invalid: "Пароль должен быть не менее 8 символов",
      match: "Пароли не совпадают",
    },
  };

  const addErrorClasses = (input: HTMLInputElement, span: HTMLSpanElement) => {
    input.classList.add(...errorClasses);
    span.classList.remove("hidden");
    span.classList.add("block");
  };

  const removeErrorClasses = (
    input: HTMLInputElement,
    span: HTMLSpanElement,
  ) => {
    input.classList.remove(...errorClasses);
    span.classList.remove("block");
    span.classList.add("hidden");
  };

  const addSpanError = (
    input: HTMLInputElement,
    span: HTMLSpanElement,
    errors: string[],
  ) => {
    addErrorClasses(input, span);

    const errorString = errors.join(", ").toLowerCase();
    const capitalizedErrorString =
      errorString.charAt(0).toUpperCase() + errorString.slice(1);
    span.textContent = capitalizedErrorString;
  };

  const validate = (input: HTMLInputElement, span: HTMLSpanElement) => {
    const errors = [] as string[];
    removeErrorClasses(input, span);

    switch (input.type) {
      case "email": {
        if (!input.value || input.value.length === 0) {
          errors.push(errorMessages.email.required);
          addSpanError(input, span, errors);
        }
        if (!emailValidation(input.value)) {
          errors.push(errorMessages.email.invalid);
          addSpanError(input, span, errors);
        }
      }
      case "password": {
        if (input.name === "password") {
          if (!input.value) {
            errors.push(errorMessages.password.required);
            addErrorClasses(input, span);
            addSpanError(input, span, errors);
          }
          if (input.value.length < 8) {
            errors.push(errorMessages.password.invalid);
            addSpanError(input, span, errors);
          }
        } else if (input.name === "passwordConfirm") {
          const passwordInput = input
            .closest("form")
            ?.querySelector('input[name="password"]') as HTMLInputElement;
          if (passwordInput.value !== input.value) {
            errors.push(errorMessages.password.match);
            addSpanError(input, span, errors);
          }
        }
      }
      default: {
        break;
      }
    }
    return errors;
  };

  const submit = (
    form: HTMLFormElement,
    setLoading: (arg0: boolean) => void,
    setRespType: (arg0: "success" | "error") => void,
  ) => {
    const inputs = form.querySelectorAll(
      "input",
    ) as NodeListOf<HTMLInputElement>;
    const url = form.action;

    const data = {} as Data;
    inputs.forEach((input) => {
      switch (input.name) {
        case "email": {
          data.email = input.value;

          break;
        }
        case "password": {
          data.password = input.value;
          break;
        }
        case "remember": {
          if (input.checked) {
            data.rememberMe = true;
          } else {
            data.rememberMe = false;
          }
        }
        default:
          break;
      }
    });
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");

        setLoading(true);
        setRespType("success");
      })
      .catch((error) => {
        setLoading(true);
        setRespType("error");
      })
      .finally(() => {
        form.reset();
      });
  };

  const onSubmit = (
    e: FormEvent<HTMLFormElement>,
    setLoading: (arg0: boolean) => void,
    setRespType: (arg0: "success" | "error") => void,
  ) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const inputs = form.querySelectorAll(
      "input",
    ) as NodeListOf<HTMLInputElement>;

    const errors: string[] = [];
    inputs.forEach((input) => {
      if (input.type === "checkbox") return;
      const span = input
        .closest("label")
        ?.querySelector("span") as HTMLSpanElement;

      errors.push(...validate(input, span));
    });

    if (errors.length === 0) {
      submit(form, setLoading, setRespType);
    }
  };

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;

    if (input.type === "checkbox") return;
    const span = input
      .closest("label")
      ?.querySelector("span") as HTMLSpanElement;

    validate(input, span);
  };

  const onBlur = (e: FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;

    if (input.type === "checkbox") return;
    const span = input
      .closest("label")
      ?.querySelector("span") as HTMLSpanElement;

    validate(input, span);
  };

  return {
    onSubmit,
    onChange,
    onBlur,
  };
}
