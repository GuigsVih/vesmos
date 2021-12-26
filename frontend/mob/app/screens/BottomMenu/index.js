import React from 'react';

import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../Home';
import User from '../User';
import Charts from '../Charts';
import ReleasesList from '../Release/ReleasesList';
import ChooseRelease from '../Release/ChooseRelease';
import MoneyButton from '../../components/MoneyButton';


const Tab = createBottomTabNavigator();

const routes = {
    "Home": {
        icon: "home",
        size: 25
    },
    "ReleasesList": {
        icon: "menuunfold",
        size: 25
    },
    "ChooseRelease": {
        icon: "plus",
        size: 40
    },
    "Charts": {
        icon: "linechart",
        size: 25
    },
    "User": {
        icon: "user",
        size: 30
    }
};

export default function BottomMenu({ navigation }) {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => {
                    if (route.name === "ChooseRelease") {
                        return <MoneyButton navigation={navigation} />
                    }
                    return <AntDesign
                        name={routes[route.name]['icon']}
                        size={routes[route.name]['size']}
                        solid={true}
                        color={color}
                    />;
                },
            })}
            tabBarOptions={{
                activeTintColor: '#623aa7',
                showLabel: false,
                style: {
                    backgroundColor: '#fff',
                    borderTopColor: 'rgba(255, 255, 255, 0.2)'
                }
            }}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="ReleasesList" component={ReleasesList} />
            <Tab.Screen name="ChooseRelease" component={ChooseRelease}
                listeners={{
                    tabPress: e => {
                        e.preventDefault();
                    },
                }} />
            <Tab.Screen name="Charts" component={Charts} />
            <Tab.Screen name="User" component={User} />
        </Tab.Navigator>
    );
}