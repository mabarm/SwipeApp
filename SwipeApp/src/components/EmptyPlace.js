import React from 'react';
import {TouchableOpacity, Text, StyleSheet, SafeAreaView} from 'react-native';

function EmptyPlace({reload}) {
  return (
    <SafeAreaView style={EmptyPlaceStyles.mainView}>
      <Text style={EmptyPlaceStyles.text}>No more places to show</Text>
      <TouchableOpacity style={EmptyPlaceStyles.button} onPress={reload}>
        <Text style={EmptyPlaceStyles.text}>Reload</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const EmptyPlaceStyles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 60,
    width: 160,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
    top: 40,
  },
  text: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
  },
});

export default React.memo(EmptyPlace);
