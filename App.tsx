import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RouterStackParamList } from './src/types/routerNavigation'
import { ScheduleList, Schedule, Home } from './src/screens'
import { NativeBaseProvider } from 'native-base'
import { ScheduleProvider } from './src/data/contexts/schedule.context'

const Stack = createNativeStackNavigator<RouterStackParamList>()

export default function App() {
  return (
    <NativeBaseProvider>
      <ScheduleProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ title: 'Início' }}
            />
            <Stack.Screen
              name="Schedule"
              component={Schedule}
              options={{ title: 'Novo Agendamento' }}
            />
            <Stack.Screen
              name="ScheduleList"
              component={ScheduleList}
              options={{ title: 'Agendamentos' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ScheduleProvider>
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
