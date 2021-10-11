import React, { useState } from 'react';
import { Text, View, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native';
import CurrencyInput from 'react-native-currency-input';

import { styles } from './styles';
import Input from '../../../components/Input';
import CategorySelect from '../../../components/Category/CategorySelect';

const TYPES = {
	'expense': 'despesa',
	'revenue': 'receita',
	'transfer': 'transferência'
}

export default function AddRelease({ route, navigation }) {

	const [value, setValue] = useState();
	const [borderColor, setBorderColor] = useState('rgba(0, 0, 0, 0.54)');

	const onFocus = () => {
		setBorderColor("#731cef")
	}

	const onBlur = () => {
		setBorderColor("rgba(0, 0, 0, 0.54)");
	}

	return (
		<>
			<StatusBar
				backgroundColor="#623aa7"
				barStyle={'light-content'}>
			</StatusBar>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<View style={styles.container}>
					<View style={styles.releaseTypeContainer}>
						<Text style={styles.typeText}>Nova {TYPES[route.params.type]}</Text>
					</View>
					<View style={styles.formContainer}>
						<CurrencyInput
							value={value}
							onChangeValue={setValue}
							selectionColor={'#731cef'}
							prefix="R$ "
							delimiter="."
							separator=","
							precision={2}
							placeholder={"R$ 0,00"}
							onBlur={() => onBlur()}
							onFocus={() => onFocus()}
							style={[styles.currencyInput, { borderColor: borderColor, borderWidth: borderColor == '#731cef' ? 2 : 1 }]}
						/>
						<Input label={"Descrição"} mode={'outlined'} style={styles.descriptionInput} />
						<View style={styles.categoryContainer}>
							<CategorySelect />
						</View>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</>
	);
}