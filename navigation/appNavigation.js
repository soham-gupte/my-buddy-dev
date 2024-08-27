import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { setUser } from '../redux/slices/user';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();

  onAuthStateChanged(auth, user => {
    console.log("Got user:", user);
    dispatch(setUser(user))
  })

  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
        </Stack.Navigator>    
      </NavigationContainer>
    );
  }
  else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen options={{headerShown: false}} name="Welcome" component={WelcomeScreen} />
          <Stack.Screen options={{headerShown: false}} name="SignIn" component={SignInScreen} />
          <Stack.Screen options={{headerShown: false}} name="SignUp" component={SignUpScreen} />
          <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
        </Stack.Navigator>    
      </NavigationContainer>
    );
  }
  
}

