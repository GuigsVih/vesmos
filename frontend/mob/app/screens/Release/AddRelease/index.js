import React, { useEffect, useState } from 'react';
import { Text, View, StatusBar, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import CurrencyInput from 'react-native-currency-input';

import { styles } from './styles';
import Input from '../../../components/Input';
import CategorySelect from '../../../components/Category/CategorySelect';
import DatePicker from '../../../components/DatePicker';
import RepeatCharge from '../../../components/RepeatCharge';
import PaymentSelect from '../../../components/Payment/PaymentSelect';
import Button from '../../../components/Button';
import schema from './schema';
import { createYupErrorsObject } from '../../../core/helpers/createYupErrorsObject';
import { Caption, HelperText, Switch } from 'react-native-paper';
import { createRelease } from '../../../core/services/release';
import { createRequestErrorObject } from '../../../core/helpers/createRequestErrorObject';
import CustomSnackbar from '../../../components/CustomSnackbar';

const TYPES = {
	'expense': 'despesa',
	'revenue': 'receita',
	'transfer': 'transferência'
};

const DEFAULT_VALUES = {
	value: 0,
	description: "",
	paymentDate: new Date(),
	paymentId: "",
	categoryId: "",
	status: "PAID",
	type: "EXPENSE",
	payment: {
		type: "",
		id: ""
	},
	repeatCharge: {
		option: "",
		time: "",
		unitOfMeasurement: ""
	}
};

export default function AddRelease({ route, navigation }) {

	const [errors, setErrors] = useState(false);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(DEFAULT_VALUES);
	const [status, setStatus] = useState(true);
	const [snackbarVisible, setSnackbarVisible] = useState(false);
	const [snackbarType, setSnackbarType] = useState();
	const [borderColor, setBorderColor] = useState('rgba(0, 0, 0, 0.54)');

	const onFocus = () => {
		setBorderColor("#731cef")
	}

	const onBlur = () => {
		setBorderColor("rgba(0, 0, 0, 0.54)");
	}

	const create = async () => {
		setErrors({});
		setLoading(true);
		try {
			await schema.validate(data, { abortEarly: false });
			const paymentDate = data.paymentDate.toISOString().split('T')[0];
			const params = { ...data, ...{ paymentDate } };
			const res = await createRelease(params);
			navigation.navigate("BottomMenu");
		} catch (e) {
			if (e.name === "ValidationError" && e.inner) {
				setErrors(createYupErrorsObject(e));
			} else if (e?.response?.status == 400) {
				setErrors(createRequestErrorObject(e.response.data));
			} else {
				setSnackbarType("error");
				setSnackbarVisible(true);
			}
		}
		setLoading(false);
	}

	const setReleaseStatus = (val) => {
		setStatus(val);
		setData({ ...data, status: getStatus(val) });
	}

	const getStatus = (val) => {
		if (val) {
			return "PAID";
		}
		return "UNPAID";
	}

	const setType = (type) => {
		if (type == 'expense') {
			setData({ ...data, type: "EXPENSE" });
		} else {
			setData({ ...data, type: "REVENUE" });
		}
	}

	useEffect(() => {
		setType(route.params.type);
	}, [route.params.type]);

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
					<ScrollView style={styles.formContainer} contentContainerStyle={{ flexGrow: 1 }}>
						<CurrencyInput
							value={data.value}
							onChangeValue={(value) => setData({ ...data, value: value })}
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
						<View style={styles.errorContainer}>
							{errors?.value && (
								<HelperText type="error" visible={errors?.value}>
									{errors?.value}
								</HelperText>
							)}
						</View>
						<Input
							label={"Descrição"}
							mode={'outlined'}
							style={styles.descriptionInput}
							value={data.description}
							onChange={(value) => setData({ ...data, description: value })}
						/>
						<View style={[styles.errorContainer, { marginTop: 0, marginBottom: 10 }]}>
							{errors?.description && (
								<HelperText type="error" visible={errors?.description}>
									{errors?.description}
								</HelperText>
							)}
						</View>
						<View style={styles.selectionContainer}>
							<CategorySelect
								onSelect={(value) => setData({ ...data, categoryId: value })}
							/>
							<View style={[styles.errorContainer, { marginLeft: 0, marginTop: 10 }]}>
								{errors?.categoryId && (
									<HelperText type="error" visible={errors?.categoryId}>
										{errors?.categoryId}
									</HelperText>
								)}
							</View>
						</View>
						<View style={styles.selectionContainer}>
							<DatePicker
								selectValue={data.paymentDate.toISOString().split('T')[0]}
								datePickerValue={data.paymentDate}
								onSelect={(value) => setData({ ...data, paymentDate: value })}
							/>
							<View style={[styles.errorContainer, { marginLeft: 0, marginTop: 10 }]}>
								{errors?.paymentDate && (
									<HelperText type="error" visible={errors?.paymentDate}>
										{errors?.paymentDate}
									</HelperText>
								)}
							</View>
						</View>
						<View style={styles.selectionContainer}>
							<PaymentSelect
								onSelect={(type, id) => setData({ ...data, payment: { ...data.payment, type, id } })}
							/>
							<View style={[styles.errorContainer, { marginLeft: 0, marginTop: 10, marginBottom: 0 }]}>
								{errors["payment.id"] || errors["payment.type"] ? (
									<HelperText type="error" visible={errors["payment.id"] ? errors["payment.id"] : errors["payment.type"]}>
										{errors["payment.id"] ? errors["payment.id"] : errors["payment.type"]}
									</HelperText>
								) : <></>}
							</View>
						</View>
						<View style={[styles.selectionContainer, { marginTop: 10 }]}>
							<RepeatCharge value={data.value} chargeType={TYPES[route.params.type]} setRepeatData={(option, unitOfMeasurement, time) => setData({ ...data, repeatCharge: { ...data.repeatCharge, option, unitOfMeasurement, time } })} />
						</View>
						<View style={[styles.selectionContainer, { marginTop: 0, alignItems: 'flex-start' }]}>
							<View style={{ flexDirection: 'row' }}>
								<Switch value={status} onValueChange={setReleaseStatus} color={"#623aa7"} />
								<Caption style={{ marginTop: 15, marginLeft: 10 }}>Pago?</Caption>
							</View>
						</View>
						<Button
							title={`Salvar`}
							loading={loading}
							disabled={loading}
							buttonStyle={styles.buttonStyle}
							titleStyle={{ marginRight: 10 }}
							onPress={create}
						/>
						<View style={{ flex: 1, padding: 50 }}></View>
					</ScrollView>
					<CustomSnackbar
						visible={snackbarVisible}
						setVisible={setSnackbarVisible}
						type={snackbarType}
						message={`Erro ao criar ${TYPES[route.params.type]}`}
					/>
				</View>
			</TouchableWithoutFeedback>
		</>
	);
}