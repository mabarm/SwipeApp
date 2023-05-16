import React from 'react';
import {Dimensions, Image, Text, Animated, StyleSheet} from 'react-native';
import SwipingStatus from './SwipingStatus';

const {height, width} = Dimensions.get('window');

function SwipeCard({
  place,
  firstPlace,
  positionRef,
  dragHandler,
  shouldRotate,
}) {
  const rotate = shouldRotate
    ? positionRef.x.interpolate({
        inputRange: [-100, 0, 100],
        outputRange: ['-10deg', '0deg', '10deg'],
      })
    : '0deg';
  return (
    <Animated.View
      style={[
        SwipeCardStyles.mainView,
        firstPlace && {
          transform: [...positionRef.getTranslateTransform(), {rotate: rotate}],
        },
      ]}
      {...dragHandler}>
      <Image style={SwipeCardStyles.image} source={place.image} />
      {firstPlace && (
        <>
          <SwipingStatus status="like" positionRef={positionRef} />
          <SwipingStatus status="nope" positionRef={positionRef} />
        </>
      )}

      <Text style={SwipeCardStyles.name}>{place.name}</Text>
    </Animated.View>
  );
}

const SwipeCardStyles = StyleSheet.create({
  mainView: {
    height: height - 130,
    width: width - 10,
    alignSelf: 'center',
    position: 'absolute',
    top: 10,
    borderRadius: 6,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  name: {
    fontSize: 40,
    color: 'black',
    position: 'absolute',
    left: 10,
    bottom: 0,
  },
});

export default SwipeCard;
