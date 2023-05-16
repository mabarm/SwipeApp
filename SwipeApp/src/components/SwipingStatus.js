import React from 'react';
import {StyleSheet, Text, Animated} from 'react-native';

function SwipingStatus({status, positionRef}) {
  const likeOpacity = positionRef.x.interpolate({
    inputRange: [10, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const nopeOpacity = positionRef.x.interpolate({
    inputRange: [-100, -10],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  return (
    <Animated.View
      style={[
        SwipingStatusStyles.mainView,
        status !== 'like' ? {right: 20} : {left: 20},
        {
          transform:
            status == 'like' ? [{rotate: '30deg'}] : [{rotate: '-30deg'}],
          opacity: status == 'like' ? likeOpacity : nopeOpacity,
        },
      ]}>
      <Text
        style={[
          SwipingStatusStyles.text,
          {
            color: status == 'like' ? 'red' : 'green',
          },
        ]}>
        {status}
      </Text>
    </Animated.View>
  );
}

const SwipingStatusStyles = StyleSheet.create({
  mainView: {
    position: 'absolute',
    top: 40,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    paddingHorizontal: 6,
  },
  text: {
    fontSize: 30,
  },
});

export default React.memo(SwipingStatus);
