import React, { useState, useEffect } from 'react';
import { Caption } from 'react-native-paper';
import { Image } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity, View, Text } from 'react-native';

import { styles } from './styles';
import PaymentModal from '../PaymentModal';
import { env } from '../../../core/environment';
import { fetchPaymentById } from '../../../core/services/payment';

export default function PaymentSelect({ onSelect, value }) {

	const [payment, setPayment] = useState();
	const [modalVisible, setModalVisible] = useState(false);

	const handlePayment = (data) => {
		setPayment(data);
		onSelect(data.type, data.id)
		setModalVisible(false);
	}

	const getSelectedPayment = async () => {
		try {
			const res = await fetchPaymentById(value);
			setPayment(res.data);
		} catch (e) {
			//
		}
	}

	useEffect(() => {
		if (value.id) {
			getSelectedPayment();
		}
	}, [value]);

	return (
		<>
			<TouchableOpacity onPress={() => setModalVisible(true)}>
				<View style={[styles.container, { padding: payment && Object.keys(payment).length > 0 ? 12 : 15 }]}>
					<View style={{ flexDirection: 'row' }}>
						{payment && Object.keys(payment).length > 0 ?
							<>
								<View style={{ flex: 1, flexDirection: 'row' }}>
									<Image source={{ uri: `${env.apiUrl}/${payment.imgUrl}` }} style={styles.bankImg} />
									<Caption style={{ fontSize: 13, color: "#000", marginLeft: 10, marginTop: 5 }}>{payment.name}</Caption>
								</View>
							</>
							:
							<>
								<Text style={styles.text}>Forma de pagamento</Text>
								<View style={styles.toEnd}>
									<AntDesign style={{ marginTop: 4 }} name="down" size={15} color="#737373" />
								</View>
							</>
						}
					</View>
				</View>
			</TouchableOpacity>
			<PaymentModal
				visible={modalVisible}
				setVisible={setModalVisible}
				handlePayment={handlePayment}
			/>
		</>
	);
}