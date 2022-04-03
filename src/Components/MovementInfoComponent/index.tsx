import React from 'react';
import {View} from 'react-native';
import MovementTypeIconRenderer from '../MovementTypeIconRenderer';
import styles from './styles';

interface MovementInfoComponentProps {
  movementType: string;
}
function MovementInfoComponent({movementType}: MovementInfoComponentProps) {
  return (
    <View style={styles.mainContainer}>
      <View style={[styles.lineStyle, {left: 0}]} />
      <View style={styles.container}>
        <MovementTypeIconRenderer movementType={movementType} />
      </View>
      <View style={[styles.lineStyle, {right: 0}]} />
    </View>
  );
}
export default MovementInfoComponent;
