import { createStackNavigator } from 'react-navigation';
import Sections from '../screens/Sections';
import Doctors from '../screens/Doctors';

const AppStack = createStackNavigator(
  {
    Sections: {
      screen: Sections
    },
    Doctors: {
      path: 'section/:name',
      screen: Doctors
    }
  },
  {
    headerMode: 'none'
  }
);
// const AppStack = createStackNavigator(
//   {
//     Welcome: {
//       screen: Welcome
//     },
//     SignIn: {
//       screen: SignIn
//     },
//     Dashboard: {
//       screen: Dashboard,
//       navigationOptions: {
//         gesturesEnabled: false
//       }
//     },
//     Rooms: {
//       path: 'hotel/:id',
//       screen: Rooms
//     },
//     Booking: {
//       path: 'hotel/:name/:room',
//       screen: Booking
//     }
//   },
//   {
//     headerMode: 'none'
//   }
// );

export default AppStack;
