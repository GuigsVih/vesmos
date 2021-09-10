import React, { useEffect, useState } from 'react';
import { View, StatusBar } from 'react-native';
import MonthCarousel from '../../../components/MonthCarousel';
import List from '../../../components/Release/List';
import { styles } from './styles';
import { useIsFocused } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { getBetweenDatesFilter } from '../../../core/helpers/filters';

export default function ReleasesList({ navigation }) {
	const [filterDate, setFilterDate] = useState({});
	const isFocused = useIsFocused();
	const currentYear = new Date().getFullYear();
	const currentMonth = new Date().getMonth() + 1;

	const fetchBetweenDates = () => {
		return getBetweenDatesFilter(currentYear, currentMonth);
	}

	useEffect(() => {
		setFilterDate(fetchBetweenDates());
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
				<MonthCarousel />
				<List 
					focused={isFocused}
					filterDate={filterDate}
				/>
			</View>
		</>
	);
}