import { useEffect, useState } from 'react'
import SkyScreen from './components/common/SkyScreen'
import HomePage from './pages/HomePage'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [])

  return loading ? <SkyScreen /> : <HomePage />
}

export default App
