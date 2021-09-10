import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Caption, Divider } from 'react-native-paper';
import { styles } from './styles';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import SwipeItem from '../../SwipeItem';
import { FlatList } from 'react-native';
import { fetchReleases } from '../../../core/services/release';
import { ActivityIndicator } from 'react-native';
import { formatDate } from '../../../core/helpers/format';

export default function List({ focused, filterDate }) {

	const [releases, setReleases] = useState({});
	const [loading, setLoading] = useState(false);

	const getReleases = async () => {
		setLoading(true);
		try {;
			const res = await fetchReleases(filterDate);
			setLoading(false);
			setReleases(res.data);
		} catch (e) {
			setLoading(false);
		}
	}

	const deleteItem = (index) => {
		const arr = [...lists];
		arr.splice(index, 1);
		setLists(arr);
	};

	useEffect(() => {
		getReleases();
	}, [focused]);

	return (
		<View elevation={12 * 5} style={styles.container}>
			<View style={styles.balanceContainer}>
				<View style={styles.row}>
					<View>
						<View style={styles.row}>
							<MaterialIcons style={{ marginRight: 10, marginTop: 2 }} name="account-balance" size={30} color="#0e1111" />
							<View>
								<Text style={styles.positive}>R$ 1000,00</Text>
								<Caption style={{ marginTop: 0 }}>Balanço total</Caption>
							</View>
						</View>
					</View>
					<View style={{ flexDirection: 'row', marginLeft: 30 }}>
						<FontAwesome style={{ marginRight: 10, marginTop: 2 }} name="balance-scale" size={30} color="#0e1111" />
						<View>
							<Text style={styles.negative}>R$ -500,00</Text>
							<Caption style={{ marginTop: 0 }}>Balanço mensal</Caption>
						</View>
					</View>
				</View>
			</View>
			<Divider />
			{!loading ?
				(Object.keys(releases).length > 0 ?
					(Object.keys(releases).map(arr => (
						<>
							<View style={{ flexDirection: 'row' }}>
								<View style={{ padding: 10 }} />
								<Caption style={{ marginTop: 20 }}>{formatDate(arr)}</Caption>
								<Divider />
							</View>
							<View>
								<FlatList
									data={releases[arr]}
									renderItem={({ item }) => {
										return <SwipeItem data={item} handleDelete={() => deleteItem(item.id)} />;
									}}
									keyExtractor={(item) => item.id.toString()}
									ItemSeparatorComponent={() => {
										return <Divider />;
									}}
								/>
							</View>
						</>
					)))
					:
					<View style={styles.alignCenter}>
						<Caption>Oops! Você não possui nenhuma transação cadastrada.</Caption>
					</View>
				) : <ActivityIndicator size={'large'} style={styles.alignCenter} color={"#dadad3"} />
			}

		</View>
	);
}