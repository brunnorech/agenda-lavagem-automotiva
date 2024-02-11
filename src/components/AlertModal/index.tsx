import { Modal } from 'react-native'
import { Box, Button, Center, Text, VStack } from 'native-base'

type ConfirmModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  title: string
  message: string
  actionLabel: string
  cancelLabel: string
  variant: 'sucess' | 'cancel'
}

export const AlertModal = ({
  isOpen = false,
  onClose,
  onSubmit,
  title,
  message,
  actionLabel,
  cancelLabel,
  variant,
}: ConfirmModalProps) => {
  const color = {
    sucess: 'success.600',
    cancel: 'error.600',
  }[variant]

  const colorScheme = {
    sucess: 'success',
    cancel: 'error',
  }[variant]

  return (
    <Modal visible={isOpen} animationType="slide">
      <Box flex={1} justifyContent="center" bgColor="coolGray.200" p="4">
        <VStack>
          <Center pb="4" pt="4">
            <Text fontSize={24} bold color={color}>
              {title}
            </Text>
            <Text mt="4" fontSize={17}>
              {message}
            </Text>
          </Center>
          <Box top="150">
            <VStack>
              <Button onPress={onSubmit} mb="4" colorScheme={colorScheme}>
                {actionLabel.toUpperCase()}
              </Button>
              <Button variant="ghost" colorScheme="primary" onPress={onClose}>
                {cancelLabel.toUpperCase()}
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </Modal>
  )
}
