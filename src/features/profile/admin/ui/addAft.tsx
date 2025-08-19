"use client";

export default function AddAft() {
  return (
    <div className="p-6 bg-primary-800/40 rounded-xl border border-primary-700 space-y-6">
      <h2 className="text-2xl font-bold text-primary-50">Добавить новый товар</h2>

      <div className="border-2 border-dashed border-primary-600 rounded-xl p-6 text-center
                     hover:border-accent-300 transition-colors cursor-pointer group"
           onDragOver={(e) => e.preventDefault()}
           onDrop={(e) => e.preventDefault()}>
        <div className="mx-auto mb-4 text-accent-300">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
        </div>
        <p className="text-primary-100">
          Перетащите изображение или{' '}
          <label htmlFor="product-image" className="text-secondary-300 cursor-pointer hover:text-secondary-400">
            выберите файл
          </label>
        </p>
        <input
          id="product-image"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => e.target.files?.[0]}
        />
      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-primary-100 text-sm mb-2">Название товара</label>
          <input
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
          />
        </div>

        <div className="flex justify-end gap-4">
          <button className="border-2 border-secondary-300 text-secondary-300 px-6 py-2 
                          rounded-full hover:bg-secondary-300 hover:text-white transition-colors">
            Сбросить
          </button>
          <button className="bg-accent-300 text-white px-6 py-2 rounded-full 
                          hover:bg-accent-400 transition-colors">
            Добавить товар
          </button>
        </div>
      </form>
    </div>
  );
}
