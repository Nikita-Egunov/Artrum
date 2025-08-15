"use client";

export default function AvatarCustomize() {
  return (
    <div className="max-w-xl w-full h-full max-h-[461px] p-6 bg-primary-800/40 rounded-xl border border-primary-700">
      <h2 className="text-2xl font-bold text-primary-50 mb-6">Настройка аватара</h2>
      
      <div className="border-2 border-dashed border-primary-600 rounded-xl p-8 text-center
                     hover:border-accent-300 transition-colors cursor-pointer group"
           onDragOver={(e) => e.preventDefault()}
           onDrop={(e) => {
             e.preventDefault();
             const file = e.dataTransfer.files[0];
             if (file) {
               // Handle file upload
             }
           }}>
        <div className="mx-auto mb-4 text-accent-300">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
        </div>
        
        <p className="text-primary-100 mb-2">
          Перетащите сюда файл или{' '}
          <label htmlFor="avatar-upload" 
                 className="text-secondary-300 cursor-pointer hover:text-secondary-400">
            выберите
          </label>
        </p>
        <p className="text-primary-200 text-sm">
          Форматы: JPG, PNG, GIF • Макс. размер: 5MB
        </p>
        
        <input
          id="avatar-upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              // Handle file upload
            }
          }}
        />
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <button className="border-2 border-secondary-300 text-secondary-300 px-6 py-2 
                          rounded-full hover:bg-secondary-300 hover:text-white transition-colors">
          Сохранить изменения
        </button>
      </div>

      <p className="text-primary-200 text-sm mt-6 text-center">
        Хотите удалить аватар?{' '}
        <button className="text-secondary-300 hover:text-secondary-400 transition-colors">
          Удалить
        </button>
      </p>
    </div>
  );
}
