import { FlatList, Box, Heading, Text, Center } from 'native-base'
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
  return (
    <FlatList
      data={data}
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
