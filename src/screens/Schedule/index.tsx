import * as React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RouterStackParamList } from '../../types/routerNavigation'
import {
  Center,
  Heading,
  VStack,
  Text,
  Button,
  KeyboardAvoidingView,
  ScrollView,
} from 'native-base'
import { Options } from '../../components/Options'
import { Alert, Platform } from 'react-native'

import { useForm } from 'react-hook-form'
import { ControlledInput } from '../../components/ControlledInput'
import { ScheduleType } from '../../types/schedule'
import { DatePicker } from '../../components/DatePicker'
import { TimePicker } from '../../components/TimePicker'
import useScheduleContext from '../../data/hooks/useScheduleContext'
import { isWeekend } from 'date-fns'

type ScheduleScreenProps = NativeStackScreenProps<
  RouterStackParamList,
  'Schedule'
>

type FormDataProps = Omit<ScheduleType, 'id' | 'endHour'>

const VALIDATE_PLATE_REGEX = /^[A-Z]{3}[0-9]{1}[A-Z0-9]{1}[0-9]{2}$/

const DEFAULT_HOUR = new Date().setHours(8, 0, 0)

export const Schedule = ({ navigation }: ScheduleScreenProps): JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormDataProps>({
    mode: 'onChange',
    defaultValues: {
      date: new Date(),
      washingOption: 'simple',
    },
  })

  const { addSchedule, getAvailableHours } = useScheduleContext()

  function handleAddSchedule(data: FormDataProps) {
    if (isWeekend(data.date)) {
      return Alert.alert(
        'Atenção',
        'Horário de funcionamento de segunda a sexta',
        [
          {
            text: 'Voltar',
          },
        ]
      )
    }

    if (!data.startHour) {
      return Alert.alert('Atenção', 'Selecione um horário', [
        {
          text: 'Voltar',
        },
      ])
    }

    addSchedule(data)

    Alert.alert('Agendamento cadastrado', 'Agendamento feito com sucesso', [
      {
        text: 'Voltar',
        onPress: () => navigation.navigate('Home'),
      },
    ])
  }

  const whasingOption = watch('washingOption')
  const date = watch('date')

  return (
    <ScrollView>
      <Heading fontSize="xl" p="4" pb="3">
        Agendar horario
      </Heading>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
      >
        <VStack padding={4}>
          <Center>
            <Text alignSelf="flex-start" mb="1">
              Placa
            </Text>
            <ControlledInput
              name="licensePlate"
              placeholder="PLACA DO VEICULO"
              autoCapitalize="characters"
              maxLength={7}
              control={control}
              errorMessage={errors.licensePlate?.message}
              rules={{
                required: 'Campo obrigatório',
                pattern: {
                  value: VALIDATE_PLATE_REGEX,
                  message: 'Placa inválida',
                },
              }}
            />
            <Text alignSelf="flex-start" mb="1">
              Data
            </Text>
            <DatePicker
              name="date"
              control={control}
              rules={{ required: 'Campo obrigatório' }}
            />
          </Center>
          <Text fontSize={'md'} bold>
            Opções de limpeza
          </Text>
          <Options
            name="washingOption"
            control={control}
            value={whasingOption}
            rules={{ required: 'Campo obrigatório' }}
            options={[
              { label: 'Simples', value: 'simple' },
              { label: 'Completa', value: 'complete' },
            ]}
          />
          <Text fontSize={'md'} bold alignSelf="flex-start" m="2">
            Horarios disponíveis
          </Text>
          <TimePicker
            name="startHour"
            control={control}
            options={getAvailableHours(whasingOption, date)}
          />

          <Button
            mt="12"
            colorScheme={'success'}
            onPress={handleSubmit(handleAddSchedule)}
          >
            CADASTRAR AGENDAMENTO
          </Button>
        </VStack>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}
