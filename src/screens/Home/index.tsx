import * as React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RouterStackParamList } from '../../types/routerNavigation';
import { Text, TouchableOpacity } from 'react-native';
import { VStack, Heading, Center, Button } from 'native-base';

type HomeScreenProps = NativeStackScreenProps<RouterStackParamList, 'Home'>;

export const Home = ({ navigation }: HomeScreenProps): JSX.Element => {
  return (
    <VStack bgColor="gray.200" flex={1}>
        <Center>
            <Heading my={24} textAlign={'center'}>Bem vindo ao sistema de agendamento</Heading>

            <Button onPress={() => navigation.navigate('Schedule')}>
                 AGENDAR LAVAGEM AUTOMOTIVA
            </Button>

            <Button onPress={() => navigation.navigate('ScheduleList')} marginTop={8}>
                 LISTAR AGENDAMENTOS
            </Button>
        </Center>
    </VStack>
  );
};
