import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddDeviceScreen from './screens/AddDeviceScreen';
import UpdateLocationScreen from './screens/UpdateLocationScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="AddDevice" component={AddDeviceScreen} options={{ title: 'Add Device' }} />
        <Stack.Screen name="UpdateLocation" component={UpdateLocationScreen} options={{ title: 'Update Location' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
