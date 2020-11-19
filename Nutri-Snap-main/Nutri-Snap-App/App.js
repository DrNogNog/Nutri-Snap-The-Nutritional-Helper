import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import homeScreen from './src/screens/main'
import cameraScreen from './src/screens/camera'
import settingsScreen from './src/screens/settings'
import welcomeScreen from './src/screens/welcome'

const navigator=createSwitchNavigator({
  welcomeFlow: createStackNavigator({
     welcome:welcomeScreen
  }),
  mainFlow:  createBottomTabNavigator({
    home:homeScreen,
    camera:cameraScreen,
    settings:settingsScreen
  })
})
 

export default createAppContainer(navigator)