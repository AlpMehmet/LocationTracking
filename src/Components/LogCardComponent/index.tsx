import React from 'react';
import {Text, View} from 'react-native';
import TSMapView from '../TSMapView';
import styles from './styles';

interface LogCardComponentProps {
  km: string;
  markers: any[];
  coordinates: any[];
}
function LogCardComponent({km, markers, coordinates}: LogCardComponentProps) {
  return (
    <View style={styles.logItem}>
      <View style={styles.kmView}>
        <Text style={styles.km}>{km}km</Text>
      </View>
      <View style={styles.mapView}>
        <TSMapView markersP={markers} coordinatesP={coordinates} />
      </View>
    </View>
  );
}
export default LogCardComponent;
