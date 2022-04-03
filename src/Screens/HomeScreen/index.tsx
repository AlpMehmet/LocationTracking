import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import BackgroundGeolocation, {
  Location,
  MotionActivityEvent,
  State,
} from 'react-native-background-geolocation';
import TSMapView from '../../Components/TSMapView';
import MovementTypeIconRenderer from '../../Components/MovementTypeIconRenderer';

function HomeScreen() {
  const [location, setLocation] = useState<Location>();
  const [odometer, setOdometer] = useState(0);
  const [freeDriveStatus, setFreeDriveStatus] = useState(false);
  const [motionActivityEvent, setMotionActivityEvent] =
    useState<MotionActivityEvent>(null!);

  const animatedScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animatedScale.setValue(1);

    const locationSubscriber: any = BackgroundGeolocation.onLocation(
      setLocation,
      error => {
        console.warn('[onLocation] ERROR: ', error);
      },
    );

    const activityChangeSubscriber: any =
      BackgroundGeolocation.onActivityChange(setMotionActivityEvent);

    initBackgroundGeolocation();

    return () => {
      activityChangeSubscriber.remove();
      locationSubscriber.remove();
    };
  }, []);

  useEffect(() => {
    if (!location) return;
    setOdometer(location.odometer);
  }, [location]);

  useEffect(() => {
    if (freeDriveStatus) {
      freeDriveAnimate();
    } else {
      animatedScale.stopAnimation();
    }
  }, [freeDriveStatus]);

  const initBackgroundGeolocation = async () => {
    const state: State = await BackgroundGeolocation.ready({
      reset: false,
      debug: true,
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_NAVIGATION,
      distanceFilter: 10,
      stopTimeout: 5,
      locationAuthorizationRequest: 'Always',
      backgroundPermissionRationale: {
        title:
          "Allow {applicationName} to access this device's location even when closed or not in use.",
        message:
          'This app collects location data to enable recording your trips to work and calculate distance-travelled.',
        positiveAction: 'Change to "{backgroundPermissionOptionLabel}"',
        negativeAction: 'Cancel',
      },
      stopOnTerminate: false,
      startOnBoot: true,
      enableHeadless: true,
    });

    setFreeDriveStatus(state.enabled);
    setOdometer(state.odometer);
  };

  useEffect(() => {
    console.log('[motiondetect]', motionActivityEvent);
  }, [motionActivityEvent]);

  function freeDriveAnimate() {
    animatedScale.setValue(0.8);
    Animated.loop(
      Animated.spring(animatedScale, {
        bounciness: 25,
        toValue: 1,
        useNativeDriver: true,
        speed: 11,
      }),
      {iterations: 100},
    ).start();
  }

  const onClickFreeDrive = (value: boolean) => {
    setFreeDriveStatus(value);
    if (value) {
      BackgroundGeolocation.start()
        .then(() => {
          BackgroundGeolocation.changePace(true);
        })
        .catch(() => {
          BackgroundGeolocation.changePace(false);
        });
    } else {
      BackgroundGeolocation.stop();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topElementsContainer}>
        {freeDriveStatus && (
          <Text style={styles.kmText}>{(odometer / 1000).toFixed(1)}km</Text>
        )}
        <Animated.View
          style={[styles.freeDriveView, {transform: [{scale: animatedScale}]}]}>
          <TouchableOpacity
            onPress={() => onClickFreeDrive(!freeDriveStatus)}
            style={[
              styles.freeDriveBt,
              ...[freeDriveStatus && {backgroundColor: '#3EFF9C'}],
            ]}>
            <Text style={styles.freeDriveText}>
              {!freeDriveStatus ? 'Free Driving' : 'Stop'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
        {freeDriveStatus && (
          <View style={styles.driveTypeView}>
            {motionActivityEvent && (
              <MovementTypeIconRenderer
                movementType={motionActivityEvent.activity}
              />
            )}
          </View>
        )}
      </View>
      <TSMapView />
    </SafeAreaView>
  );
}

export default HomeScreen;
