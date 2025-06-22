import React, { useState, useEffect } from 'react';

import Carousel from 'react-native-snap-carousel';
import { View } from 'react-native';

import { items } from './config';
import { styles } from './styles';
import { Caption } from 'react-native-paper';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function MonthCarousel({ fetchBetweenDates }) {

	const [activeIndex, setActiveIndex] = useState(new Date().getMonth());
	const [carousel, setCarousel] = useState();

	const setNewIndex = (index) => {
		fetchBetweenDates(index + 1);
		setActiveIndex(index);
	}

	const setMonth = () => {
		fetchBetweenDates(activeIndex + 1);
	}

	useEffect(() => {
		setMonth();
	}, []);

	const renderItems = ({ item, index }) => {
		return (
			<TouchableWithoutFeedback onPress={() => setNewIndex(index)}>
			<View style={styles.itemContainer}>
				<Caption style={styles.monthText}>{item}</Caption>
			</View>
			</TouchableWithoutFeedback>
		)
	}

	return (
		<View style={styles.carouselContainer}>
			<View style={styles.alignCarouselCenter}>
				<Carousel
					layout={"default"}
					ref={ref => setCarousel(ref)}
					data={items}
					sliderWidth={415}
					itemWidth={100}
					activeSlideOffset={20}
					inactiveSlideOpacity={0.9}
					firstItem={activeIndex}
					scrollEnabled={true}
					activeSlideAlignment="center"
					renderItem={renderItems}
					onSnapToItem={index => setNewIndex(index)}
				/>
			</View>
		</View>
	)
}