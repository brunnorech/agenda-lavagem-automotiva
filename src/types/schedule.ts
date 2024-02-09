export type CarWashType = 'simple' | 'complete'

export type ScheduleType = {
  id?: string;
  licensePlate: string
  date: Date;
  startHour: string;
  endHour?: string;
  washingOption: CarWashType
}
