import React, { useEffect, useState } from 'react';
import { Text, View, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native';
import CurrencyInput from 'react-native-currency-input';

import { styles } from './styles';
import Input from '../../../components/Input';
import CategorySelect from '../../../components/Category/CategorySelect';
import DatePicker from '../../../components/DatePicker';
import RepeatCharge from '../../../components/RepeatCharge';
import PaymentSelect from '../../../components/Payment/PaymentSelect';
import Button from '../../../components/Button';

const TYPES = {
	'expense': 'despesa',
	'revenue': 'receita',
	'transfer': 'transferência'
};

const DEFAULT_VALUES = {
	value: 0,
	description: "",
	paymentDate: new Date(),
	paymentId: null,
	categoryId: null,
	repeatCharge: {
		option: null,
		unitOfMeasurement: null,
		time: null
	}
};

export default function AddRelease({ route, navigation }) {

	const [data, setData] = useState(DEFAULT_VALUES);
	const [borderColor, setBorderColor] = useState('rgba(0, 0, 0, 0.54)');

	const onFocus = () => {
		setBorderColor("#731cef")
	}

	const onBlur = () => {
		setBorderColor("rgba(0, 0, 0, 0.54)");
	}

	const create = () => {
		console.log(data);
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
							value={data.value}
							onChangeValue={(value) => setData({...data, value: value})}
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
						<Input 
							label={"Descrição"} 
							mode={'outlined'} 
							style={styles.descriptionInput} 
							value={data.description} 
							onChange={(value) => setData({...data, description: value})} />
						<View style={styles.selectionContainer}>
							<CategorySelect
							 	onSelect={(value) => setData({...data, categoryId: value})}
							/>
						</View>
						<View style={styles.selectionContainer}>
							<DatePicker
								selectValue={data.paymentDate.toISOString().split('T')[0]}
								datePickerValue={data.paymentDate}
								onSelect={(value) => setData({...data, paymentDate: value})}
							/>
						</View>
						<View style={styles.selectionContainer}>
							<PaymentSelect								
								onSelect={(value) => setData({...data, paymentId: value})}
							/>
						</View>
						<View style={[styles.selectionContainer, { marginTop: 10 }]}>
							<RepeatCharge value={data.value} chargeType={TYPES[route.params.type]} setRepeatData={(option, unitOfMeasurement, time) => setData({ ...data, repeatCharge: { ...data.repeatCharge, option, unitOfMeasurement, time }})} />
						</View>
						<Button
							title={`Salvar`}
							loading={false}
							buttonStyle={styles.buttonStyle}
							titleStyle={{ marginRight: 10 }}
							onPress={create}
						/>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</>
	);
}