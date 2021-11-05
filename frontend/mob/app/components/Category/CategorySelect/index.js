import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { styles } from './styles';
import CategoryModal from '../CategoryModal';
import { Caption } from 'react-native-paper';

export default function CategorySelect() {

	const [modalVisible, setModalVisible] = useState(false);
	const [category, setCategory] = useState();

	const handleCategory = (data) => {
		setCategory(data);
		setModalVisible(false);
	}

	return (
		<>
			<TouchableOpacity onPress={() => setModalVisible(true)}>
				<View style={[styles.container, { padding: category && Object.keys(category).length > 0 ? 9 : 15}]}>
					<View style={{ flexDirection: 'row' }}>
						{category && Object.keys(category).length > 0 ?
							<View style={{ flex: 1, flexDirection: 'row', marginLeft: 5 }}>
								<View style={[{ backgroundColor: category.badgeColor }, styles.categoryIcon]}>
									<Ionicons name={category.icon} size={15} color="white" />
								</View>
								<Caption style={styles.categoryName}>{category.name}</Caption>
							</View>
							:
							<>
								<Text style={styles.text}>Categoria</Text>
								<View style={styles.toEnd}>
									<AntDesign style={{ marginTop: 4 }} name="down" size={15} color="#737373" />
								</View>
							</>
						}
					</View>
				</View>
			</TouchableOpacity>
			<CategoryModal
				visible={modalVisible}
				setVisible={setModalVisible}
				handleCategory={handleCategory}
			/>
		</>
	)
}