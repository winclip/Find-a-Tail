import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Home from './components/home/home';
import GameAllAnimals from './components/gameAllAnimals/game.js';
import GameFindTail from './components/gameFindTail/game.js';
import GameFindVoice from './components/gameFindVoice/game.js';
import ColoringBooks  from "./components/coloringBooks/index";
  const NavStack = createStackNavigator({
    Home: { 
        screen: Home,
        navigationOptions: {
          headerShown: false 
        },
    },
    GameAllAnimals: { 
        screen: GameAllAnimals,
        navigationOptions: {
          headerShown: false 
        },
    },
    GameFindTail: { 
      screen: GameFindTail,
      navigationOptions: {
        headerShown: false 
      },
  },
  GameFindVoice: { 
    screen: GameFindVoice,
    navigationOptions: {
      headerShown: false 
    },
},
ColoringBooks: { 
  screen: ColoringBooks,
  navigationOptions: {
    headerShown: false 
  },
},
  
});

const AppNavigator = createAppContainer(NavStack);

  export default AppNavigator;