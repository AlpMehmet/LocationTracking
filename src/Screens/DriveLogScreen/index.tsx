import React, {useMemo, useState} from 'react';
import {SafeAreaView, SectionList, Text, View} from 'react-native';
import MapView from 'react-native-maps';
import LogCardComponent from '../../Components/LogCardComponent';
import MovementInfoComponent from '../../Components/MovementInfoComponent';
import TSMapView from '../../Components/TSMapView';
import {MotionTypes} from '../../Enums/MotionTypes';
import {groupByLogsByMovementType} from '../../Helpers/Utils/groupByLogsByMovementType';
import {ILog} from '../../Interfaces/ILog';
import styles from './styles';

const data: ILog[] = [
  {id: 1, movementType: MotionTypes.inVehicle, markers: [], coordinates: []},
  {id: 2, movementType: MotionTypes.onBicycle, markers: [], coordinates: []},
  {id: 3, movementType: MotionTypes.onFoot, markers: [], coordinates: []},
  {id: 4, movementType: MotionTypes.running, markers: [], coordinates: []},
  {id: 5, movementType: MotionTypes.walking, markers: [], coordinates: []},
];

function DriveLogScreen() {
  const [scrollValue, setScrollValue] = useState<number>();
  const [logs, setLogs] = useState<ILog[]>(data);

  const sectionedLogs = groupByLogsByMovementType(logs!);
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
        onScroll={e => {
          setScrollValue(e.nativeEvent.contentOffset.y);
        }}
        renderSectionFooter={({section: {title}}) => (
          <MovementInfoComponent movementType={title} />
        )}
        renderItem={item => (
          <LogCardComponent
            km={25}
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
