import React, {useCallback} from 'react';
import {Image, TouchableOpacity, StyleSheet, SafeAreaView} from 'react-native';
import Liked from '../images/Heart.png';
import Rejected from '../images/Rejected.png';

function Footer({actionTaken}) {
  const swipeLeft = useCallback(() => actionTaken(-1), []);
  const swipeRight = useCallback(() => actionTaken(1), []);

  return (
    <SafeAreaView style={FooterStyles.mainView}>
      <TouchableOpacity style={FooterStyles.button} onPress={swipeLeft}>
        <Image source={Rejected} style={FooterStyles.image} />
      </TouchableOpacity>
      <TouchableOpacity style={FooterStyles.button} onPress={swipeRight}>
        <Image source={Liked} style={FooterStyles.image} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const FooterStyles = StyleSheet.create({
  mainView: {
    width: '100%',
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    width: 48,
    height: 48,
    elevation: 5,
    borderRadius: 24,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {width: 30, height: 30},
});

export default React.memo(Footer);
