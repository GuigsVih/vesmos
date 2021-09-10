import React, { useEffect } from 'react';
import {
	View,
	Text,
	Animated,
	TouchableOpacity,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { styles } from './styles';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Caption, Divider } from 'react-native-paper';
import { currencyFormat, formatDate } from '../../core/helpers/format';

export default function SwipeItem({ handleDelete, data }) {
	const leftSwipe = (progress, dragX) => {
		const scale = dragX.interpolate({
			inputRange: [0, 100],
			outputRange: [0, 1],
			extrapolate: 'clamp',
		});

		return (
			<TouchableOpacity onPress={handleDelete} activeOpacity={0.6}>
				<View style={[styles.box, styles.delete]}>
					<Animated.Text style={{ transform: [{ scale: scale }] }}>
						<Feather name="trash-2" size={32} color="white" />
					</Animated.Text>
				</View>
			</TouchableOpacity>
		);
	};

	const righSwipe = (progress, dragX) => {
		const scale = dragX.interpolate({
			inputRange: [-100, 0],
			outputRange: [1, 0],
			extrapolate: 'clamp',
		});

		return (
			<TouchableOpacity onPress={handleDelete} activeOpacity={0.6}>
				<View style={[styles.box, styles.edit]}>
					<Animated.Text style={{ transform: [{ scale: scale }] }}>
						<Feather name="edit" size={32} color="white" />
					</Animated.Text>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<>
			<Swipeable renderLeftActions={leftSwipe} renderRightActions={righSwipe}>
				<View style={styles.container}>
					<View style={{ flexDirection: 'row', flex: 1 }}>
						<View style={[{ backgroundColor: data.categoryBadgeColor }, styles.categoryIcon]}>
							<Ionicons name={data.categoryIcon} size={24} color="white" />
						</View>
						<View style={{ marginLeft: 20, flex: 1 }}>
							<Text>{data.description}</Text>
							<Caption>{data.categoryName}</Caption>
						</View>
						<View>
							<Caption style={
								[
									data.type === 'EXPENSE' ? styles.negative : styles.positive,
									styles.textRight, { marginBottom: 0 }
								]
							}>
								{currencyFormat(data.value)}
							</Caption>
						</View>
					</View>
				</View>
			</Swipeable>
		</>
	);
};