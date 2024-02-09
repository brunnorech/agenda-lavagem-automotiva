import { Modal } from 'react-native'
import { useRef } from 'react'
import {
  Box,
  Button,
  Center,
  Icon,
  Image,
  Spacer,
  Text,
  VStack,
} from 'native-base'

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
  return (
    <Modal visible={isOpen} animationType="slide">
      <Box flex={1} justifyContent="center" bgColor="coolGray.200" p="4">
        <VStack>
          <Center pb="4" pt="4">
            <Text
              fontSize={24}
              bold
              color={variant === 'sucess' ? 'success.600' : 'error.600'}
            >
              {title}
            </Text>
            <Text mt="4" fontSize={17}>
              {message}
            </Text>
          </Center>
          <Box top="150">
            <VStack>
              <Button
                onPress={onSubmit}
                mb="4"
                colorScheme={variant === 'sucess' ? 'success' : 'error'}
              >
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
