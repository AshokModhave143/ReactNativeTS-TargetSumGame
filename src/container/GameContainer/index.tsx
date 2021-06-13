import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Game} from './game';

export const GameContainer = () => {
  return (
    <View style={styles.container}>
      <Game randomNumberCount={6} initialSeconds={10} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
  },
});
