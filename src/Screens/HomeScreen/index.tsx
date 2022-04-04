import React, {useContext, useEffect, useRef, useState} from 'react';
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
import {setLogList} from '../../Helpers/Storage';
import {AppContext} from '../../../App';
import {ILog} from '../../Interfaces/ILog';
import uuid from 'react-native-uuid';
import {MotionTypes} from '../../Enums/MotionTypes';

function HomeScreen() {
  const appContext = useContext(AppContext);

  const [location, setLocation] = useState<Location>();
  const [odometer, setOdometer] = useState(0);
  const [freeDriveStatus, setFreeDriveStatus] = useState(false);
  const [coordinates, setCoordinates] = useState<any[]>(null!);
  const [markers, setMarkers] = useState<any[]>(null!);
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

  function clearData() {
    setMarkers([]);
    setCoordinates([]);
    setOdometer(0);
  }

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
      const tempData: ILog = {
        id: uuid.v4(),
        movementType: motionActivityEvent?.activity
          ? motionActivityEvent.activity
          : MotionTypes.still,
        markers,
        km: (odometer / 1000).toFixed(1),
        coordinates,
      };
      setLogList(appContext.logs ? [...appContext.logs, tempData] : [tempData]);
      appContext.setLogs(
        appContext.logs ? [...appContext.logs, tempData] : [tempData],
      );
      clearData();
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
                movementType={
                  motionActivityEvent?.activity
                    ? motionActivityEvent.activity
                    : MotionTypes.still
                }
              />
            )}
          </View>
        )}
      </View>
      <TSMapView
        getMarkers={(markers: any[]) => setMarkers(markers)}
        getCoordinates={(coordinates: any[]) => setCoordinates(coordinates)}
      />
    </SafeAreaView>
  );
}

export default HomeScreen;
