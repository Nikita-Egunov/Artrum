"use client";

import { useGetProfileQuery } from "@/shared";
import { Notif } from "@/shared/components";
import { RootState } from "@/shared/redux";
import { openNotif } from "@/shared/redux/slices/notifSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

const inputsSchema = z.object({
  nik: z
    .string()
    .min(3, {
      error: "Ник должен быть не менее 3 символов",
    })
    .or(z.literal("")),
  email: z.email({
    error: "Некорректный email",
  }),
  password: z
    .string()
    .min(8, "Пароль должен быть не менее 8 символов")
    .or(z.literal("")),
});

type Inputs = z.infer<typeof inputsSchema>;
export default function NameCustomize() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const { isOpen, message, type, redirectUrl } = useSelector(
    (state: RootState) => state.notif,
  );

  const [isFormLoading, setIsFormLoading] = useState(false);
  const { isError, data, isLoading: isDataLoading } = useGetProfileQuery();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<Inputs>({
    resolver: zodResolver(inputsSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (data && !isDataLoading) {
      reset({
        email: data.email,
        nik: data.name || "",
        password: "",
      });
    }
  }, [data, reset]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("Form submitted:", data);
    setIsFormLoading(true);
    fetch("/api/updateUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error updating user data");
        }
        setIsFormLoading(false);
        dispatch(
          openNotif({
            message: "Данные успешно обновлены!",
            type: "success",
            redirectUrl: null,
          }),
        );
      })
      .catch((error) => {
        dispatch(
          openNotif({
            message: "Произошла ошибка. Попробуйте позже",
            type: "error",
            redirectUrl: null,
          }),
        );
        console.error("Error:", error);
      });
  };

  if (isDataLoading)
    return (
      <div className="w-full p-6 flex justify-center items-center bg-primary-800/40 rounded-xl border border-primary-700 space-y-8">
        <span className="w-5 h-5 block border-b border-primary-400 rounded-full animate-spin"></span>
      </div>
    );

  if (isError || !data)
    return (
      <div className="w-full p-6 flex justify-center items-center bg-primary-800/40 rounded-xl border border-primary-700 space-y-8">
        <p className="text-primary-100">Упс, что то упало...</p>
      </div>
    );

  return (
    <>
      <div className="w-full p-6 bg-primary-800/40 rounded-xl border border-primary-700 space-y-8">
        <h2 className="text-2xl font-bold text-primary-50">
          Изменение данных аккаунта
        </h2>

        <form
          noValidate
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Name Field */}
          <div>
            <label className="block text-primary-100 text-sm mb-2">
              Ник - name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-primary-900 border border-primary-600 rounded-lg
                   focus-visible:outline-none  focus:ring-2 focus:ring-accent-300 focus:border-transparent"
              {...register("nik")}
            />
            {errors.nik && (
              <span role="alert" className="mt-[10px] text-red-600 block">
                {errors.nik.message}
              </span>
            )}
            {dirtyFields.nik && !errors.nik && (
              <span className="mt-[10px] text-green-500 block">
                ✓ Корректный nik - name
              </span>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-primary-100 text-sm mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 bg-primary-900 border border-primary-600 rounded-lg
               focus-visible:outline-none      focus:ring-2 focus:ring-accent-300 focus:border-transparent"
              {...register("email")}
              autoComplete="email"
            />
            {errors.email && (
              <span role="alert" className="mt-[10px] text-red-600 block">
                {errors.email.message}
              </span>
            )}
            {dirtyFields.email && !errors.email && (
              <span className="mt-[10px] text-green-500 block">
                ✓ Корректный email
              </span>
            )}
          </div>
          {/* Password Field */}
          <div>
            <label className="block text-primary-100 text-sm mb-2">
              Пароль
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                className="w-full px-4 py-3 bg-primary-900 border border-primary-600 rounded-lg
              focus-visible:outline-none      focus:ring-2 focus:ring-accent-300 focus:border-transparent"
                {...register("password")}
                autoComplete="new-password"
              />
              <button
                className="p-[6px] flex items-center justify-center absolute top-1/2 -translate-y-1/2 z-10 right-[2%] cursor-pointer"
                onClick={(e) => {
                  setPasswordVisible(!passwordVisible);
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                {passwordVisible ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#fff"
                  >
                    <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#fff"
                  >
                    <path d="M480-392q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q141 0 257.5 76T912-520h-91q-52-93-143-146.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280q20 0 40-2t40-6v81q-20 3-40 5t-40 2Zm0-120q22 0 42.5-5t38.5-14q5-50 31.5-90t67.5-64v-7q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm-5-180Zm205 380q-17 0-28.5-11.5T640-160v-120q0-17 11.5-28.5T680-320v-40q0-33 23.5-56.5T760-440q33 0 56.5 23.5T840-360v40q17 0 28.5 11.5T880-280v120q0 17-11.5 28.5T840-120H680Zm40-200h80v-40q0-17-11.5-28.5T760-400q-17 0-28.5 11.5T720-360v40Z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <span role="alert" className="mt-[10px] text-red-600 block">
                {errors.password.message}
              </span>
            )}
            {dirtyFields.password && !errors.password && (
              <span className="mt-[10px] text-green-500 block">
                ✓ Корректный пароль
              </span>
            )}
          </div>

          <div className="flex gap-4 justify-end">
            <button
              disabled={Object.keys(dirtyFields).length === 0}
              className={`border-2 border-secondary-300 text-secondary-300 px-6 py-2 ${Object.keys(dirtyFields).length === 0 && "opacity-50 cursor-not-allowed"}
                          rounded-full hover:bg-secondary-300 hover:text-white transition-colors`}
            >
              {isFormLoading ? (
                <span className="flex justify-center items-center">
                  <span className="block w-[15px] aspect-square border-b border-l rounded-full animate-spin border-secondary-300"></span>
                </span>
              ) : (
                "Сохранить изменения"
              )}
            </button>
          </div>
        </form>
      </div>
      {isOpen && <Notif type={type}>{message}</Notif>}
    </>
  );
}
