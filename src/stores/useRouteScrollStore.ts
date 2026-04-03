import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type RouteScrollState = {
  positions: Record<string, number>
  setScrollPosition: (pathname: string, top: number) => void
}

const useRouteScrollStore = create<RouteScrollState>()(
  persist(
    (set) => ({
      positions: {},
      setScrollPosition: (pathname, top) =>
        set((state) => ({
          positions: {
            ...state.positions,
            [pathname]: Math.max(0, Math.round(top)),
          },
        })),
    }),
    {
      name: 'phangport-route-scroll',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)

export default useRouteScrollStore
