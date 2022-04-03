import {MotionTypes} from '../Enums/MotionTypes';

export interface ILog {
  id: number;
  movementType: MotionTypes;
  markers: any[];
  km: number;
  coordinates: any[];
}
