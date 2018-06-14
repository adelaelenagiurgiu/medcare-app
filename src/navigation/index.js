import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import { TURQUOISE, WHITE, MEDIUM_GREY } from '../../assets/colors';

import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import LoginOrSignUp from '../screens/LoginOrSignUp';
import SignUp from '../screens/SignUp';

import Sections from '../screens/patient/Sections';
import PatientAccount from '../screens/patient/Account';
import PatientCalendar from '../screens/patient/Calendar';
import PatientHistory from '../screens/patient/History';
import Doctors from '../screens/patient/Doctors';
import SectionServices from '../screens/patient/SectionServices';
import Book from '../screens/patient/Book';

import DoctorCalendar from '../screens/doctor/Calendar';
import DoctorHistory from '../screens/doctor/History';
import DoctorPatients from '../screens/doctor/Patients';
import DoctorAccount from '../screens/doctor/Account';

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

const PatientTabStack = createBottomTabNavigator(
  {
    Home: {
      screen: SectionsStack
    },
    Calendar: {
      screen: PatientCalendar
    },
    History: {
      screen: PatientHistory
    },
    Account: {
      screen: PatientAccount
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

const DoctorTabStack = createBottomTabNavigator(
  {
    Calendar: {
      screen: DoctorCalendar
    },
    History: {
      screen: DoctorHistory
    },
    Patients: {
      screen: DoctorPatients
    },
    Account: {
      screen: DoctorAccount
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      header: null,
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        let iconType;
        if (routeName === 'Calendar') {
          iconName = 'calendar';
          iconType = 'entypo';
        } else if (routeName === 'History') {
          iconName = 'history';
          iconType = 'material-community';
        } else if (routeName === 'Patients') {
          iconName = 'format-list-bulleted';
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
    PatientTab: {
      screen: PatientTabStack
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
    DoctorTab: {
      screen: DoctorTabStack
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
