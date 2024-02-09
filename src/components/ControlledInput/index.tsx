import { Input, InputProps } from '../Input'
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form'

export function ControlledInput<FormType extends FieldValues>({
  control,
  name,
  rules,
  ...inputProps
}: UseControllerProps<FormType> & InputProps) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange } }) => (
        <Input onChange={(e) => onChange(e.nativeEvent.text)} {...inputProps} />
      )}
    />
  )
}
