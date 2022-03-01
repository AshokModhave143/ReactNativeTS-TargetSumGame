import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {GameStatusEnum} from './game';

export interface IGameStatus {
  status?: string;
}
export const GameStatus: React.FC<IGameStatus> = (props: IGameStatus) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.status, styles[`${props.status}`]]}>
        {props.status}
      </Text>
      {props.status === GameStatusEnum.PLAYING && (
        <Text>All the best!!! Select the numbers to play.</Text>
      )}
      {props.status === GameStatusEnum.WON && (
        <Text>Congratulations!!! You can try more.</Text>
      )}
      {props.status === GameStatusEnum.LOST && (
        <Text>Awww... No problem, you can try as many times you want.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 20,
  },
  status: {
    // paddingHorizontal: 20,
    // paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'yellow',
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  PLAYING: {
    color: 'blue',
  },
  WON: {
    color: 'green',
  },
  LOST: {
    color: 'red',
  },
});
