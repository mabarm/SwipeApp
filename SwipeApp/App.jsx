import React, {useState, useRef, useCallback} from 'react';
import {Animated, PanResponder, SafeAreaView} from 'react-native';
import NewYork from './src/images/NewYork.jpg';
import Paris from './src/images/Paris.jpg';
import Australia from './src/images/Australia.jpg';
import Germany from './src/images/Germany.jpg';
import London from './src/images/London.jpg';
import SwipeCard from './src/components/SwipeCard';
import EmptyPlace from './src/components/EmptyPlace';
import Footer from './src/components/Footer';

const initialState = [
  {id: 1, name: 'NewYork', image: NewYork},
  {id: 2, name: 'Paris', image: Paris},
  {id: 3, name: 'Australia', image: Australia},
  {id: 4, name: 'Germany', image: Germany},
  {id: 5, name: 'London', image: London},
];

function SwipeApp() {
  const [places, setPlaces] = useState(initialState);
  const positionRef = useRef(new Animated.ValueXY()).current;

  //to show next place on swiping
  const removePlaceCard = useCallback(() => {
    setShouldRotate(true);
    setPlaces(prev => prev.slice(1));
    positionRef.setValue({x: 0, y: 0});
  }, [positionRef, places]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      //detecing position of movable card
      onPanResponderMove: (e, {dx, dy}) => {
        positionRef.setValue({x: dx, y: dy});
      },
      //when card is released from moving
      onPanResponderRelease: (e, {dx, dy}) => {
        console.log('mma', dx);
        const swipeNext = Math.abs(dx) > 200; // magnitude of swipe
        if (!swipeNext) {
          Animated.spring(positionRef, {
            toValue: {x: 0, y: 0},
            useNativeDriver: true,
            friction: 8,
          }).start();
        } else {
          Animated.timing(positionRef, {
            toValue: {x: 300 * dx, y: dy},
            useNativeDriver: true,
            duration: 300,
          }).start(removePlaceCard);
        }
      },
    }),
  ).current;

  const reload = useCallback(() => {
    setPlaces(initialState);
  }, [places]);

  const [shouldRotate, setShouldRotate] = useState(true);
  //liked or rejected handler via footer icons
  const actionTaken = useCallback(
    sign => {
      setShouldRotate(false);
      Animated.timing(positionRef, {
        toValue: {x: 300 * sign, y: 0},
        useNativeDriver: true,
        duration: 300,
      }).start(removePlaceCard);
    },
    [removePlaceCard],
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      {places.length ? (
        <>
          {places
            .map((item, index) => {
              return (
                <SwipeCard
                  place={item}
                  key={item.id}
                  positionRef={positionRef}
                  firstPlace={index == 0}
                  dragHandler={index == 0 ? panResponder.panHandlers : {}}
                  shouldRotate={shouldRotate}
                />
              );
            })
            .reverse()}
          <Footer actionTaken={actionTaken} />
        </>
      ) : (
        <EmptyPlace reload={reload} />
      )}
    </SafeAreaView>
  );
}

export default SwipeApp;
