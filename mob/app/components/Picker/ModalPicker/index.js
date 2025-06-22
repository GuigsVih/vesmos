import React, { Fragment } from 'react';
import { View, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Text, ScrollView } from 'react-native';
import Modal from "react-native-modal";
import { Divider } from 'react-native-paper';
import { styles } from './styles';

export default function ModalPicker({ visible, setVisible, handleValue, items }) {

  return (
    <>
      <Modal
        isVisible={visible}
        onDismiss={() => setVisible(false)}
        onBackButtonPress={() => setVisible(false)}
        onSwipeComplete={() => setVisible(false)}
        style={{ justifyContent: 'center', margin: 0 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <View style={styles.content}>
              <ScrollView>
                {Object.keys(items).map((data, index) => (
                  <Fragment key={index}>
                    {index > 0 &&
                      <Divider />
                    }
                    <TouchableOpacity onPress={() => handleValue(data)} >
                      <View style={{ marginTop: 20, marginBottom: 20 }}>
                        <Text style={{ fontSize: 15 }}>{items[data]}</Text>
                      </View>
                    </TouchableOpacity>
                  </Fragment>
                ))}
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  )
}