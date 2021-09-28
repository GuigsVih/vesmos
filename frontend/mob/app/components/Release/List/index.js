import React, { Fragment, useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Caption, Divider } from 'react-native-paper';
import { styles } from './styles';
import SwipeItem from '../../SwipeItem';
import { fetchReleases } from '../../../core/services/release';
import { ActivityIndicator } from 'react-native';
import { formatDate } from '../../../core/helpers/format';
import Balance from '../Balance';

export default function List({ focused, filterDate }) {

	const [releases, setReleases] = useState({});
	const [loading, setLoading] = useState(false);

	const getReleases = async () => {
		setLoading(true);
		try {
			const res = await fetchReleases(filterDate);
			setLoading(false);
			setReleases(res.data);
		} catch (e) {
			setLoading(false);
		}
	}

	const deleteItem = (index) => {
		//do nothing yet
	};

	useEffect(() => {
		getReleases();
	}, [focused, filterDate]);

	return (
		<View elevation={12 * 5} style={styles.container}>
			<Balance filterDate={filterDate} focused={focused} />
			<Divider />
			{!loading ?
				(Object.keys(releases).length > 0 ?
					<ScrollView>
						{Object.keys(releases).map((arr, idx) => (
							<Fragment key={idx}>
								<View style={{ flexDirection: 'row' }}>
									<View style={{ padding: 10 }} />
									<Caption style={{ marginTop: 20 }}>{formatDate(arr)}</Caption>
									<Divider />
								</View>
								<View>
									{releases[arr].map((item, index) => (
										<Fragment key={index}>
											{index > 0 ?
												<Divider />
												: <></>}
											<SwipeItem key={item.id} data={item} handleDelete={() => deleteItem(item.id)} />
										</Fragment>
									))}
								</View>
							</Fragment>
						))}
					</ScrollView>
					:
					<View style={styles.alignCenter}>
						<Caption>Oops! Você não possui nenhuma transação cadastrada.</Caption>
					</View>
				) : <ActivityIndicator size={'large'} style={styles.alignCenter} color={"#dadad3"} />
			}

		</View>
	);
}