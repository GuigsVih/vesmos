import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { MaterialIcons, AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Caption } from 'react-native-paper';
import { fetchBalances } from '../../../core/services/balance';
import { currencyFormat } from '../../../core/helpers/format';

export default function Balance({ filterDate, focused }) {

	const [balance, setBalance] = useState({});
	const [showFuture, setShowFuture] = useState(false);
	const [arrowIcon, setArrowIcon] = useState('down');

	const getBalances = async () => {
		try {
			const res = await fetchBalances(filterDate);
			setBalance(res.data);
		} catch (e) {
			//
		}
	}

	const futureBalance = () => {
		setShowFuture(!showFuture);
		setArrowIcon(!showFuture ? 'up' : 'down');
	}

	useEffect(() => {
		getBalances();
	}, [filterDate, focused]);

	return (
		<View style={styles.balanceContainer}>
			{Object.keys(balance).length > 0 ? (
				<>
					<View style={styles.row}>
						<View>
							<View style={styles.row}>
								<MaterialIcons style={{ marginRight: 10, marginTop: 10 }} name="account-balance" size={20} color="#343737" />
								<View>
									<Text style={balance.presentAccountBalance >= 0 ? styles.positive : styles.negative}>{currencyFormat(balance.presentAccountBalance)}</Text>
									<Caption style={{ marginTop: 0 }}>Balanço total</Caption>
								</View>
							</View>
						</View>
						<View style={{ flexDirection: 'row', marginLeft: 30 }}>
							<FontAwesome5 style={{ marginRight: 10, marginTop: 10 }} name="balance-scale" size={20} color="#484c4c" />
							<View>
								<Text style={balance.presentReleaseBalance >= 0 ? styles.positive : styles.negative}>{currencyFormat(balance.presentReleaseBalance)}</Text>
								<Caption style={{ marginTop: 0 }}>Balanço mensal</Caption>
							</View>
						</View>
					</View>
					{showFuture ?
						<View style={[styles.row, { marginTop: 20 }]}>
							<View>
								<View style={styles.row}>
									<MaterialCommunityIcons style={{ marginRight: 10, marginTop: 10 }} name="bank-plus" size={20} color="#343737" />
									<View>
										<Text style={balance.futureAccountBalance >= 0 ? styles.positive : styles.negative}>{currencyFormat(balance.futureAccountBalance)}</Text>
										<Caption style={{ marginTop: 0 }}>Futuro total</Caption>
									</View>
								</View>
							</View>
							<View style={{ flexDirection: 'row', marginLeft: 30 }}>
								<FontAwesome5 style={{ marginRight: 10, marginTop: 10, fontWeight: 100 }} name="balance-scale-right" size={20} color="#484c4c" />
								<View>
									<Text style={balance.futureReleaseBalance >= 0 ? styles.positive : styles.negative}>{currencyFormat(balance.futureReleaseBalance)}</Text>
									<Caption style={{ marginTop: 0 }}>Futuro mensal</Caption>					
								</View>
							</View>
						</View>
						:
						<></>
					}
					<TouchableOpacity style={styles.arrowPosition} onPress={futureBalance}>
						<AntDesign name={arrowIcon} size={14} color="black" />
					</TouchableOpacity>
				</>
			) : <></>}
		</View>
	)
}