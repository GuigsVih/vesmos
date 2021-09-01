import React from 'react';
import { View, Text } from 'react-native';
import { Caption, Divider } from 'react-native-paper';
import { styles } from './styles';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

export default function List() {
	return (
		<View elevation={12 * 5} style={styles.container}>
			<View style={styles.balanceContainer}>
				<View style={{ flexDirection: 'row' }}>
					<View>
						<View style={{ flexDirection: 'row' }}>
							<MaterialIcons style={{ marginRight: 10, marginTop: 2 }} name="account-balance" size={30} color="#7d7d7d" />
							<View>
								<Text style={{ fontSize: 20, marginBottom: 0, color: "#85bb65" }}>R$ 1000,00</Text>
								<Caption style={{ marginTop: 0 }}>Balanço total</Caption>
							</View>
						</View>
					</View>
					<View style={{ flexDirection: 'row', marginLeft: 30 }}>
						<FontAwesome style={{marginRight: 10, marginTop: 2}} name="balance-scale" size={30} color="#7d7d7d" />
						<View>
							<Text style={{ fontSize: 20, marginBottom: 0, color: "#FF7F7F" }}>R$ -500,00</Text>
							<Caption style={{ marginTop: 0 }}>Balanço mensal</Caption>
						</View>
					</View>
				</View>
			</View>
			<Divider />
			<View>
			</View>
		</View>
	);
}