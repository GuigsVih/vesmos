import React, { useState } from 'react';
import { View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Modal from "react-native-modal";
import { Caption, Divider, TextInput } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';

import { styles } from './styles';
import Input from '../../Input';

export default function CategoryModal({ visible, setVisible }) {

	const [category, setCategory] = useState();

	return (
		<>
			<Modal
				isVisible={visible}
				onDismiss={() => setVisible(false)}
				onBackButtonPress={() => setVisible(false)}
				onSwipeComplete={() => setVisible(false)}
				style={{ justifyContent: 'flex-end', margin: 0 }}
				swipeDirection={['down', 'up']}
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
						<View style={styles.alignCenter}>
							<Caption>Nenhuma categoria encontrada</Caption>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</>
	)
}