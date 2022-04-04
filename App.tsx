import React, {createContext, useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/Screens/HomeScreen';
import DriveLogScreen from './src/Screens/DriveLogScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AppContextProps} from './src/Components/Interfaces/AppContextProps';
import {getLogList} from './src/Helpers/Storage';
import {ILog} from './src/Interfaces/ILog';

const Tab = createBottomTabNavigator();

export const AppContext = createContext<AppContextProps>(null!);

const App = () => {
  const [logs, setLogs] = useState<ILog[]>(null!);
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setLogs(JSON.parse(await getLogList()));
  }

  return (
    <AppContext.Provider
      value={{
        logs,
        setLogs: (logList: ILog[]) => {
          setLogs(logList);
        },
      }}>
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
    </AppContext.Provider>
  );
};

export default App;
