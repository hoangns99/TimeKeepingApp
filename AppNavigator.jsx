import { useSelector } from "react-redux";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Home from './screens/Home';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const user = useSelector((state) => state.auth?.currentUser);
    return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Login'>
            {/* <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Home' component={Home} /> */}
            {
              user !== null ? (
                <Stack.Screen name='Home' component={Home} />
              ) : (
                <Stack.Screen name='Login' component={Login} />
              )
            }
          </Stack.Navigator>
        </NavigationContainer>
    )
}