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
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import LoginOrSignUp from '../screens/LoginOrSignUp';
import SignUp from '../screens/SignUp';

const SectionsStack = createStackNavigator(
  {
    Sections: {
      screen: Sections
    },
    SectionServices: {
      screen: SectionServices
    },
    Doctors: {
      screen: Doctors
    },
    Book: {
      screen: Book
    }
  },
  {
    headerMode: 'none'
  }
);

const TabStack = createBottomTabNavigator(
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

const PatientStack = createStackNavigator(
  {
    LoginOrSignUp: {
      screen: LoginOrSignUp
    },
    Login: {
      screen: Login
    },
    SignUp: {
      screen: SignUp
    },
    Home: {
      screen: TabStack
    }
  },
  {
    headerMode: 'none'
  }
);

const DoctorStack = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    Home: {
      screen: TabStack
    }
  },
  {
    headerMode: 'none'
  }
);

const AppStack = createStackNavigator(
  {
    Welcome: {
      screen: Welcome
    },
    Patient: {
      screen: PatientStack
    },
    Doctor: {
      screen: DoctorStack
    }
  },
  {
    headerMode: 'none'
  }
);

export default AppStack;
