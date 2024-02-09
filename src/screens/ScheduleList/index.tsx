import * as React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RouterStackParamList } from '../../types/routerNavigation'
import { List } from '../../components/List'
import { Box, Center, Heading, Text } from 'native-base'
import { useScheduleList } from './useScheduleList'
import { AlertModal } from '../../components/AlertModal'
import useScheduleContext from '../../data/hooks/useScheduleContext'

type ScheduleListScreenProps = NativeStackScreenProps<
  RouterStackParamList,
  'ScheduleList'
>

export const ScheduleList = ({
  navigation,
}: ScheduleListScreenProps): JSX.Element => {
  const {
    handleOpenCancelModal,
    handleCloseCancelModal,
    //
    handleOpenCompleteModal,
    handleCloseCompleteModal,
    //
    isOpenCompleteModal,
    isOpenCancelModal,

    selectedItemId,
  } = useScheduleList()

  const { schedules, removeSchedule } = useScheduleContext()

  const handleFinishSchedule = (callback: Function) => {
    if (selectedItemId) {
      removeSchedule(selectedItemId)
    }

    callback()
  }

  if (!schedules?.length) {
    return (
      <Center h="full">
        <Text color="error.500" bold fontSize="lg">
          Não há agendamentos no momento
        </Text>
      </Center>
    )
  }

  return (
    <Box>
      <Heading fontSize="xl" p="4" pb="3">
        Lista de agendamentos
      </Heading>
      {isOpenCompleteModal && (
        <AlertModal
          title="Confirmar agendamento"
          actionLabel="Confirmar"
          cancelLabel="Fechar"
          isOpen={isOpenCompleteModal}
          message="voce deseja confirmar o agendamento ?"
          onClose={handleCloseCompleteModal}
          onSubmit={() => {
            handleFinishSchedule(handleCloseCompleteModal)
          }}
          variant="sucess"
        />
      )}

      {isOpenCancelModal && (
        <AlertModal
          title="Cancelar agendamento"
          actionLabel="Confirmar cancelamento"
          cancelLabel="Fechar"
          isOpen={isOpenCancelModal}
          message="voce deseja cancelar o agendamento ?"
          onClose={handleCloseCancelModal}
          onSubmit={() => handleFinishSchedule(handleCloseCancelModal)}
          variant="cancel"
        />
      )}

      <List
        data={schedules}
        onCancelSchedule={handleOpenCancelModal}
        onCompleteSchedule={handleOpenCompleteModal}
      />
    </Box>
  )
}
