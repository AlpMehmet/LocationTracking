import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import MapView, {Marker, Polyline, Region} from 'react-native-maps';
import BackgroundGeolocation, {
  State,
  Location,
} from 'react-native-background-geolocation';
import styles from './styles';
import Geolocation from '@react-native-community/geolocation';

Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'whenInUse',
});

const LATITUDE_DELTA = 0.5;
const LONGITUDE_DELTA = 0.5;

const TSMapView = () => {
  const [showsUserLocation, setShowsUserLocation] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [mapScrollEnabled, setMapScrollEnabled] = useState(false);
  const [coordinates, setCoordinates] = useState<any[]>([]);
  const [markers, setMarkers] = useState<any[]>([]);
  const [location, setLocation] = useState<Location>(null!);
  const [mapCenter, setMapCenter] = useState<Region>({
    latitude: 45.518853,
    longitude: -73.60055,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const subscriptions: any[] = [];

  const subscribe = (subscription: any) => {
    subscriptions.push(subscription);
  };

  const onMapPanDrag = () => {
    setMapScrollEnabled(true);
  };

  const unsubscribe = () => {
    subscriptions.forEach((subscription: any) => subscription.remove());
    subscriptions.splice(0, subscriptions.length);
  };

  useEffect(() => {
    BackgroundGeolocation.getState().then((state: State) => {
      setEnabled(state.enabled);
    });

    subscribe(
      BackgroundGeolocation.onLocation(setLocation, error => {
        console.warn('[onLocation] ERROR: ', error);
      }),
    );
    subscribe(BackgroundGeolocation.onEnabledChange(setEnabled));

    return () => {
      // Important for with live-reload to remove BackgroundGeolocation event subscriptions.
      unsubscribe();
      clearMarkers();
    };
  }, []);

  React.useEffect(() => {
    if (!location) return;
    onLocation();
  }, [location]);

  React.useEffect(() => {
    onEnabledChange();
  }, [enabled]);

  useEffect(() => {
    Geolocation.getCurrentPosition(info =>
      setMapCenter({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LATITUDE_DELTA,
      }),
    );
  }, []);

  const onEnabledChange = () => {
    setShowsUserLocation(enabled);
    if (!enabled) {
      clearMarkers();
    }
  };

  const onLocation = () => {
    if (!location.sample) {
      addMarker(location);
    }
    setCenter(location);
  };

  const clearMarkers = () => {
    setCoordinates([]);
    setMarkers([]);
  };

  const setCenter = (location: Location) => {
    setMapCenter({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.2,
      longitudeDelta: 0.2,
    });
  };

  const addMarker = (location: Location) => {
    const timestamp = new Date();
    const marker = {
      key: `${location.uuid}:${timestamp.getTime()}`,
      title: location.timestamp,
      heading: location.coords.heading,
      coordinate: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    };

    setMarkers(previous => [...previous, marker]);
    setCoordinates(previous => [
      ...previous,
      {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    ]);
  };

  const renderMarkers = () => {
    let rs: any = [];
    markers.map((marker: any) => {
      rs.push(
        <Marker
          key={marker.key}
          tracksViewChanges={false}
          coordinate={marker.coordinate}
          anchor={{x: 0, y: 0.1}}
          title={marker.title}>
          <View style={[styles.markerIcon]}></View>
        </Marker>,
      );
    });
    return rs;
  };

  return (
    <MapView
      showsTraffic={false}
      showsMyLocationButton={false}
      showsScale={false}
      toolbarEnabled={false}
      showsPointsOfInterest={false}
      style={styles.map}
      followsUserLocation={false}
      showsUserLocation={showsUserLocation}
      region={mapCenter}
      onPanDrag={onMapPanDrag}
      scrollEnabled={mapScrollEnabled}>
      <Polyline
        key="polyline"
        coordinates={coordinates}
        geodesic={true}
        strokeColor="rgba(0,122,111, 0.5)"
        strokeWidth={6}
        zIndex={0}
      />
      {renderMarkers()}
    </MapView>
  );
};

export default TSMapView;
