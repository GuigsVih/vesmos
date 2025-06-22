import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from "@react-navigation/native";
import { View, StatusBar, TouchableOpacity } from 'react-native';

import { styles } from './styles';
import List from '../../../components/Release/List';
import MonthCarousel from '../../../components/MonthCarousel';
import { getBetweenDatesFilter } from '../../../core/helpers/filters';

export default function ReleasesList({ navigation }) {
	const [filterDate, setFilterDate] = useState();
	const isFocused = useIsFocused();

	const fetchBetweenDates = (month) => {
		const currentYear = new Date().getFullYear();
		setFilterDate(getBetweenDatesFilter(currentYear, month));
	}

	useEffect(() => {
		const stackParent = navigation.dangerouslyGetParent();
		if (stackParent && isFocused) {
			stackParent.setOptions({
				headerRight: () => {
					return (
						<TouchableOpacity style={{ marginRight: 30 }}>
							<AntDesign name="filter" size={24} color="#fff" />
						</TouchableOpacity>
					)
				}
			});
		}
	}, [isFocused]);
	return (
		<>
			<StatusBar
				backgroundColor="#623aa7"
				barStyle={'light-content'}>
			</StatusBar>
			<View style={styles.container}>
				<MonthCarousel fetchBetweenDates={fetchBetweenDates}/>
				{filterDate ?
					<List
						focused={isFocused}
						filterDate={filterDate}
						navigation={navigation}
					/>
					: <></>
				}
			</View>
		</>
	);
}