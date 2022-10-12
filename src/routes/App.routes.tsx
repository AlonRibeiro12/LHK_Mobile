import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home, Game } from '../screens';

const { Navigator, Screen } = createNativeStackNavigator();

function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name="home"
        component={Home}
      />
      <Screen
        name="game"
        component={Game}
      />
    </Navigator>
  );
}

export default AppRoutes;
