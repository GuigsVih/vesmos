import React, { Fragment, useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Caption, Divider } from 'react-native-paper';
import { styles } from './styles';
import SwipeItem from '../../SwipeItem';
import { fetchReleases, removeRelease } from '../../../core/services/release';
import { ActivityIndicator } from 'react-native';
import { formatDate } from '../../../core/helpers/format';
import Balance from '../Balance';
import ModalConfirm from '../../ModalConfirm';

export default function List({ focused, filterDate, navigation }) {

	const [releases, setReleases] = useState({});
	const [loading, setLoading] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [messageConfirmModal, setMessageConfirmModal] = useState();
	const [idToDelete, setIdToDelete] = useState();

	const getReleases = async () => {
		setLoading(true);
		try {
			const res = await fetchReleases(filterDate);
			setLoading(false);
			setReleases(res.data);
		} catch (e) {
			setLoading(false);
		}
	}

	const remove = async () => {
		setShowConfirmModal(false);
		try {
			await removeRelease(idToDelete);
			getReleases();
		} catch (e) {
			//
		}
		setIdToDelete(null);
	}

	const showDeleteModal = (data) => {
		setShowConfirmModal(true);
		setIdToDelete(data.id);
		setMessageConfirmModal(`Deseja realmente remover o lançamento "${data.description}"?`);
	};

	const editItem = (data) => {
		navigation.navigate("ReleaseForm", data );
	}

	const hideDialog = () => {
		setShowConfirmModal(false);
	}

	useEffect(() => {
		focused && getReleases();
	}, [focused, filterDate]);

	return (
		<>
			<View elevation={12 * 5} style={styles.container}>
				<Balance filterDate={filterDate} focused={focused} />
				<Divider />
				{!loading ?
					(Object.keys(releases).length > 0 ?
						<ScrollView>
							{Object.keys(releases).map((arr, idx) => (
								<Fragment key={idx}>
									<View style={{ flexDirection: 'row' }}>
										<View style={{ padding: 10 }} />
										<Caption style={{ marginTop: 20 }}>{formatDate(arr)}</Caption>
										<Divider />
									</View>
									<View>
										{releases[arr].map((item, index) => (
											<Fragment key={index}>
												{index > 0 ?
													<Divider />
													: <></>}
												<SwipeItem 
													key={item.id} 
													data={item} 
													handleDelete={() => showDeleteModal(item)}
													handleEdit={() => editItem(item)}
												/>
											</Fragment>
										))}
									</View>
								</Fragment>
							))}
						</ScrollView>
						:
						<View style={styles.alignCenter}>
							<Caption>Oops! Você não possui nenhuma transação cadastrada.</Caption>
						</View>
					) : <ActivityIndicator size={'large'} style={styles.alignCenter} color={"#dadad3"} />
				}
				<ModalConfirm
					handle={remove}
					hideDialog={hideDialog}
					visible={showConfirmModal}
					title={"Remover lançamento"}
					message={messageConfirmModal}
				/>
			</View>
		</>
	);
}