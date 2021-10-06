import React from 'react';
import { useAuth } from '../hooks/auth';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../screens/Home';
import Login from '../../screens/Login';
import CreateAccount from '../../screens/CreateAccount';
import AddRelease from '../../screens/Release/AddRelease';
import LoginWithEmail from '../../screens/Login/LoginWithEmail';

const Stack = createStackNavigator();

export default function Routes() {
	
	const auth = useAuth();
	
	return (
		!auth.authToken ?
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
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen
					name="Home"
					component={Home}
					options={{
						title: "",
						headerStyle: { backgroundColor: '#623aa7', borderBottomWidth: 0, elevation: 0, shadowOpacity: 0 },
						headerLeft: () => {
							return null;
						},
					}}
				/>
				<Stack.Screen
					name="AddRelease"
					component={AddRelease}
					options={{
						title: "",
						headerTintColor: "#fff",
						headerStyle: { backgroundColor: '#623aa7', borderBottomWidth: 0, elevation: 0, shadowOpacity: 0 }
					}}
				/>
			</Stack.Navigator>
	)
}