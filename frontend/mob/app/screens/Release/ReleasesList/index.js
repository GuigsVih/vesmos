import React, { useState } from 'react';
import { View, Text } from 'react-native';
import MonthCarousel from '../../../components/MonthCarousel';
import List from '../../../components/Release/List';
import { styles } from './styles';

export default function ExpensesList() {

	return (
		<View style={styles.container}>
			<MonthCarousel />
			<List />
		</View>
	);
}