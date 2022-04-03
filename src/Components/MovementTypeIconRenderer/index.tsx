import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {MotionTypes} from '../../Enums/MotionTypes';

interface MovementTypeIconRendererProps {
  movementType: string;
}
function MovementTypeIconRenderer({
  movementType,
}: MovementTypeIconRendererProps) {
  switch (movementType) {
    case MotionTypes.inVehicle:
      return <Ionicons name="car-sport-sharp" color={'#000000'} size={35} />;
    case MotionTypes.onBicycle:
      return <Ionicons name="md-bicycle-outline" color={'#000000'} size={35} />;
    case MotionTypes.onFoot:
      return <Ionicons name="bus-sharp" color={'#000000'} size={35} />;
    case MotionTypes.running:
      return <FontAwesome5 name="running" color={'#000000'} size={35} />;
    case MotionTypes.still:
      return (
        <MaterialCommunityIcons
          name="human-non-binary"
          color={'#000000'}
          size={35}
        />
      );
    case MotionTypes.walking:
      return <Ionicons name="md-walk-outline" color={'#000000'} size={35} />;
    default:
      return <Ionicons name="md-walk-outline" color={'#000000'} size={35} />;
  }
}
export default MovementTypeIconRenderer;
