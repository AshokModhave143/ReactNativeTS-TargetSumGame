import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export interface IAppHeader {
  title: string;
}
export const AppHeader: React.FC<IAppHeader> = (props: IAppHeader) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
    height: '20%',
  },
  title: {
    color: 'yellow',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
