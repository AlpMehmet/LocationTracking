import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/Screens/HomeScreen';
import DriveLogScreen from './src/Screens/DriveLogScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();
//TODO: km eklenmeli interface
//TODO: km eklendikten sonra cardda km statikten duzeltilmeli
//TODO: contextapi ekle shared ref icin (logs)
//TODO: verileri asyncstroage kaydet
//TODO: uygulama ilk acildiginda asynstoredan al
const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarActiveTintColor: '#0077c8',
          tabBarInactiveTintColor: '#EBF6F3',
          tabBarActiveBackgroundColor: '#BFDFFF',
          tabBarInactiveBackgroundColor: '#BFDFFF',
          tabBarIcon: ({focused, color, size}) => {
            let iconName = 'angellist';

            if (route.name === 'Home') {
              iconName = focused ? 'paper-plane' : 'paper-plane-o';
            }

            return <FontAwesome name={iconName} size={size} color={color} />;
          },
        })}
        initialRouteName="Home">
        <Tab.Screen
          name="Home"
          options={{title: 'Trip'}}
          component={HomeScreen}
        />
        <Tab.Screen
          name="Logs"
          options={{title: 'Past Trips'}}
          component={DriveLogScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
