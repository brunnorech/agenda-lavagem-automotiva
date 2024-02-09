import React, { useState } from 'react'
import { Box, Text } from 'native-base'
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form'
import DateTimePicker from '@react-native-community/datetimepicker'
import {
  Keyboard,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  Platform,
} from 'react-native'
import { format, formatDate, fromUnixTime } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function DatePicker<FormType extends FieldValues>({
  control,
  name,
}: UseControllerProps<FormType>) {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  const datePickerStyles = {
    width: '100%',
    borderWidth: 1,
    height: 48,
    marginBottom: 16,
    borderColor: '#e5e5e5',
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    alignContent: 'center',
    justifyContent: 'center',
  } as StyleProp<ViewStyle>

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        const formattedDate = format(selectedDate, 'dd/MM/yyyy', {
          locale: ptBR,
        })

        return (
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={datePickerStyles}
          >
            {Platform.OS === 'android' && (
              <Box>
                <Text pl="1">{value ? formattedDate : 'Selecionar data'}</Text>
              </Box>
            )}
            {Platform.OS === 'ios' ? (
              <DateTimePicker
                minimumDate={new Date()}
                style={{ alignSelf: 'flex-start' }}
                value={selectedDate}
                mode="date"
                display="default"
                onChange={(_, date) => {
                  setShowDatePicker(false)
                  setSelectedDate(date ?? new Date())
                  onChange(date)
                  Keyboard.dismiss()
                }}
              />
            ) : (
              <>
                {showDatePicker && (
                  <DateTimePicker
                    minimumDate={new Date()}
                    style={{ alignSelf: 'flex-start' }}
                    value={selectedDate}
                    mode="date"
                    display="default"
                    onChange={(event) => {
                      const timeStamp = event.nativeEvent.timestamp
                      const date = fromUnixTime(timeStamp / 1000)

                      date.setHours(date.getHours() - 3)

                      setShowDatePicker(false)
                      setSelectedDate(date ?? new Date())
                      onChange(date)

                      Keyboard.dismiss()
                    }}
                  />
                )}
              </>
            )}
          </TouchableOpacity>
        )
      }}
    />
  )
}
