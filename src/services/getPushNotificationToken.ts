import * as Notification from 'expo-notifications';

async function getPushNotificationToken() {
  const { granted } = await Notification.getPermissionsAsync();

  if (!granted) {
    await Notification.requestPermissionsAsync();
  }

  if (granted) {
    const pushToken = await Notification.getExpoPushTokenAsync();
    console.log({ token: pushToken.data });
    return pushToken.data;
  }
}

export default getPushNotificationToken;
