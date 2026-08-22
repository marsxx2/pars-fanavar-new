import { useEffect } from 'react'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import Hero from './components/Hero'
import BridgeDivider from './components/BridgeDivider'
import Services from './components/Services'
import MarketPosition from './components/MarketPosition'
import Advantages from './components/Advantages'
import Contact from './components/Contact'
import Footer from './components/Footer'

function DocumentMeta() {
  const { t } = useLanguage()
  useEffect(() => {
    document.title = t.meta.title
    let desc = document.querySelector('meta[name="description"]')
    if (!desc) {
      desc = document.createElement('meta')
      desc.setAttribute('name', 'description')
      document.head.appendChild(desc)
    }
    desc.setAttribute('content', t.meta.description)
  }, [t])
  return null
}

function Page() {
  return (
    <div className="min-h-screen bg-paper-50 text-ink-950 dark:bg-ink-950 dark:text-paper-50">
      <DocumentMeta />
      <Header />
      <main>
        <Hero />
        <BridgeDivider />
        <Services />
        <MarketPosition />
        <Advantages />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Page />
      </LanguageProvider>
    </ThemeProvider>
  )
}
