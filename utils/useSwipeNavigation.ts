import { useSwipeable, SwipeCallback, SwipeableHandlers } from 'react-swipeable'
import { useRouter } from 'next/router'
import tabs from './tabs'
import { RefObject } from 'react'

enum directions {
  left,
  right,
}

type SwipeNavigationProps = (
  ignore?: RefObject<HTMLElement>[],
) => SwipeableHandlers

const useSwipeNavigation: SwipeNavigationProps = (
  ignore,
): SwipeableHandlers => {
  const configs = {
    delta: 100,
  }
  const router = useRouter()
  const swipeHandler = (direction: directions): SwipeCallback => {
    return (eventData): void => {
      const active = tabs.find((t) => t.path === router.pathname)
      let fromIgnored = false
      ignore?.map((ig) => {
        fromIgnored = eventData.event
          .composedPath()
          .includes(ignore?.[0].current as HTMLElement)
      })
      if (fromIgnored) {
        return
      }
      // ignore?.[0].current?.classList
      const activeIndex = tabs.findIndex((t) => t.id === active?.id)
      let nextIndex
      if (direction === directions.left) {
        nextIndex = activeIndex === tabs.length - 1 ? 0 : activeIndex + 1
      } else {
        nextIndex = activeIndex === 0 ? tabs.length - 1 : activeIndex - 1
      }
      if (!active) {
        if (direction === directions.right) {
          router.back()
        }
        return
      }
      router.push(tabs[nextIndex].path)
    }
  }
  const onSwipedLeft: SwipeCallback = swipeHandler(directions.left)
  const onSwipedRight: SwipeCallback = swipeHandler(directions.right)
  const handlers = useSwipeable({ onSwipedLeft, onSwipedRight, ...configs })

  return handlers
}

export default useSwipeNavigation
