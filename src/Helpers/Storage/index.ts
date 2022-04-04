import AsyncStorage from '@react-native-async-storage/async-storage';
import {ILog} from '../../Interfaces/ILog';

async function getLogList(): Promise<any> {
  return await AsyncStorage.getItem('ILog');
}
async function setLogList(list: ILog[]) {
  await AsyncStorage.setItem('ILog', JSON.stringify(list));
}

export {getLogList, setLogList};
