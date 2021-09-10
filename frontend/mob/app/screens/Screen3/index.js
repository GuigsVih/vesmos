import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useIsFocused } from "@react-navigation/native";

export default function Screen3({ navigation }) {

	const isFocused = useIsFocused();

	useEffect(() => {
		const stackParent = navigation.dangerouslyGetParent();
		if (stackParent && isFocused) {
			stackParent.setOptions({ title: '', headerRight: () => { return null } });
		}
	}, [isFocused]);
	
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Fazer isso</Text>
		</View>
	);
}