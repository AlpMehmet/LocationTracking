import {ILog} from '../../Interfaces/ILog';

export interface AppContextProps {
  logs: ILog[];
  setLogs: (logList: ILog[]) => void;
}
