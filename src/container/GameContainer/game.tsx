import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import {RandomNumber} from './randomNumber';
import {GameStatus as GameStatusComponent} from './gameStatus';
import shuffle from 'lodash.shuffle';

export interface IGame {
  randomNumberCount: number;
  initialSeconds: number;
  onPlayAgain: () => void;
}
export enum GameStatusEnum {
  PLAYING = 'PLAYING',
  WON = 'WON',
  LOST = 'LOST',
}

export const Game: React.FC<IGame> = (props: IGame) => {
  const [target, setTarget] = useState(0);
  const [inputs, setInputs] = useState([]);
  const [selectedIds, setSelectedIds] = useState<any>([]);
  const [gameStatus, setGameStatus] = useState(GameStatusEnum.PLAYING);
  const [remainingSeconds, setRemainingSeconds] = useState(
    props.initialSeconds,
  );
  const [intervalId, setIntervalId] = useState<any>(null);

  useEffect(() => {
    generateRandomNumbers();
    startTimer();
  }, []);
  useEffect(() => {
    setGameStatus(calculateGameStatus());
  }, [selectedIds]);

  useEffect(() => {
    if (remainingSeconds <= 0 || gameStatus !== GameStatusEnum.PLAYING) {
      stopTimer();
      setGameStatus(GameStatusEnum.LOST);
    }
  }, [remainingSeconds]);

  const startTimer = () => {
    const timer = setInterval(() => {
      setRemainingSeconds(prevCount => prevCount - 1);
    }, 1000);
    setIntervalId(timer);
  };
  const stopTimer = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const generateRandomNumbers = () => {
    let randomNumbers: any = Array.from({
      length: props.randomNumberCount,
    }).map(() => 1 + Math.floor(10 * Math.random()));

    const randomTarget: number = randomNumbers
      .slice(0, props.randomNumberCount - 2)
      .reduce((acc, curr) => acc + curr, 0);

    setGameStatus(calculateGameStatus());
    setTarget(randomTarget);
    setInputs(shuffle(randomNumbers));
    resetValues();
  };

  const resetValues = () => {
    setSelectedIds([]);
    setGameStatus(GameStatusEnum.PLAYING);
    setRemainingSeconds(props.initialSeconds);
    setIntervalId(null);
  };

  const isNumberSelected = (numberIndex: number): boolean => {
    return selectedIds.indexOf(numberIndex) >= 0;
  };
  const selectNumber = (numberIndex: number) => {
    setSelectedIds([...selectedIds, numberIndex]);
  };

  const calculateGameStatus = () => {
    const sumSelected = selectedIds.reduce((acc, curr) => {
      return acc + inputs[curr];
    }, 0);
    if (remainingSeconds === 0) return GameStatusEnum.LOST;
    if (sumSelected < target) return GameStatusEnum.PLAYING;
    if (sumSelected === target) return GameStatusEnum.WON;
    if (sumSelected > target) return GameStatusEnum.LOST;

    return GameStatusEnum.PLAYING;
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topPanel}>
        {gameStatus !== GameStatusEnum.PLAYING && (
          <Button title={'Restart'} onPress={props.onPlayAgain} />
        )}
        <Text style={styles.randomCount}>Interval: {remainingSeconds}</Text>
        <Text style={styles.randomCount}>
          Random Count: {props.randomNumberCount}
        </Text>
      </View>
      <View style={styles.resultContainer}>
        <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>
          {target}
        </Text>
      </View>
      <View style={styles.inputContainer}>
        {inputs &&
          inputs.map((input, index) => (
            <RandomNumber
              key={index}
              id={index}
              inputNumber={input}
              isDisabled={
                isNumberSelected(index) || gameStatus !== GameStatusEnum.PLAYING
              }
              onPress={selectNumber}
            />
          ))}
      </View>
      <GameStatusComponent status={gameStatus} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'space-evenly',
  },
  topPanel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'blue',
  },
  randomCount: {
    padding: 5,
    color: 'yellow',
  },
  resultContainer: {
    flex: 1,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
  target: {
    fontSize: 40,
    color: 'blue',
    textAlign: 'center',
    padding: 20,
    borderRadius: 50,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: 30,
  },
  STATUS_PLAYING: {
    backgroundColor: '#bbb',
  },
  STATUS_WON: {
    backgroundColor: 'green',
    color: 'yellow',
  },
  STATUS_LOST: {
    backgroundColor: 'red',
    color: 'yellow',
  },
});
