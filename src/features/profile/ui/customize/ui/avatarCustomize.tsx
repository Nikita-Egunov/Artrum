/* eslint-disable @next/next/no-img-element */
"use client";

import { Notif } from "@/shared/components";
import Image from "next/image";
import { useState } from "react";

export default function AvatarCustomize() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [status, setStatus] = useState<'success' | 'error'>('success');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (file: File) => {
    // Проверка типа файла
    if (!file.type.startsWith('image/')) {
      setStatus('error');
      setNotifOpen(true);
      return;
    }

    // Проверка размера (5MB)
    if (file.size > 4 * 1024 * 1024) {
      setStatus('error');
      setNotifOpen(true);
      return;
    }

    setImageFile(file);

    // Создание превью
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!imageFile) return;

    setIsLoading(true);

    try {
      // 1. Создаем FormData и добавляем файл
      const formData = new FormData();
      formData.append('image', imageFile);

      // 2. Отправляем запрос без явного Content-Type
      const response = await fetch('/api/updateUser/updateUserPhoto', {
        method: 'POST',
        credentials: 'include',
        body: formData, // Передаем FormData напрямую
        // Заголовок Content-Type с boundary установится автоматически
      });

      if (!response.ok) throw new Error('Upload failed');

      setStatus('success');
      setNotifOpen(true);
    } catch (error) {
      console.error('Upload failed:', error);
      setStatus('error');
    } finally {
      setNotifOpen(true);
      setIsLoading(false);
      setPreviewUrl('');
      const form = e.target as HTMLFormElement;
      form.reset();
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full p-6 bg-primary-800/40 rounded-xl border border-primary-700">
        <h2 className="text-2xl font-bold text-primary-50 mb-6">Настройка аватара</h2>

        <div className="border-2 border-dashed border-primary-600 rounded-xl p-8 text-center
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
              handleFileChange(e.dataTransfer.files[0]);
            }
          }}>

          {previewUrl ? (
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

          <input
            id="avatar-upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleFileChange(e.target.files[0]);
              }
            }}
          />
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            type="submit"
            disabled={!imageFile || isLoading}
            className={`border-2 border-secondary-300 text-secondary-300 px-6 py-2 
                      rounded-full hover:bg-secondary-300 hover:text-white transition-colors
                      ${(!imageFile || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {isLoading ? 'Загрузка...' : 'Сохранить изменения'}
          </button>
        </div>
      </form>
      {notifOpen &&
        <Notif
          setOnOpen={setNotifOpen}
          type={status}
        >
          {status === 'success' ? 'Успешно изменено' : 'Ошибка. Проверьте формат и размер файла.'}
        </Notif>
      }
    </>
  );
}