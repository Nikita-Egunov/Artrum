"use client";
import { useForm, SubmitHandler } from "react-hook-form"
import { Notif } from "@/shared/components";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { openNotif } from "@/shared/redux/slices/notifSlice";

const signUpSchema = z.object({
  email: z.email("Некорректный email"),
  password: z.string().min(8, "Пароль должен быть минимум из 8 символов"),
  passwordConfirm: z.string(),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Пароли не совпадают",
  path: ["passwordConfirm"],
});


type SignUpInputs = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid, dirtyFields },
  } = useForm<SignUpInputs>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  })

  const onSubmit: SubmitHandler<SignUpInputs> = (data) => {
    console.log(data);
    fetch("/api/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Error");
      }

      dispatch(openNotif({
        message: "Вы успешно зарегистрировались",
        type: "success",
        redirectUrl: "/profile"
      }))
    }).catch((err) => {
      dispatch(openNotif({
        message: "Произошла ошибка. Возможно вы уже зарегистрированы",
        type: "error",
        redirectUrl: null,
      }))
      console.error(err);
    })
  }

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-primary-800/30 rounded-xl border border-primary-700">
      <h1
        className="text-3xl max-w-fit mx-auto font-bold bg-gradient-to-r from-accent-400 to-secondary-300 
                     bg-clip-text text-transparent mb-8 text-center"
      >
        Регистрация
      </h1>

      <form
        action={"/api/sign-up/"}
        noValidate
        className="space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-4">
          {/* Email поле */}
          <div>
            <label className="block text-primary-100 text-sm mb-2">
              Email

              <input
                type="email"
                className={`w-full focus-visible:outline-none px-4 py-3 bg-primary-900 border rounded-lg
                  focus:ring-2 focus:ring-accent-300 focus:border-transparent ${errors.email ? "border-red-500" : "border-primary-600"
                  }`}
                placeholder="your@email.com"
                autoComplete="email"
                {...register("email")}
                aria-invalid={errors.email ? true : false}
              />

              {errors.email && (
                <span role="alert" className="mt-[10px] text-red-600 block">
                  {errors.email.message}
                </span>
              )}
              {dirtyFields.email && !errors.email && (
                <span className="mt-[10px] text-green-500 block">✓ Корректный email</span>
              )}
            </label>
          </div>

          {/* Пароль */}
          <div>
            <label className="block text-primary-100 text-sm mb-2">
              Пароль
              <div className="relative">
                <input
                  type={visible ? "text" : "password"}
                  className={`w-full focus-visible:outline-none px-4 py-3 bg-primary-900 border rounded-lg
                    focus:ring-2 focus:ring-accent-300 focus:border-transparent ${errors.password ? "border-red-500" : "border-primary-600"
                    }`}
                  placeholder="••••••••"
                  autoComplete={
                    "new-password"
                  }
                  {...register("password")}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setVisible(!visible)
                  }}
                  className="p-[6px] flex items-center justify-center absolute top-1/2 -translate-y-1/2 z-10 right-[2%] cursor-pointer"
                >
                  {visible
                    ? <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" /></svg>
                    : <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M480-392q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q141 0 257.5 76T912-520h-91q-52-93-143-146.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280q20 0 40-2t40-6v81q-20 3-40 5t-40 2Zm0-120q22 0 42.5-5t38.5-14q5-50 31.5-90t67.5-64v-7q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm-5-180Zm205 380q-17 0-28.5-11.5T640-160v-120q0-17 11.5-28.5T680-320v-40q0-33 23.5-56.5T760-440q33 0 56.5 23.5T840-360v40q17 0 28.5 11.5T880-280v120q0 17-11.5 28.5T840-120H680Zm40-200h80v-40q0-17-11.5-28.5T760-400q-17 0-28.5 11.5T720-360v40Z" /></svg>
                  }
                </button>
              </div>
              {errors.password && (
                <span role="alert" className="mt-[10px] text-red-600 block">
                  {errors.password.message}
                </span>
              )}
              {dirtyFields.password && !errors.password && (
                <span className="mt-[10px] text-green-500 block">✓ Корректный пароль</span>
              )}
            </label>
          </div>

          {/* Подтверждение пароля (только для регистрации) */}
          <div>
            <label className="block text-primary-100 text-sm mb-2">
              Подтвердите пароль
              <div className="relative">
                <input
                  type={visible ? "text" : "password"}
                  className={`w-full focus-visible:outline-none px-4 py-3 bg-primary-900 border rounded-lg
                      focus:ring-2 focus:ring-accent-300 focus:border-transparent ${errors.passwordConfirm ? "border-red-500" : "border-primary-600"
                    }`}
                  placeholder="••••••••"
                  autoComplete="new-password webauthn"
                  {...register("passwordConfirm")}
                />
                {errors.passwordConfirm && (
                  <span role="alert" className="mt-[10px] text-red-600 block">
                    {errors.passwordConfirm.message}
                  </span>
                )}
                {dirtyFields.passwordConfirm && !errors.passwordConfirm && (
                  <span className="mt-[10px] text-green-500 block">✓ Пароли совпадают</span>
                )}
              </div>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={`w-full text-white py-3 rounded-lg transition-colors flex justify-center items-center ${isValid && !isSubmitting
            ? "bg-secondary-300 hover:bg-secondary-400"
            : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          {isSubmitting ? (
            <span>Загрузка...</span>
          ) :
            "Зарегистрироваться"
          }
        </button>

        <p className="text-center text-primary-200 text-sm mt-6">
          {"Есть аккаунт?"}{" "}
          <Link
            href={"/sign-in"}
            className="text-secondary-300 hover:text-secondary-400 transition-colors"
          >
            {"Войти"}
          </Link>
        </p>
      </form>
    </div>
  );
}