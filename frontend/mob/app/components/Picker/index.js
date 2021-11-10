import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { styles } from './styles';
import ModalPicker from './ModalPicker';

export default function Picker({ value, setValue, label, items }) {

	const [modalVisible, setModalVisible] = useState(false);

	const handleValue = (data) => {
		setValue(data);
		setModalVisible(false);
	}

	return (
		<>
			<TouchableOpacity onPress={() => setModalVisible(true)}>
				<View style={[styles.container, { padding: 10 }]}>
					<View style={{ flexDirection: 'row' }}>
						<>
							<Text style={styles.text}>{items[value] ? items[value] : label}</Text>
							<View style={styles.toEnd}>
								<AntDesign style={{ marginTop: 4 }} name="down" size={15} color="#737373" />
							</View>
						</>
					</View>
				</View>
			</TouchableOpacity>
			<ModalPicker
				visible={modalVisible}
				setVisible={setModalVisible}
				handleValue={handleValue}
				items={items}
			/>
		</>
	)
}