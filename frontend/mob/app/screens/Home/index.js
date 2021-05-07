import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Screen1 from '../Screen1';
import Screen2 from '../Screen2';
import Screen3 from '../Screen3';
import { Icon } from 'react-native-elements';


const Tab = createBottomTabNavigator();

const routes = {
    "Tela1": {
        icon: "home-outline",
        size: 25
    },
    "Tela2": {
        icon: "add-circle-outline",
        size: 32
    },
    "Tela3": {
        icon: "person-outline",
        size: 25
    }
};

export default function Home() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    return <Icon name={routes[route.name]['icon']} size={routes[route.name]['size']} color={color} type={'ionicon'} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: '#fff',
                inactiveTintColor: 'gray',
                showLabel: false,
                style: {
                    backgroundColor: '#623aa7'
                }
            }}
        >
            <Tab.Screen name="Tela1" component={Screen1} />
            <Tab.Screen name="Tela2" component={Screen2} />
            <Tab.Screen name="Tela3" component={Screen3} />
        </Tab.Navigator>
    );
}