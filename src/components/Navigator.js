import React from 'react';
import { StackNavigator  } from 'react-navigation';
import Profile from './screens/Profile/Profile'
import Home from './screens/Home/Home'
import Register from './screens/Register/Register'
import Auth from './screens/Auth/Auth'
import EditProfile from './screens/EditProfile/EditProfile'
import Menu from './screens/Menu/Menu'
import Members from './screens/Members/Members'
import Encyclopedia from './screens/Encyclopedia/Encyclopedia'
import BirdProfile from './screens/BirdProfile/BirdProfile'
import BirdEdit from './screens/BirdEdit/BirdEdit'
import AddCapture from './screens/AddCapture/AddCapture'
import AllMyCaptures from './screens/AllMyCaptures/AllMyCaptures'
import CaptureDetails from './screens/CaptureDetails/CaptureDetails'


export default Navigator = StackNavigator(
    {
        Auth: {
            screen: Auth,
            navigationOptions: {
                header: null,
            },
        },
        Register: {
            screen: Register,
            navigationOptions: {
                title: 'Créer votre compte',
            },
        },
        Profile: {
            screen: Profile,
        },
        Home: {
            screen: Home,
        },
        AddCapture: {
            screen: AddCapture,
            navigationOptions: {
                title: 'Ajouter une capture',
            },
        },
        AllMyCaptures: {
            screen: AllMyCaptures,
            navigationOptions: {
                title: 'Mes captures',
            },
        },
        CaptureDetails: {
            screen: CaptureDetails,
            navigationOptions: {
                title: 'Données de capture',
            },
        },
        BirdEdit: {
            screen: BirdEdit,
        },
        Members: {
            screen: Members,
        },
        Menu: {
            screen: Menu,
        },
        Encyclopedia: {
            screen: Encyclopedia,
        },
        BirdProfile: {
            screen: BirdProfile,
        },
        EditProfile: {
            screen: EditProfile,
            navigationOptions: {
                title: 'Éditez votre profile',
            },
        },
    },
    {
        headerMode: 'float',
        initialRouteName: 'Auth',
        navigationOptions: {
            headerLeft: null
        }
    }
);