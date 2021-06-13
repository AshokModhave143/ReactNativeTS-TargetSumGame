import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { AppHeader } from '../Header'
import { OrderGroceryForm } from '../../components/orderForm'
import { GameContainer } from '../GameContainer'

export interface IMainApp {
    title: string
}
export const MainApp: React.FC<IMainApp> = (props: IMainApp) => {
    return (
        <View style={styles.container}>
            <AppHeader {...props} />
            {/* <OrderGroceryForm></OrderGroceryForm> */}
            <GameContainer />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: 'Times New Roman'
    }
})