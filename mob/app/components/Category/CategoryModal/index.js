import React, { useState, useEffect } from 'react';
import { View, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Text } from 'react-native';
import Modal from "react-native-modal";
import { Caption, Divider, TextInput } from 'react-native-paper';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import Input from '../../Input';
import { styles } from './styles';
import { fetchCategories } from '../../../core/services/category';

export default function CategoryModal({ visible, setVisible, handleCategory }) {

	const [category, setCategory] = useState();
	const [categories, setCategories] = useState([]);

	const getCategories = async () => {
		try {
			const res = await fetchCategories();
			setCategories(res.data);
		} catch (e) {
			//
		}
	}

	useEffect(() => {
		if (visible) {
			getCategories();
		}
	}, [visible]);

	return (
		<>
			<Modal
				isVisible={visible}
				onDismiss={() => setVisible(false)}
				onBackButtonPress={() => setVisible(false)}
				onSwipeComplete={() => setVisible(false)}
				style={{ justifyContent: 'flex-end', margin: 0 }}
				swipeDirection={['right', 'left']}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
					<View style={styles.content}>
						<Input
							label={"Procurar categoria"}
							value={category}
							style={{ marginTop: 20, margin: 20, marginBottom: 0 }}
							rightIcon={
								<TextInput.Icon
									name={() => <FontAwesome name="search" size={24} color="black" />}
								/>
							}
							onChange={(value) => setCategory(value)}
						/>
						<Divider style={{ marginTop: 30 }} />
						{categories.length > 0 ? (
							categories.map((data, index) => (
								<TouchableOpacity key={index} onPress={() => handleCategory(data)} >
									<View style={{ marginTop: 15, marginBottom: 10 }}>
										<View style={{ flexDirection: 'row' }}>
											<View style={[{ backgroundColor: data.badgeColor }, styles.categoryIcon]}>
												<Ionicons name={data.icon} size={24} color="white" />
											</View>
											<View style={{ marginLeft: 20, marginTop: 13 }}>
												<Text style={{ fontSize: 13 }}>{data.name}</Text>
											</View>
										</View>
									</View>
									<Divider />
								</TouchableOpacity>
							))
						) :
							<View style={styles.alignCenter}>
								<Caption>Nenhuma categoria encontrada</Caption>
							</View>
						}
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</>
	)
}