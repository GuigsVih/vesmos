import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { fetchReleases } from '../../../core/services/release';

export default function ExpensesList() {

	const getReleases = async () => {
		console.log('here');
		try {
			const res = await fetchReleases();
			console.log(res);
		} catch (e) {
			console.log(e?.response?.status);
		}
	}

	useEffect(() => {
		getReleases();
	}, []);

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Muito</Text>
		</View>
	);
}