/* eslint-disable @next/next/no-img-element */
"use client";

import { useGetProfileQuery } from "@/shared";
import { Notif } from "@/shared/components";
import { RootState } from "@/shared/redux";
import { openNotif } from "@/shared/redux/slices/notifSlice";
import { convertToBase64 } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import z, { boolean, object } from "zod";


export default function AvatarCustomize() {
  const dispatch = useDispatch();
  const { isOpen, message, redirectUrl, type } = useSelector((state: RootState) => state.notif);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const imageSchema = z.object({
    image: z
      .instanceof(globalThis.FileList, { message: 'Загрузите изображение' })
      .refine((files) => files.length === 1, 'Только одино изображение')
      .refine((files) => files[0].size <= 4 * 1024 * 1024, "Размер изображения не должен превышать 4 МБ")
      .refine((files) => ["image/jpeg", "image/png", "image/webp"].includes(files[0].type))
  })

  type ImageSchema = z.infer<typeof imageSchema>

  const {
    handleSubmit,
    formState: { dirtyFields, errors },
    register,
    watch,
    setValue,
    reset
  } = useForm<ImageSchema>({
    resolver: zodResolver(imageSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  })

  const imageFile = watch("image") as FileList

  const onSubmit = (data: ImageSchema) => {
    console.log(data);

    const formData = new FormData();

    formData.append("image", data.image[0]);
    setIsSubmitting(true)

    fetch('/api/updateUser/updateUserPhoto', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("");
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

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full p-6 bg-primary-800/40 rounded-xl border border-primary-700">
        <h2 className="text-2xl font-bold text-primary-50 mb-6">Настройка аватара</h2>

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
                <label htmlFor="avatar-upload"
                  className="text-secondary-300 cursor-pointer hover:text-secondary-400">
                  выберите
                </label>
              </p>
            </>
          )}

          <p className="text-primary-200 text-sm">
            Форматы: JPG, PNG • Макс. размер: 4MB
          </p>

          {errors.image &&
            <span className="text-red-500 block">{errors.image.message}</span>
          }

          <input
            id="avatar-upload"
            type="file"
            className="hidden"
            accept="image/*"
            {...register("image")}
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
            >Удалить</button>
          }
          <button
            type="submit"
            disabled={!(imageFile?.[0] instanceof File) || isSubmitting || Boolean(errors.image)}
            className={`border-2 border-secondary-300 text-secondary-300 px-6 py-2 
                      rounded-full hover:bg-secondary-300 hover:text-white transition-colors
                      ${(!(imageFile?.[0] instanceof File) || isSubmitting || Boolean(errors.image)) ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {isSubmitting ? 'Загрузка...' : 'Сохранить изменения'}
          </button>
        </div>
      </form >
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
