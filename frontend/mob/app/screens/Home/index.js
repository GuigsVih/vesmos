import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddRelease from '../Release/AddRelease';
import Screen3 from '../Screen3';
import { AntDesign } from '@expo/vector-icons';
import MoneyButton from '../../components/MoneyButton';
import ReleasesList from '../Release/ReleasesList';
import ChooseRelease from '../Release/ChooseRelease';


const Tab = createBottomTabNavigator();

const routes = {
    "ReleasesList": {
        icon: "menuunfold",
        size: 25
    },
    "ChooseRelease": {
        icon: "plus",
        size: 40
    },
    "Tela3": {
        icon: "user",
        size: 30
    }
};

export default function Home() {
    return (
        <Tab.Navigator
            screenOptions={({ route, navigation }) => ({
                tabBarIcon: ({ color, focused }) => {
                    if (route.name === "ChooseRelease") {
                        return <MoneyButton
                            focused={focused}
                            onPress={() => navigation.navigate("ChooseRelease")}
                        />
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
                activeTintColor: '#fff',
                inactiveTintColor: '#000',
                showLabel: false,
                style: {
                    backgroundColor: '#623aa7',
                    borderTopColor: 'rgba(255, 255, 255, 0.2)'
                }
            }}
        >
            <Tab.Screen name="ReleasesList" component={ReleasesList} />
            <Tab.Screen name="ChooseRelease" component={ChooseRelease} />
            <Tab.Screen name="Tela3" component={Screen3} />
        </Tab.Navigator>
    );
}