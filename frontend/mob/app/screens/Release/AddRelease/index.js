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
	const [borderColor, setBorderColor] = useState('#e7e7e7');

	const onFocus = () => {
		setBorderColor("#731cef")
	}

	const onBlur = () => {
		setBorderColor("#e7e7e7");
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
							style={[styles.currencyInput, { borderBottomColor: borderColor, borderBottomWidth: borderColor == '#731cef' ? 3 : 0 }]}
						/>
						<Input label={"Descrição"} style={styles.descriptionInput} />
						<View style={styles.categoryContainer}>
							<CategorySelect />
						</View>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</>
	);
}