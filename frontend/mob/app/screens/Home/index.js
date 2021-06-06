import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Screen2 from '../Screen2';
import Screen3 from '../Screen3';
import { AntDesign } from '@expo/vector-icons';
import MoneyButton from '../../components/MoneyButton';
import ReleasesList from '../ReleasesList';


const Tab = createBottomTabNavigator();

const routes = {
    "ReleasesList": {
        icon: "menuunfold",
        size: 25
    },
    "Tela2": {
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
                    if (route.name === "Tela2") {
                        return <MoneyButton
                            focused={focused}
                            onPress={() => navigation.navigate("Tela2")}
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
            <Tab.Screen name="Tela2" component={Screen2} />
            <Tab.Screen name="Tela3" component={Screen3} />
        </Tab.Navigator>
    );
}