import React, { useState } from 'react'
import { HStack, Pressable, Text, Box, ScrollView } from 'native-base'
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form'

type TimePickerProps = {
  options?: string[]
}

export function TimePicker<FormType extends FieldValues>({
  options,
  name,
  control,
}: UseControllerProps<FormType> & TimePickerProps) {
  const [selectedHour, setSelectedHour] = useState('')
  return (
    <ScrollView
      h="24"
      borderWidth="1"
      p="1"
      borderRadius="md"
      borderColor="purple.300"
    >
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <HStack flexWrap="wrap" p="1">
            {(options ?? []).map((hour: string, index) => (
              <Box mb="2" key={index}>
                <Pressable
                  bgColor={hour === selectedHour ? 'purple.600' : 'gray.500'}
                  color="white"
                  w="48px"
                  h="auto"
                  borderRadius="full"
                  alignItems="center"
                  mr="4"
                  onPress={() => {
                    setSelectedHour(hour)
                    onChange(hour)
                  }}
                >
                  <Text color="white">{hour}</Text>
                </Pressable>
              </Box>
            ))}
          </HStack>
        )}
      />
    </ScrollView>
  )
}
