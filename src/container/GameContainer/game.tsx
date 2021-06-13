import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button, Alert } from 'react-native'
import { RandomNumber } from './randomNumber'

export interface IGame {
    randomNumberCount: number
}
export const Game: React.FC<IGame> = (props: IGame) => {
    const [target, setTarget] = useState(0)
    const [inputs, setInputs] = useState([])
    const [selectedNumbers, setSelectedNumbers] = useState([]) 

    const generateRandomNumbers = () => {
        const randomNumbers: any = Array.from({ length: props.randomNumberCount })
                                    .map(() => 1 + Math.floor(10 * Math.random()))
        const randomTarget: number = randomNumbers.slice(0, props.randomNumberCount - 2)
                                .reduce((acc, curr) => acc + curr, 0)

        // TODO: shuffle random numbers

        setTarget(randomTarget)
        setInputs(randomNumbers)
    }
    useEffect(() => {
        generateRandomNumbers()
    }, [])

    const isNumberSelected = (numberIndex): boolean => {
        return selectedNumbers.indexOf(numberIndex) >= 0
    }
    const selectNumber = (numberIndex) => {
        setSelectedNumbers([...selectedNumbers, numberIndex])
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.topPanel}>
                <Button title={'Generate'} onPress={generateRandomNumbers}/>
                <Text style={styles.randomCount}>Random Count: {props.randomNumberCount}</Text>
            </View>
            <View style={styles.resultContainer}>
                <Text style={styles.target}>{target}</Text>
            </View>
            <View style={styles.inputContainer}>
                {inputs && inputs.map((input, index) => (
                    <RandomNumber key={index} id={index} inputNumber={input} isDisabled={isNumberSelected(index)} onPress={selectNumber} />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'space-evenly'
    },
    topPanel: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'blue'
    },
    randomCount: {
        padding: 5,
        color: 'yellow'
    },
    resultContainer: {
        flex: 1,
        height: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ddd'
    },
    target: {
        fontSize: 40,
        color: 'blue',
        textAlign: 'center'
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
        margin: 30
    }
})