import React, { useState, useEffect } from 'react';
import { View, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";
import { Caption, Divider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './styles';

export default function PaymentModal({ visible, setVisible, handleCategory }) {

	const [paymentMethods, setPaymentMethods] = useState([]);

	const getPaymentMethods = async () => {
		try {
		} catch (e) {
			//
		}
	}

	useEffect(() => {
		if (visible) {
			getPaymentMethods();
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
				swipeDirection={['down']}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
					<View style={styles.content}>
						{paymentMethods.length > 0 ? (
							paymentMethods.map((data, index) => (
								<TouchableOpacity key={index} onPress={() => handleCategory(data)} >
									<View style={{ marginTop: 15, marginBottom: 10 }}>
										<View style={{ flexDirection: 'row' }}>
											<View style={[{ backgroundColor: data.badgeColor }, styles.categoryIcon]}>
												<Ionicons name={data.icon} size={24} color="white" />
											</View>
											<View style={{ marginLeft: 20, marginTop: 10 }}>
												<Caption style={{ fontSize: 13 }}>{data.name}</Caption>
											</View>
										</View>
									</View>
									<Divider />
								</TouchableOpacity>
							))
						) :
							<View style={styles.alignCenter}>
								<Caption>Nenhuma forma de pagamento encontrada</Caption>
							</View>
						}
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</>
	)
}