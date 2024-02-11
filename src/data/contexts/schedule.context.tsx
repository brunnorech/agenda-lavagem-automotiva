import { createContext, useState } from 'react'

import { CarWashType, ScheduleType } from '../../types/schedule'
import { addMinutes, format } from 'date-fns'
import { generateUUID } from '../../utils/randomId'
import { getDefaultHours } from '../../utils/getDefaultHours'

type ScheduleProps = ScheduleType[]

const SIMPLE_WASH_DURATION_IN_MINUTES = 30
const COMPLETE_WASH_DURATION_IN_MINUTES = 30

export type ContextType = {
  schedules: ScheduleProps
  addSchedule: (value: ScheduleType) => void
  removeSchedule: (id: string) => void
  getAvailableHours: (washType: CarWashType, date: Date) => string[]
}

export const ScheduleContext = createContext<ContextType | undefined>(undefined)

export const ScheduleProvider = (props: { children: JSX.Element }) => {
  const [schedules, setSchedules] = useState<ScheduleProps>([])

  const getEndTime = (washingOption: CarWashType, baseTime: string): string => {
    const addedMinutes = {
      simple: SIMPLE_WASH_DURATION_IN_MINUTES,
      complete: COMPLETE_WASH_DURATION_IN_MINUTES,
    }[washingOption]

    const newHour = format(
      addMinutes(new Date(`1970-01-01T${baseTime}`), addedMinutes),
      'HH:mm'
    )
    return newHour
  }

  const addSchedule = (scheduleData: Omit<ScheduleType, 'id' | 'endHour'>) => {
    const newSchedule = {
      ...scheduleData,
      endHour: getEndTime(scheduleData.washingOption, scheduleData.startHour),
      id: generateUUID(32),
    }

    setSchedules((prev) => [...prev, newSchedule])
  }

  const removeSchedule = (scheduleId: string): void => {
    setSchedules((prev) =>
      prev.filter((schedule) => schedule.id !== scheduleId)
    )
  }

  const getNewOptions = (
    availableHours: string[],
    savedHoursToRemove: ScheduleProps,
    washType: CarWashType
  ) => {
    const INDEX_TO_REMOVE_IN_SIMPLE_WASH = -1
    const INDEX_TO_REMOVE_IN_COMPLETE_WASH = -2

    const indexesToRemove = {
      simple: INDEX_TO_REMOVE_IN_SIMPLE_WASH,
      complete: INDEX_TO_REMOVE_IN_COMPLETE_WASH,
    }[washType]

    let new_options = [...availableHours]

    for (const { startHour, endHour } of savedHoursToRemove) {
      const startIndex = new_options.indexOf(startHour) + indexesToRemove
      const endIndex = new_options.indexOf(endHour ?? startHour)

      new_options.splice(startIndex < 0 ? 0 : startIndex, endIndex - startIndex)
    }

    return new_options
  }

  const getAvailableHours = (washType: CarWashType, date: Date): string[] => {
    const daySchedules = schedules.filter((schedule) => {
      const scheduleDate = format(schedule.date, 'yyyy-MM-dd')
      const givenDate = format(date, 'yyyy-MM-dd')

      return scheduleDate === givenDate
    })

    const defaultHours = getDefaultHours('10:00', '17:30', washType)

    if (!daySchedules.length) {
      return defaultHours
    }

    let availableHours = defaultHours

    return getNewOptions(availableHours, daySchedules, washType)
  }

  return (
    <ScheduleContext.Provider
      value={{
        schedules,
        addSchedule,
        removeSchedule,
        getAvailableHours,
      }}
    >
      {props.children}
    </ScheduleContext.Provider>
  )
}
