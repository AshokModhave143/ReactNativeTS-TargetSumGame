import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Game} from './game';

export const GameContainer = () => {
  const [gameId, setGameId] = React.useState(1);

  const resetGame = () => {
    setGameId(prevState => prevState + 1);
  };
  return (
    <View style={styles.container}>
      <Game
        key={gameId}
        onPlayAgain={resetGame}
        randomNumberCount={6}
        initialSeconds={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
  },
});
