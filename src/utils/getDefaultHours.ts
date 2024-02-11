import { CarWashType } from "../types/schedule";

const LUNCH_HOURS = ['12:00', '12:15', '12:30', '12:45', '13:00', '11:45'];
const RANGE_MINUTES = 15;

export const getDefaultHours = (startTime: string, endTime: string, washType: CarWashType) => {

    const HOURS_NOT_AVAILABLE_IN_COMPLETE_TYPE = {
      complete: ['11:30', '17:30'],
      simple: []
    }[washType] as string[]

    const options = [];
    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);
  
    let currentTime = new Date(start);
  
    while (currentTime <= end) {
      const formattedTime = currentTime.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });
  
      options.push(formattedTime);
      currentTime.setMinutes(currentTime.getMinutes() + RANGE_MINUTES);
    }
  
    return options.filter(option => !LUNCH_HOURS.includes(option)).filter((option: string) => !HOURS_NOT_AVAILABLE_IN_COMPLETE_TYPE.includes(option));
  };