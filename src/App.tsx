import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserManagementScreen from './screens/UserManagementScreen';
import HomeScreen from './screens/HomeScreen';
import OnDemandMarkersScreen from './screens/OnDemandMarkersScreen';
import { initialize, iarLicense } from 'react-native-iar-sdk';
import SurfaceViewScreen from './screens/SurfaceViewScreen';
import RewardsScreen from './screens/RewardsScreen';
import LocationMarkerScreen from './screens/LocationMarkersScreen';

export default function App() {
  const Stack = createNativeStackNavigator();

  // Initialize the IAR SDK
  const initializeSDK = async () => {
    try {
      // Connect to the SDK with our SDK license
      const response = await initialize(
        'pk_org_d5f1fca52da847c9a1a064619b91c74e'
      ); // Demo OrgID

      // Log out connection response
      //console.log('initialize response: ', response);

      // Check that the SDK has saved the license
      // const license = await iarLicense();
      // console.log('iarLicense: ', license);
    } catch (error: unknown) {
      // Log out an error
      console.error('onConnectPress - error', error);
    }
  };

  // Run on init
  useEffect(() => {
    initializeSDK();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{
            headerShown: false,
            title: 'Home',
          }}
        />
        <Stack.Screen
          name="userManagement"
          component={UserManagementScreen}
          options={{
            title: 'User Management',
          }}
        />
        <Stack.Screen
          name="onDemandMarkers"
          component={OnDemandMarkersScreen}
          options={{
            title: 'On Demand Markers',
          }}
        />
        <Stack.Screen
          name="locationMarkers"
          component={LocationMarkerScreen}
          options={{
            title: 'Location Markers',
          }}
        />
        <Stack.Screen
          name="rewards"
          component={RewardsScreen}
          options={{
            title: 'User Rewards',
          }}
        />
        <Stack.Screen
          name="SurfaceViewScreen"
          component={SurfaceViewScreen}
          options={{
            title: 'AR View',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
