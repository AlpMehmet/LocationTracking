import {MotionTypes} from '../Enums/MotionTypes';

export interface ILog {
  id: number;
  movementType: MotionTypes;
  markers: any[];
  coordinates: any[];
}
