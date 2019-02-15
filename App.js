import { createStackNavigator, createAppContainer } from 'react-navigation';
import ListTeams from './komponen/ListTeams';
import ListPlayers from './komponen/ListPlayers';
import PlayerDetails from './komponen/PlayerDetails';

var AppNavigator = createStackNavigator(
  {
    ListTeams: ListTeams,
    ListPlayers: ListPlayers,
    PlayerDetails: PlayerDetails
  },
  {
    initialRouteName: "ListTeams"
  }
)

export default createAppContainer(AppNavigator);