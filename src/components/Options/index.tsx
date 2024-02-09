import { Box, HStack, Pressable, Text } from 'native-base'
import { useState } from 'react'
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form'
import { Keyboard } from 'react-native'
import { CarWashType, ScheduleType } from '../../types/schedule'

type IOption = {
  options: { label: string; value: CarWashType }[]
  value: string
}

export function Options<FormType extends FieldValues>({
  options,
  value,
  control,
  rules,
  name,
}: UseControllerProps<FormType> & IOption) {
  const [washingOption, setWashingOption] = useState<CarWashType>('simple')

  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      render={({ field: { onChange } }) => (
        <Box mt="2">
          {options.map((opt) => (
            <Pressable
              key={opt.value}
              onPress={() => {
                Keyboard.dismiss()
                setWashingOption(opt.value)
                onChange(opt.value)
              }}
            >
              <HStack alignItems="center" m="1">
                <Box
                  width={4}
                  height={4}
                  borderRadius={24}
                  borderWidth={1}
                  borderColor="black"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Box
                    width={2}
                    height={2}
                    borderRadius="full"
                    bgColor={washingOption === opt.value ? 'black' : 'white'}
                  />
                </Box>
                <Text pl="1">{opt.label}</Text>
              </HStack>
            </Pressable>
          ))}
        </Box>
      )}
    />
  )
}
