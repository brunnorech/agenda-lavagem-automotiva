import { IInputProps, FormControl, Input as NBInput } from 'native-base'

export type InputProps = IInputProps & {
  errorMessage?: string
}

export const Input = ({
  errorMessage,
  isInvalid,
  ...inputProps
}: InputProps) => {
  const invalidField = Boolean(errorMessage ?? isInvalid)
  return (
    <FormControl mb={4} isInvalid={invalidField}>
      <NBInput
        bgColor="white"
        fontSize="md"
        h={12}
        _focus={{
          borderColor: 'green.500',
          borderWidth: 1,
          bgColor: 'white',
        }}
        {...inputProps}
      />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  )
}
