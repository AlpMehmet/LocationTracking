import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
      return <Ionicons name="md-walk-outline" color={'#000000'} size={35} />;
    case MotionTypes.running:
      return <Ionicons name="md-walk-outline" color={'#000000'} size={35} />;
    default:
      return <Ionicons name="md-walk-outline" color={'#000000'} size={35} />;
  }
}
export default MovementTypeIconRenderer;
