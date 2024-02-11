import { FlatList } from 'native-base'
import { ListItem } from '../ListItem'
import { ScheduleType } from '../../types/schedule'

type ListProps = {
  data?: ScheduleType[]
  onCompleteSchedule: (id: string | undefined) => void
  onCancelSchedule: (id: string | undefined) => void
}

export const List = ({
  data,
  onCompleteSchedule,
  onCancelSchedule,
}: ListProps) => {
  const compareStartHours = (a: ScheduleType, b: ScheduleType) => {
    const hourA = Number(a.startHour.substring(0, 2))
    const hourB = Number(b.startHour.substring(0, 2))

    return hourA - hourB
  }

  const sortedData = (data ?? []).sort(compareStartHours)

  return (
    <FlatList
      data={sortedData}
      padding={4}
      renderItem={({ item }) => (
        <ListItem
          data={item}
          key={JSON.stringify(item.id ?? item)}
          onCompleteSchedule={() => onCompleteSchedule?.(item.id)}
          onCancelSchedule={() => onCancelSchedule?.(item.id)}
        />
      )}
      keyExtractor={(item) => JSON.stringify(item.id ?? item)}
    />
  )
}
