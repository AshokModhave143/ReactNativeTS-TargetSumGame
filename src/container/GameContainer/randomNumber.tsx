import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'

export interface IRandomNumber {
    id: any
    inputNumber: number,
    isDisabled: boolean,
    onPress: (index) => void
}

export const RandomNumber: React.FC<IRandomNumber> = (props: IRandomNumber) => {
    const handlePress = () => {
        if(props.isDisabled) return
        props.onPress(props.id)
    }
    return (
        <TouchableOpacity onPress={handlePress}>
            <Text style={[styles.input, props.isDisabled && styles.disabledStyle]}>{props.inputNumber}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    input: {
        fontSize: 30,
        color: 'black',
        textAlign: 'center',
        textAlignVertical: 'center',
        margin: 10,
        width: 100,
        height: 100,
        backgroundColor: 'grey',
        borderRadius: 12
    },
    disabledStyle: {
        opacity: 0.3
    }
})