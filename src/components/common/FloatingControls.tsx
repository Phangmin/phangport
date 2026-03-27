import ScrollToTopButton from './ScrollToTopButton'
import ThemeToggle from './ThemeToggle'

function FloatingControls() {
  return (
    <div className="fixed bottom-6 right-6 z-20 hidden flex-col items-center gap-3 md:flex">
      <ThemeToggle />
      <ScrollToTopButton />
    </div>
  )
}

export default FloatingControls
