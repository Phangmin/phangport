import { useLocation } from 'react-router-dom'
import GuestbookAdminButton from './GuestbookAdminButton'
import ScrollToTopButton from './ScrollToTopButton'
import ThemeToggle from './ThemeToggle'

function FloatingControls() {
  const location = useLocation()
  const isGuestbookPage = location.pathname === '/guestbook'

  return (
    <div className="fixed bottom-6 right-6 z-20 hidden flex-col items-center gap-3 md:flex">
      {isGuestbookPage ? <GuestbookAdminButton /> : null}
      <ThemeToggle />
      <ScrollToTopButton />
    </div>
  )
}

export default FloatingControls
