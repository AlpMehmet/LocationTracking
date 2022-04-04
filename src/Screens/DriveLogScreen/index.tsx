import React, {useContext, useEffect, useMemo, useState} from 'react';
import {SafeAreaView, SectionList} from 'react-native';
import {AppContext} from '../../../App';
import LogCardComponent from '../../Components/LogCardComponent';
import MovementInfoComponent from '../../Components/MovementInfoComponent';
import {groupByLogsByMovementType} from '../../Helpers/Utils/groupByLogsByMovementType';
import {ILog} from '../../Interfaces/ILog';
import styles from './styles';

function DriveLogScreen() {
  const appContext = useContext(AppContext);

  const [logs, setLogs] = useState<ILog[]>(appContext.logs);

  const sectionedLogs = groupByLogsByMovementType(logs!);

  useEffect(() => {
    setLogs(appContext.logs);
  }, [appContext.logs]);

  const memorizedLogList = useMemo(() => {
    return (
      <SectionList
        sections={
          sectionedLogs &&
          Object.keys(sectionedLogs).map(val => ({
            title: val,
            data: [...sectionedLogs[val]],
          }))
        }
        inverted={true}
        renderSectionFooter={({section: {title}}) => (
          <MovementInfoComponent movementType={title} />
        )}
        renderItem={item => (
          <LogCardComponent
            km={item.item.km}
            markers={item.item.markers}
            coordinates={item.item.coordinates}
          />
        )}
        keyExtractor={(_item: ILog, index: number): string => index.toString()}
      />
    );
  }, []);
  return (
    <SafeAreaView style={styles.container}>{memorizedLogList}</SafeAreaView>
  );
}

export default DriveLogScreen;
