"use client";

import { useProfile } from "@/utils";
import { useForm } from "../lib";
import { Notif, PasswordInput } from "@/shared/components";
import { useState } from "react";

export default function NameCustomize() {

  const { profile, loading, error } = useProfile();
  const { handleSubmit, handleInputChange, status, data } = useForm()
  const [notifOpen, setNotifOpen] = useState(false);

  if (loading) return (
    <div className="w-full p-6 flex justify-center items-center bg-primary-800/40 rounded-xl border border-primary-700 space-y-8">
      <span className="w-5 h-5 block border-b border-primary-400 rounded-full animate-spin"></span>
    </div>
  )


  if (error) return (
    <div className="w-full p-6 flex justify-center items-center bg-primary-800/40 rounded-xl border border-primary-700 space-y-8">
      <p className="text-primary-100">Упс, что то упало...</p>
    </div>
  )

  return (
    <>
      <div className="w-full p-6 bg-primary-800/40 rounded-xl border border-primary-700 space-y-8">
        <h2 className="text-2xl font-bold text-primary-50">Изменение данных аккаунта</h2>

        <form noValidate className="space-y-6" onSubmit={(e) => {
          handleSubmit(e)
          setNotifOpen(true)
        }}>
          {/* Name Field */}
          <div>
            <label className="block text-primary-100 text-sm mb-2">Ник - name</label>
            <input
              type="text"
              defaultValue={profile?.name}
              className="w-full px-4 py-3 bg-primary-900 border border-primary-600 rounded-lg
                   focus-visible:outline-none  focus:ring-2 focus:ring-accent-300 focus:border-transparent"
              name="nik"
              onChange={handleInputChange}
            />
            <span></span>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-primary-100 text-sm mb-2">Email</label>
            <input
              type="email"
              defaultValue={profile?.email}
              className="w-full px-4 py-3 bg-primary-900 border border-primary-600 rounded-lg
               focus-visible:outline-none      focus:ring-2 focus:ring-accent-300 focus:border-transparent"
              name="email"
              onChange={handleInputChange}
            />
            <span></span>
          </div>
          <PasswordInput required={false} labelTitle="Новый пароль" autoComplete="new-password webauthn" name="password" placeholder="Введите новый пароль" onChange={handleInputChange} />

          <div className="flex gap-4 justify-end">
            <button className={`border-2 border-secondary-300 text-secondary-300 px-6 py-2 ${Object.keys(data).length === 0 && 'opacity-50 cursor-not-allowed'}
                          rounded-full hover:bg-secondary-300 hover:text-white transition-colors`}>
              Сохранить изменения
            </button>
          </div>
        </form>
      </div>
      {(notifOpen && status) &&
        <Notif
          type={status}
          setOnOpen={setNotifOpen}
        >
          {status === 'success' ? 'Успешно изменено' : 'Ошибка'}
        </Notif>
      }
    </>
  );
}
