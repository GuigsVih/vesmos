import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { useAuth } from '../hooks/auth';
import Login from '../../screens/Login';
import BottomMenu from '../../screens/BottomMenu';
import CreateUser from '../../screens/CreateUser';
import CreateAccount from '../../screens/CreateAccount';
import CreateCreditCard from '../../screens/CreateCreditCard';
import LoginWithEmail from '../../screens/Login/LoginWithEmail';
import ReleaseForm from '../../screens/Release/ReleaseForm';

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
					name="CreateUser"
					component={CreateUser}
					options={{
						title: "",
						headerStyle: { backgroundColor: '#ffffff', borderBottomWidth: 0 }
					}}
				/>
			</Stack.Navigator>
			:
			<Stack.Navigator initialRouteName="BottomMenu">
				<Stack.Screen
					name="BottomMenu"
					component={BottomMenu}
					options={{
						title: "",
						headerStyle: { backgroundColor: '#623aa7', borderBottomWidth: 0, elevation: 0, shadowOpacity: 0 },
						headerLeft: () => {
							return null;
						},
					}}
				/>
				<Stack.Screen
					name="ReleaseForm"
					component={ReleaseForm}
					options={{
						title: "",
						headerTintColor: "#fff",
						headerStyle: { backgroundColor: '#623aa7', borderBottomWidth: 0, elevation: 0, shadowOpacity: 0 }
					}}
				/>
				<Stack.Screen
					name="CreateCreditCard"
					component={CreateCreditCard}
					options={{
						title: "",
						headerTintColor: "#fff",
						headerStyle: { backgroundColor: '#623aa7', borderBottomWidth: 0, elevation: 0, shadowOpacity: 0 }
					}}
				/>
				<Stack.Screen
					name="CreateAccount"
					component={CreateAccount}
					options={{
						title: "",
						headerTintColor: "#fff",
						headerStyle: { backgroundColor: '#623aa7', borderBottomWidth: 0, elevation: 0, shadowOpacity: 0 }
					}}
				/>
			</Stack.Navigator>
	)
}