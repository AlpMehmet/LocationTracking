import {ILog} from '../../Interfaces/ILog';
import {groupBy} from 'lodash';

export function groupByLogsByMovementType(logs: ILog[]) {
  return groupBy(logs, (log: ILog) => {
    return log.movementType;
  });
}
