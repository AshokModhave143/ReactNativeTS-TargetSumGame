import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

export const OrderGroceryForm = props => {
  const fields = {
    itemName: {
      label: 'Item',
      inputProps: {
        placeHolder: 'Enter gocery item',
        type: 'text',
      },
    },
    quantity: {
      label: 'Quantity',
      inputProps: {
        type: 'number',
        min: 0,
        max: 100,
      },
    },
  };
  const fieldKeys = Object.keys(fields);

  const formField = key => {
    const f = fields[key];
    return (
      <View style={styles.formField}>
        <Text>{f.label}</Text>
        <TextInput {...f.inputProps} style={styles.textInputStyle}></TextInput>
      </View>
    );
  };

  return (
    <View style={styles.formContainer}>
      <Text>Grocery Form</Text>
      <View style={styles.formSection}>
        {fieldKeys.map(key => formField(key))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    // backgroundColor: 'powderblue'
  },
  formSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  formField: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  textInputStyle: {
    borderColor: 'black',
    borderWidth: 1,
  },
});
