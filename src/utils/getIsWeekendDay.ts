import { getDay } from "date-fns";

const SUNDEY_CODE = 0;
const SATURDAY_CODE = 6;

export const isWeekend = (date: Date) => {
    const dayOfWeek = getDay(date);
    return dayOfWeek === SUNDEY_CODE|| dayOfWeek === SATURDAY_CODE;
  };