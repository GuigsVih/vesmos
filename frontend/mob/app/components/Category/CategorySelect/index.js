import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { styles } from './styles';
import CategoryModal from '../CategoryModal';

export default function CategorySelect() {
	
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<>
			<TouchableOpacity onPress={() => setModalVisible(true)}>
				<View style={styles.container}>
					<View style={{ flexDirection: 'row' }}>
						<Text style={styles.text}>Categoria</Text>
						<View style={styles.toEnd}>
							<AntDesign style={{ marginTop: 4 }} name="down" size={15} color="#737373" />
						</View>
					</View>
				</View>
			</TouchableOpacity>
			<CategoryModal visible={modalVisible} setVisible={setModalVisible} />
		</>
	)
}