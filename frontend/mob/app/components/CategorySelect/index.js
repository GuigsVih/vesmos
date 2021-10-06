import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from './styles';

export default function CategorySelect() {
	return (
		<TouchableOpacity>
			<View style={styles.container}>
				<View>
					<Text style={styles.text}>Categoria</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}