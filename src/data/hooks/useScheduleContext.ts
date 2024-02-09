import {  useContext } from "react";
import { ContextType, ScheduleContext } from "../contexts/schedule.context";


const useScheduleContext = () => useContext(ScheduleContext) as ContextType;

export default useScheduleContext;