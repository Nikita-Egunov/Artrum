export default function Footer() {
  return (
    <footer className="artrum-gradient-300 border-t border-app-dashed">
      <div className="container px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bgp-gradient-to-r from-accent-400 to-secondary-300 
                          bg-clip-text text-transparent">
              Artrum
            </h3>
            <p className="text-primary-100 text-sm">
              Redefining e-commerce through curated excellence since 2023
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-primary-50 font-semibold mb-3">Магазин</h4>
            <nav className="flex flex-col space-y-2">
              <a href="/products" className="text-primary-100 hover:text-secondary-300 transition-colors">Все товары</a>
              <a href="/new" className="text-primary-100 hover:text-secondary-300 transition-colors">Новинки</a>
              <a href="/sale" className="text-primary-100 hover:text-secondary-300 transition-colors">Распродажа</a>
            </nav>
          </div>
          {/* Legal */}
          <div className="space-y-2">
            <h4 className="text-primary-50 font-semibold mb-3">Правовая информация</h4>
            <nav className="flex flex-col space-y-2">
              <a href="/privacy" className="text-primary-100 hover:text-secondary-300 transition-colors">Конфиденциальность</a>
              <a href="/terms" className="text-primary-100 hover:text-secondary-300 transition-colors">Условия использования</a>
              <a href="/contacts" className="text-primary-100 hover:text-secondary-300 transition-colors">Контакты</a>
            </nav>
          </div>
        </div>

        <div className="border-t border-app-dashed mt-12 pt-8 text-center text-primary-200">
          <p>© 2023 Artrum. Все права защищены</p>
        </div>
      </div>
    </footer>
  )
}
