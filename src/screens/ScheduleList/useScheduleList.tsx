import { useCallback, useEffect, useState } from 'react'

interface ScheduleListHook {
  isOpenCompleteModal: boolean
  isOpenCancelModal: boolean
  selectedItemId: string | undefined
  handleOpenCompleteModal: (itemId: string | undefined) => void
  handleOpenCancelModal: (itemId: string | undefined) => void
  handleCloseCompleteModal: () => void
  handleCloseCancelModal: () => void
}

function useScheduleList(): ScheduleListHook {
  const [isOpenCompleteModal, setIsOpenCompleteModal] = useState(false)
  const [isOpenCancelModal, setIsOpenCancelModal] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>()

  const handleOpenCompleteModal = useCallback((itemId: string | undefined) => {
    setSelectedItemId(itemId)
    setIsOpenCompleteModal(true)
  }, [])

  const handleOpenCancelModal = useCallback((itemId: string | undefined) => {
    setSelectedItemId(itemId)
    setIsOpenCancelModal(true)
  }, [])

  const handleCloseCompleteModal = useCallback(() => {
    setIsOpenCompleteModal(false)
  }, [])

  const handleCloseCancelModal = useCallback(() => {
    setIsOpenCancelModal(false)
  }, [])

  return {
    isOpenCompleteModal,
    isOpenCancelModal,
    selectedItemId,
    handleOpenCompleteModal,
    handleOpenCancelModal,
    handleCloseCompleteModal,
    handleCloseCancelModal,
  }
}

export { useScheduleList }
