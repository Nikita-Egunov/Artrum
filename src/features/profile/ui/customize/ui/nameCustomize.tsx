"use client";

import { useProfile } from "@/utils";

export default function NameCustomize() {

  const { profile, loading, error } = useProfile();
  console.log(profile);
  console.log(loading);
  console.log(error);

  return (
    <div className="max-w-xl w-full p-6 max-h-[461px] bg-primary-800/40 rounded-xl border border-primary-700 space-y-8">
      <h2 className="text-2xl font-bold text-primary-50">Изменение данных аккаунта</h2>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        {/* Name Field */}
        <div>
          <label className="block text-primary-100 text-sm mb-2">Имя и фамилия</label>
          <input
            type="text"
            defaultValue="Никита Егунов"
            className="w-full px-4 py-3 bg-primary-900 border border-primary-600 rounded-lg
                   focus-visible:outline-none  focus:ring-2 focus:ring-accent-300 focus:border-transparent"
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-primary-100 text-sm mb-2">Email</label>
          <input
            type="email"
            defaultValue="nikita@artrum.com"
            className="w-full px-4 py-3 bg-primary-900 border border-primary-600 rounded-lg
               focus-visible:outline-none      focus:ring-2 focus:ring-accent-300 focus:border-transparent"
          />
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-primary-100 text-sm mb-2">Новый пароль</label>
          <input
            type="password"
            placeholder="Введите новый пароль"
            className="w-full px-4 py-3 bg-primary-900 border border-primary-600 rounded-lg
                focus-visible:outline-none focus:ring-2 focus:ring-accent-300 focus:border-transparent"
          />
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
