/* eslint-disable @next/next/no-img-element */
"use client";

import { Notif } from "@/shared/components";
import { useState } from "react";

export default function AddAft() {
  const [imageFileAft, setImageFileAft] = useState<File | null>(null);
  const [previewUrlAft, setPreviewUrlAft] = useState('');
  const [notifOpenAft, setNotifOpenAft] = useState(false);
  const [statusAft, setStatusAft] = useState<'success' | 'error'>('success');
  const [isLoadingAft, setIsLoadingAft] = useState(false);
  const [formDataAft, setFormDataAft] = useState<{ [key: string]: string }>({})
  const handleFileChangeAft = (file: File) => {
    // Проверка типа файла
    if (!file.type.startsWith('image/')) {
      setStatusAft('error');
      setNotifOpenAft(true);
      return;
    }

    // Проверка размера (5MB)
    if (file.size > 4 * 1024 * 1024) {
      setStatusAft('error');
      setNotifOpenAft(true);
      return;
    }

    setImageFileAft(file);

    // Создание превью
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrlAft(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  async function handleSubmitAft(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!imageFileAft) return;

    const form = e.target as HTMLFormElement;

    const inputs = form.querySelectorAll('input');

    inputs.forEach((inp) => {
      if (inp.name) {
        setFormDataAft((prev) => ({ ...prev, [inp.name]: inp.value }));
      }
    })
    setIsLoadingAft(true);


    try {
      // 1. Создаем FormData и добавляем файл
      const formData = new FormData();
      formData.append('image', imageFileAft);

      // 2. Отправляем запрос без явного Content-Type
      const response = await fetch('/api/updateUser/updateUserPhoto', {
        method: 'POST',
        credentials: 'include',
        body: formData, // Передаем FormData напрямую
        // Заголовок Content-Type с boundary установится автоматически
      });

      if (!response.ok) throw new Error('Upload failed');

      setStatusAft('success');
      setNotifOpenAft(true);
    } catch (error) {
      console.error('Upload failed:', error);
      setStatusAft('error');
    } finally {
      setNotifOpenAft(true);
      setIsLoadingAft(false);
      setPreviewUrlAft('');
      const form = e.target as HTMLFormElement;
      form.reset();
    }
  }

  return (
    <>
      <form onSubmit={handleSubmitAft} className="p-6 bg-primary-800/40 rounded-xl border border-primary-700 space-y-6">
        <h2 className="text-2xl font-bold text-primary-50">Добавить новую AFT</h2>

        <div className="border-2 border-dashed border-primary-600 rounded-xl p-6 text-center
                     hover:border-accent-300 transition-colors cursor-pointer group"
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
              handleFileChangeAft(e.dataTransfer.files[0]);
            }
          }}>
          {previewUrlAft ? (
            <div className="mb-4">
              <img
                src={previewUrlAft}
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
            </>
          )}
          <input
            id="aft-upload"
            type="file"
            className="hidden"
            accept="image/*"
            name="image"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleFileChangeAft(e.target.files[0]);
              }
            }}
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-primary-100 text-sm mb-2">Название товара</label>
            <input
              name="name"
              type="text"
              className="w-full px-4 py-3 bg-primary-900 border border-primary-600 rounded-lg
                     focus:ring-2 focus:ring-accent-300 focus:border-transparent"
              placeholder="Введите название"
            />
          </div>

          <div>
            <label className="block text-primary-100 text-sm mb-2">Описание</label>
            <textarea
              className="w-full px-4 py-3 bg-primary-900 border border-primary-600 rounded-lg
                     focus:ring-2 focus:ring-accent-300 focus:border-transparent h-32"
              placeholder="Добавьте описание товара"
              name="description"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="submit"
              disabled={!imageFileAft || isLoadingAft}
              className={`border-2 border-secondary-300 text-secondary-300 px-6 py-2 
                      rounded-full hover:bg-secondary-300 hover:text-white transition-colors
                      ${(!imageFileAft || isLoadingAft) ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {isLoadingAft ? 'Загрузка...' : 'Сохранить изменения'}
            </button>
          </div>
        </div>
      </form>
      {/* {notifOpenAft &&
        <Notif
          setOnOpen={setNotifOpenAft}
          type={statusAft}
        >
          {statusAft === 'success' ? 'Успешно изменено' : 'Ошибка. Проверьте формат и размер файла.'}
        </Notif>
      } */}
    </>
  );
}
