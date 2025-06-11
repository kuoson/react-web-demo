import { useDispatch } from 'react-redux'
import { useKeyPress } from 'ahooks'
import {
  removeSelectedComponent,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
} from '@/store/reducers/questionComponentsSlice'

const isActiveElement = () => {
  if (document.activeElement === document.body) {
    return true
  }

  return false
}

export const useBindCanvasKeyPress = () => {
  const dispatch = useDispatch()

  useKeyPress(['backspace', 'delete'], () => {
    if (!isActiveElement()) {
      return
    }

    dispatch(removeSelectedComponent())
  })

  useKeyPress(['ctrl.c', 'meta.y'], () => {
    if (!isActiveElement()) {
      return
    }

    dispatch(copySelectedComponent())
  })

  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElement()) {
      return
    }

    dispatch(pasteCopiedComponent())
  })

  useKeyPress('uparrow', () => {
    if (!isActiveElement()) {
      return
    }

    dispatch(selectPrevComponent())
  })

  useKeyPress('downarrow', () => {
    if (!isActiveElement()) {
      return
    }

    dispatch(selectNextComponent())
  })
}
