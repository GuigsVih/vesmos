import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../screens/Login';
import LoginWithEmail from '../../screens/Login/LoginWithEmail';
import Home from '../../screens/Home';
import CreateAccount from '../../screens/CreateAccount';
import { useAuth } from '../hooks/auth';

const Stack = createStackNavigator();

export default function Routes() {

	const auth = useAuth();

	return (
		!auth?.authToken ?
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
					name="CreateAccount"
					component={CreateAccount}
					options={{
						title: "",
						headerStyle: { backgroundColor: '#ffffff', borderBottomWidth: 0 }
					}}
				/>
			</Stack.Navigator>
			:
			<Stack.Navigator initialRouteName="Login">
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