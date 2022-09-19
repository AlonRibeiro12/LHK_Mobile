import { useRef, useEffect } from 'react';
import { StatusBar } from 'react-native';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from '@expo-google-fonts/inter';
import { Subscription } from 'expo-modules-core';
import * as Notification from 'expo-notifications';

import Routes from './src/routes';
import { Background, Loading } from './src/components';

import './src/services/notificationConfig';
import getPushNotificationToken from './src/services/getPushNotificationToken';


export default function App() {
  const getNotificationListener = useRef<Subscription>();
  const responseNotificationListener = useRef<Subscription>();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  useEffect(() => {
    getPushNotificationToken();
  });

  useEffect(() => {
    getNotificationListener.current = Notification.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    responseNotificationListener.current = Notification.addNotificationResponseReceivedListener(response => {
      console.log(response)
    });

    return () => {
      if (getNotificationListener.current && responseNotificationListener.current) {
        Notification.removeNotificationSubscription(getNotificationListener.current);
        Notification.removeNotificationSubscription(responseNotificationListener.current);
      }
    }
  })

  return (
    <Background>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      { fontsLoaded ? <Routes /> : <Loading /> }

    </Background>
  );
}
