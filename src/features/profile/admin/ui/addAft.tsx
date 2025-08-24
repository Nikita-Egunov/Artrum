/* eslint-disable @next/next/no-img-element */
"use client";

import { Notif } from "@/shared/components";
import NumberInput from "@/shared/components/Input/typeNumber/inputTypeNumber";

import { useGetProfileQuery } from "@/shared";
import { RootState } from "@/shared/redux";
import { openNotif } from "@/shared/redux/slices/notifSlice";
import { convertToBase64 } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import z, { boolean, object } from "zod";
import { useRef } from "react";


export default function AddAft() {
  const priseInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { isOpen, message, type } = useSelector((state: RootState) => state.notif);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputSchema = z.object({
    image: z
      .instanceof(globalThis.FileList, { message: 'Загрузите изображение' })
      .refine((files) => files.length === 1, 'Только одино изображение')
      .refine((files) => files[0]?.size <= 4 * 1024 * 1024, "Размер изображения не должен превышать 4 МБ")
      .refine((files) => ["image/jpeg", "image/png", "image/webp"].includes(files[0]?.type)),
    title: z
      .string().min(1, { error: 'Нельзя оставлять пустым' }),
    description: z
      .string().min(1, { error: 'Нельзя оставлять пустым' }),
  })

  type InputSchema = z.infer<typeof inputSchema>

  const {
    handleSubmit,
    formState: { errors, isValid },
    register,
    watch,
    setValue,
    reset
  } = useForm<InputSchema>({
    resolver: zodResolver(inputSchema),
    mode: "all",
    reValidateMode: "onChange",
  })

  const imageFile = watch("image") as FileList

  const onSubmit = (data: InputSchema) => {
    const formData = new FormData();

    formData.append("image", data.image[0]);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", priseInputRef.current?.value || '0');

    setIsSubmitting(true)

    fetch('/api/addAft', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Error adding AFT");
        }
        dispatch(openNotif({
          message: 'Успешно изменено',
          type: 'success',
          redirectUrl: null,
        }))
        setPreviewUrl(null);
        reset()
      })
      .catch((error) => {
        console.error(error);
        dispatch(openNotif({
          message: 'Произошла ошибка. Попробуйте позже',
          type: 'error',
          redirectUrl: null,
        }))
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  useEffect(() => {
    (async () => {
      const image = imageFile?.[0]
      if (image instanceof File) {
        const url = await convertToBase64(image)
        setPreviewUrl(url)
      }
    })()
  }, [imageFile])

  useEffect(() => {
    console.log(errors.title?.message);

  }, [errors.title?.message])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-primary-800/40 rounded-xl border border-primary-700 space-y-6">
        <h2 className="text-2xl font-bold text-primary-50">Добавить новую AFT</h2>

        <div className="border-2 border-dashed border-primary-600 rounded-xl p-8 text-center
                     hover:border-accent-300 transition-colors cursor-pointer"
          onDragOver={(e) => {
            e.preventDefault();
            e.currentTarget.classList.add('border-accent-300');
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.currentTarget.classList.remove('border-accent-300');
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.currentTarget.classList.remove('border-accent-300');
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              setValue(
                "image",
                e.dataTransfer.files,
                { shouldValidate: true }
              )
            }
          }}
        >
          {(previewUrl && !(errors.image)) ? (
            <div className="mb-4">
              <img
                src={previewUrl}
                alt="Preview"
                className="mx-auto max-h-48 rounded-md"
              />
            </div>
          ) : (
            <>
              <div className="mx-auto mb-4 text-accent-300">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>

              <p className="text-primary-100 mb-2">
                Перетащите сюда файл или{' '}
                <label htmlFor="aft-upload"
                  className="text-secondary-300 cursor-pointer hover:text-secondary-400">
                  выберите
                </label>
              </p>
              <p className="text-primary-200 text-sm">
                Форматы: JPG, PNG • Макс. размер: 4MB
              </p>
            </>
          )}

          {errors.image &&
            <span className="text-red-500 block">{errors.image.message}</span>
          }

          <input
            id="aft-upload"
            type="file"
            className="hidden"
            accept="image/*"
            {...register("image")}
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-primary-100 text-sm mb-2">Название товара</label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-primary-900 border border-primary-600 rounded-lg
                     focus:ring-2 focus:ring-accent-300 focus:border-transparent"
              placeholder="Введите название"
              {...register("title")}
              onChange={(e) => { }}
            />
            {errors.title &&
              <span role="alert" className="text-red-500">{errors.title.message}</span>
            }
          </div>

          <div>
            <label className="block text-primary-100 text-sm mb-2">Описание</label>
            <textarea
              className="w-full px-4 py-3 bg-primary-900 border border-primary-600 rounded-lg
                     focus:ring-2 focus:ring-accent-300 focus:border-transparent h-32"
              placeholder="Добавьте описание товара"
              {...register("description")}
            />
            {errors.description &&
              <span role="alert" className="text-red-500">{errors.description.message}</span>
            }
          </div>
          <div>
            <label className="block text-primary-100 text-sm mb-2">Цена</label>
            <NumberInput
              name="price"
              size="lg"
              defaultValue={0}
              ref={priseInputRef}
            />
          </div>

          <div className="mt-6 flex justify-end gap-4">
            {((imageFile?.[0] instanceof File) && !isSubmitting) &&
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setPreviewUrl(null);
                  reset()
                }}
                className="px-6 py-2 border-accent-300 border rounded-full hover:bg-accent-300 hover:text-white text-accent-300 transition-colors"
              >Удалить картинку</button>
            }
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className={`border-2 border-secondary-300 text-secondary-300 px-6 py-2 
                      rounded-full hover:bg-secondary-300 hover:text-white transition-colors
                      ${(isSubmitting || !isValid) ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {isSubmitting ? 'Загрузка...' : 'Сохранить изменения'}
            </button>
          </div>
        </div>
      </form>
      {isOpen &&
        <Notif
          type={type}
        >
          {message}
        </Notif>
      }
    </>
  );
}
