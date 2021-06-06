import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../screens/Login';
import LoginWithEmail from '../../screens/Login/LoginWithEmail';
import Home from '../../screens/Home';

const Stack = createStackNavigator();

export default function Routes() {

    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="LoginWithEmail"
                component={LoginWithEmail}
                options={{
                    title: "",
                    headerStyle: { backgroundColor: '#ffffff', borderBottomWidth: 0 }
                }}
            />
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    title: "",
                    headerStyle: { backgroundColor: '#ffffff', borderBottomWidth: 0 },
                    headerLeft: () => {
                        return null;
                    },
                }}
            />
        </Stack.Navigator>
    )
}