"use client";

import { useProfile } from "@/utils";
import { useEffect } from "react";
import { useForm } from "../lib";

export default function NameCustomize() {

  const { profile, loading, error } = useProfile();
  const { handleSubmit, handleInputChange } = useForm()

  if (loading) return (
    <div className="max-w-xl w-full p-6 flex justify-center items-center bg-primary-800/40 rounded-xl border border-primary-700 space-y-8">
      <span className="w-5 h-5 block border-b border-primary-400 rounded-full animate-spin"></span>
    </div>
  )


  if (error) return (
    <div className="max-w-xl w-full p-6 flex justify-center items-center bg-primary-800/40 rounded-xl border border-primary-700 space-y-8">
      <p className="text-primary-100">Упс, что то упало...</p>
    </div>
  )

  return (
    <div className="max-w-xl w-full p-6 bg-primary-800/40 rounded-xl border border-primary-700 space-y-8">
      <h2 className="text-2xl font-bold text-primary-50">Изменение данных аккаунта</h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
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

        {/* Password Field */}
        <div>
          <label className="block text-primary-100 text-sm mb-2">Новый пароль</label>
          <input
            type="password"
            placeholder="Введите новый пароль"
            className="w-full px-4 py-3 bg-primary-900 border border-primary-600 rounded-lg
                focus-visible:outline-none focus:ring-2 focus:ring-accent-300 focus:border-transparent"
            name="password"
            onChange={handleInputChange}

          />
          <span></span>
        </div>

        <div className="flex gap-4 justify-end">
          <button className="border-2 border-secondary-300 text-secondary-300 px-6 py-2 
                          rounded-full hover:bg-secondary-300 hover:text-white transition-colors">
            Сохранить изменения
          </button>
        </div>
      </form>
    </div>
  );
}
