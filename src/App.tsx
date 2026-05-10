import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { HomePage } from './pages/HomePage'
import { ForecastPage } from './pages/ForecastPage'
import { useUIStore } from './store/uiStore'
import { useTranslation } from './i18n'

export default function App() {
  const { locale } = useUIStore()
  const t = useTranslation(locale)

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar t={t} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/forecast" element={<ForecastPage />} />
        </Routes>
      </main>
    </div>
  )
}
