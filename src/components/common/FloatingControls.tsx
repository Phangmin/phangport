import ScrollToTopButton from './ScrollToTopButton'
import ThemeToggle from './ThemeToggle'

function FloatingControls() {
  return (
    <div className="fixed bottom-6 right-6 z-20 flex flex-col items-center gap-3 max-md:bottom-5 max-md:right-[18px]">
      <ThemeToggle />
      <ScrollToTopButton />
    </div>
  )
}

export default FloatingControls
