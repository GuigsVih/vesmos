import React, { useState, useEffect, Fragment } from 'react';
import Modal from "react-native-modal";
import { Image } from 'react-native-elements';
import { ActivityIndicator, Caption, Divider, Text } from 'react-native-paper';
import { View, Keyboard, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native';

import { fetchPaymentMethods } from '../../../core/services/payment';
import NuBank from '../../../../assets/icon/banks/nubank.png';
import Bradesco from '../../../../assets/icon/banks/bradesco.png';
import { styles } from './styles';

const PAYMENT_TYPES = {
	"credit_cards": "Cartões de Crédito",
	"accounts": "Contas"
};

export default function PaymentModal({ visible, setVisible, handlePayment }) {

	const [paymentMethods, setPaymentMethods] = useState([]);
	const [loading, setLoading] = useState(false);

	const getPaymentMethods = async () => {
		setLoading(true);
		try {
			const res = await fetchPaymentMethods();
			setPaymentMethods(res.data);
		} catch (e) {
			//
		}
		setLoading(false);
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
						{!loading ?
							(Object.keys(paymentMethods).length > 0 ?
								<ScrollView>
									{Object.keys(paymentMethods).map((arr, index) => (
										<View key={index} style={{ marginTop: 30 }}>
											<Text style={styles.paymentTypeText}>{PAYMENT_TYPES[arr]}</Text>
											{paymentMethods[arr].map((data, idx) => (
												<Fragment key={idx}>
													{idx == 0 ?
														<Divider /> : <></>
													}
													<TouchableOpacity onPress={() => handlePayment(data)} >
														<View style={{ marginTop: 10, marginBottom: 20 }}>
															<View style={{ flexDirection: 'row' }}>
																<View style={{ marginLeft: 10, marginTop: 10 }}>
																	<View style={{ flex: 1, flexDirection: 'row' }}>
																		{index > 0 ?
																			<Image source={Bradesco} style={styles.bankImg} />
																			:
																			<Image source={NuBank} style={styles.bankImg} />
																		}
																		<Text style={styles.name}>{data.name}</Text>
																	</View>
																</View>
															</View>
														</View>
													</TouchableOpacity>
													<Divider />
												</Fragment>
											))}
										</View>
									))}
								</ScrollView>
								:
								<View style={styles.alignCenter}>
									<Caption>Nenhuma forma de pagamento encontrada</Caption>
								</View>
							) : <ActivityIndicator size={'large'} style={styles.alignCenter} color={"#dadad3"} />
						}
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</>
	)
}