import React, { useState } from 'react';
import { Caption } from 'react-native-paper';
import { Image } from 'react-native-elements';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View, Text } from 'react-native';

import { styles } from './styles';
import PaymentModal from '../PaymentModal';
import Bradesco from '../../../../assets/icon/banks/bradesco.png';

export default function PaymentSelect({ onSelect }) {

	const [payment, setPayment] = useState();
	const [modalVisible, setModalVisible] = useState(false);

	const handlePayment = (data) => {
		setPayment(data);
		onSelect(data.id)
		setModalVisible(false);
	}

	return (
		<>
			<TouchableOpacity onPress={() => setModalVisible(true)}>
				<View style={[styles.container, { padding: payment && Object.keys(payment).length > 0 ? 12 : 15 }]}>
					<View style={{ flexDirection: 'row' }}>
						{payment && Object.keys(payment).length > 0 ?
							<>
								<View style={{ flex: 1, flexDirection: 'row' }}>
									<Image source={Bradesco} style={styles.bankImg} />
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