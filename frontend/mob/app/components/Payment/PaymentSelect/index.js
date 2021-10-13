import React, { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Caption } from 'react-native-paper';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import PaymentModal from '../PaymentModal';
import { styles } from './styles';

export default function PaymentSelect() {

	const [payment, setPayment] = useState();
	const [modalVisible, setModalVisible] = useState(false);

	const handlePayment = () => {

	}

  return (
    <>      
			<TouchableOpacity onPress={() => setModalVisible(true)}>
				<View style={[styles.container, { padding: payment && Object.keys(payment).length > 0 ? 12 : 15}]}>
					<View style={{ flexDirection: 'row' }}>
						{payment && Object.keys(payment).length > 0 ?
							<>
								<View style={[{ backgroundColor: payment.badgeColor }, styles.paymentImg]}>
									<Ionicons name={payment.icon} size={15} color="white" />
								</View>
								<View style={{ marginLeft: 10, marginTop: 5 }}>
									<Caption style={{ fontSize: 13, color: "#000" }}>{payment.name}</Caption>
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
				handleCategory={handlePayment}
			/>
    </>
  );
}