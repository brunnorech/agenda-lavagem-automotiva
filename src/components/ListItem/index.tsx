import { Box, HStack, VStack, Spacer, Text, Button } from 'native-base'
import { ScheduleType } from '../../types/schedule'
import { format } from 'date-fns'

type ListItemProps = {
  data: ScheduleType
  onCompleteSchedule?: () => void
  onCancelSchedule?: () => void
}

export const ListItem = ({
  data,
  onCompleteSchedule,
  onCancelSchedule,
}: ListItemProps) => {
  const washTypeLabel = {
    simple: 'Simples',
    complete: 'Completa',
  }[data.washingOption]

  const itemSchema = [
    {
      label: 'Placa:',
      value: data.licensePlate,
    },
    {
      label: 'Lavagem:',
      value: washTypeLabel,
    },
    {
      label: 'Data:',
      value: format(data.date, 'dd/MM/yyyy'),
    },
    {
      label: 'Hora:',
      value: data.startHour,
    },
  ]

  return (
    <Box
      borderBottomWidth="1"
      _dark={{
        borderColor: 'muted.50',
      }}
      borderColor="muted.800"
      pl={['0', '4']}
      pr={['0', '5']}
      py="2"
    >
      <HStack space={[2, 3]} justifyContent="space-between">
        <VStack>
          {itemSchema.map((item) => (
            <HStack key={item.value}>
              <Text
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200',
                }}
                bold
              >
                {item.label}
              </Text>
              <Text
                _dark={{
                  color: 'warmGray.50',
                }}
                color="coolGray.800"
                bold
                pl="1"
              >
                {item.value}
              </Text>
            </HStack>
          ))}
        </VStack>
        <Spacer />
        <HStack alignItems="center">
          <Button
            bgColor="success.600"
            height={12}
            mr="6"
            onPress={onCompleteSchedule}
          >
            Concluir
          </Button>
          <Button bgColor="error.600" height={12} onPress={onCancelSchedule}>
            Cancelar
          </Button>
        </HStack>
      </HStack>
    </Box>
  )
}
