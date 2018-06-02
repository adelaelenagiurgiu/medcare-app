import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import { TURQUOISE, WHITE, MEDIUM_GREY } from '../../assets/colors';

import Sections from '../screens/Sections';
import Account from '../screens/Account';
import Calendar from '../screens/Calendar';
import History from '../screens/History';
import Doctors from '../screens/Doctors';
import SectionServices from '../screens/SectionServices';
import Book from '../screens/Book';

const SectionsStack = createStackNavigator(
  {
    Sections: {
      screen: Sections
    },
    SectionServices: {
      path: 'section/:name',
      screen: SectionServices
    },
    Doctors: {
      path: 'section/:name',
      screen: Doctors
    },
    Book: {
      path: 'section/:doctor',
      screen: Book
    }
  },
  {
    headerMode: 'none'
  }
);

const AppStack = createBottomTabNavigator(
  {
    Home: {
      screen: SectionsStack
    },
    Calendar: {
      screen: Calendar
    },
    History: {
      screen: History
    },
    Account: {
      screen: Account
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      header: null,
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        let iconType;
        if (routeName === 'Home') {
          iconName = 'home';
          iconType = 'entypo';
        } else if (routeName === 'Calendar') {
          iconName = 'calendar';
          iconType = 'entypo';
        } else if (routeName === 'History') {
          iconName = 'history';
          iconType = 'material-community';
        } else if (routeName === 'Account') {
          iconName = 'user';
          iconType = 'font-awesome';
        }

        return <Icon name={iconName} type={iconType} size={28} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: WHITE,
      inactiveTintColor: MEDIUM_GREY,
      showLabel: false,
      style: {
        backgroundColor: TURQUOISE,
        borderTopWidth: 0,
        paddingBottom: 5,
        paddingTop: 5
      }
    }
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
