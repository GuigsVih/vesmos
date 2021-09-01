import React, { useState } from 'react';

import Carousel from 'react-native-snap-carousel';
import { View } from 'react-native';

import { items } from './config';
import { styles } from './styles';
import { Caption } from 'react-native-paper';

export default function MonthCarousel() {

	const [activeIndex, setActiveIndex] = useState(0);
	const [carousel, setCarousel] = useState();
	const month = new Date().getMonth();

	const renderItems = ({ item }) => {
		return (
			<View style={styles.itemContainer}>
				<Caption style={styles.monthText}>{item}</Caption>
			</View>
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
					firstItem={month - 1}
					scrollEnabled={true}
					activeSlideAlignment="center"
					renderItem={renderItems}
					onSnapToItem={index => setActiveIndex(index)}
				/>
			</View>
		</View>
	)
}