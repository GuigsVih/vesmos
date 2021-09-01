import React, { useState } from 'react';

import Carousel from 'react-native-snap-carousel';
import { View } from 'react-native';

import { items } from './config';
import { styles } from './styles';
import { Caption } from 'react-native-paper';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function MonthCarousel() {

	const [activeIndex, setActiveIndex] = useState(new Date().getMonth() - 1);
	const [carousel, setCarousel] = useState();

	const setNewIndex = (index) => {
		setActiveIndex(index);
	}

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
					sliderWidth={430}
					itemWidth={100}
					activeSlideOffset={20}
					firstItem={activeIndex}
					scrollEnabled={true}
					activeSlideAlignment="center"
					renderItem={renderItems}
					onSnapToItem={index => setActiveIndex(index)}
				/>
			</View>
		</View>
	)
}