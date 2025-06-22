import React, { useEffect, useState } from 'react';

import moment from 'moment';
import CurrencyInput from 'react-native-currency-input';
import { Text, View, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native';

import schema from './schema';
import { styles } from './styles';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import DatePicker from '../../../components/DatePicker';
import RepeatCharge from '../../../components/RepeatCharge';
import { createRelease, updateRelease } from '../../../core/services/release';
import CustomSnackbar from '../../../components/CustomSnackbar';
import { Caption, HelperText, Switch } from 'react-native-paper';
import PaymentSelect from '../../../components/Payment/PaymentSelect';
import CategorySelect from '../../../components/Category/CategorySelect';
import { createYupErrorsObject } from '../../../core/helpers/createYupErrorsObject';
import { createRequestErrorObject } from '../../../core/helpers/createRequestErrorObject';
import { ScrollView } from 'react-native-gesture-handler';

const TYPES = {
	'expense': 'despesa',
	'revenue': 'receita',
	'transfer': 'transferência'
};

const DEFAULT_VALUES = {
	id: null,
	value: 0,
	description: "",
	paymentDate: new Date(),
	paymentId: "",
	categoryId: "",
	status: "UNPAID",
	payment: {
		type: "",
		id: ""
	},
	repeatCharge: {
		option: "",
		time: "",
		unitOfMeasurement: ""
	},
	type: "EXPENSE"
};

export default function ReleaseForm({ route, navigation }) {

	const [errors, setErrors] = useState(false);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(DEFAULT_VALUES);
	const [snackbarVisible, setSnackbarVisible] = useState(false);
	const [snackbarType, setSnackbarType] = useState();
	const [borderColor, setBorderColor] = useState('rgba(0, 0, 0, 0.54)');

	const onFocus = () => {
		setBorderColor("#731cef")
	}

	const onBlur = () => {
		setBorderColor("rgba(0, 0, 0, 0.54)");
	}

	const save = () => {
		if (data.id) {
			update();
		} else {
			create();
		}
	}

	const create = async () => {
		setErrors({});
		setLoading(true);
		try {
			await schema.validate(data, { abortEarly: false });
			await createRelease(getParams());
			navigation.navigate("BottomMenu");
		} catch (e) {
			treatErrorResponse(e);
		}
		setLoading(false);
	}

	const update = async () => {
		setErrors({});
		setLoading(true);
		try {
			await schema.validate(data, { abortEarly: false });
			await updateRelease(getParams());
			navigation.navigate("BottomMenu");
		} catch (e) {
			treatErrorResponse(e);			
		}
		setLoading(false);
	}

	const getParams = () => {
		const paymentDate = data.paymentDate.toISOString().split('T')[0];
		const value = data.value * -1;
		const params = { ...data, ...{ paymentDate }, ...{ value } };
		return params;
	}
	const treatErrorResponse = (e) => {
		if (e.name === "ValidationError" && e.inner) {
			setErrors(createYupErrorsObject(e));
		} else if (e?.response?.status == 400) {
			setErrors(createRequestErrorObject(e.response.data));
		} else {
			setSnackbarType("error");
			setSnackbarVisible(true);
		}
	}

	const formatExpenseToSet = (expense) => {
		expense.paymentDate = moment(route.params.paymentDate).toDate();
		expense.value = route.params.value * -1;
		if (expense.creditCardId != null) {
			expense.payment = { type: "credit_cards", id: expense.creditCardId };
		} else {
			expense.payment = { type: "accounts", id: expense.accountId };
		}
		setData(expense);
	}

	useEffect(() => {
		if (route.params?.id) {
			formatExpenseToSet(route.params);
		}

	}, [route.params]);

	return (
		<>
			<StatusBar
				backgroundColor="#623aa7"
				barStyle={'light-content'}>
			</StatusBar>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<View style={styles.container}>
					<View style={styles.releaseTypeContainer}>
						<Text style={styles.typeText}>{data.id ? "Editar despesa" : "Nova despesa"}</Text>
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
							style={[styles.currencyInput, { borderColor: borderColor, borderBottomWidth: borderColor == '#731cef' ? 2 : 0 }]}
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
								categoryId={data.categoryId}
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
								value={data.payment}
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
						{!data.id &&
							<View style={[styles.selectionContainer, { marginTop: 10 }]}>
								<RepeatCharge value={data.value} chargeType={TYPES["expense"]} setRepeatData={(option, unitOfMeasurement, time) => setData({ ...data, repeatCharge: { ...data.repeatCharge, option, unitOfMeasurement, time } })} />
							</View>
						}
						<View style={[styles.selectionContainer, { marginTop: 0, alignItems: 'flex-start' }]}>
							<View style={{ flexDirection: 'row' }}>
								<Switch
									color={"#623aa7"}
									value={data.status == "PAID" ? true : false}
									onValueChange={(value) => setData({ ...data, status: value ? "PAID" : "UNPAID" })}
								/>
								<Caption style={{ marginTop: 15, marginLeft: 10 }}>Pago?</Caption>
							</View>
						</View>
						<Button
							title={`Salvar`}
							loading={loading}
							disabled={loading}
							buttonStyle={styles.buttonStyle}
							titleStyle={{ marginRight: 10 }}
							onPress={save}
						/>
						<View style={{ flex: 1, padding: 50 }}></View>
					</ScrollView>
					<CustomSnackbar
						visible={snackbarVisible}
						setVisible={setSnackbarVisible}
						type={snackbarType}
						message={data.id ? "Erro ao editar despesa" : "Erro ao criar despesa"}
					/>
				</View>
			</TouchableWithoutFeedback>
		</>
	);
}