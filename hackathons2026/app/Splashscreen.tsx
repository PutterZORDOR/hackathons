import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

const { width, height } = Dimensions.get('window');

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

interface SplashScreenProps {
  navigation: SplashScreenNavigationProp;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    // Navigate to Login after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#020012" />
      <LinearGradient
        colors={['rgba(0, 42, 120, 0.2)', '#020012', '#051F3F', '#145EA3']}
        locations={[0, 0, 0.5, 1]}
        style={styles.gradient}
      >
        <View style={styles.logoContainer}>
          {/* Umbrella Icon */}
          <View style={styles.umbrellaIcon}>
            <View style={styles.umbrellaTop}>
              <View style={[styles.umbrellaSegment, styles.segment1]} />
              <View style={[styles.umbrellaSegment, styles.segment2]} />
              <View style={[styles.umbrellaSegment, styles.segment3]} />
            </View>
            <View style={styles.umbrellaHandle} />
          </View>

          {/* App Name */}
          <Text style={styles.appName}>MUbrella</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    width: 335,
    height: 151,
  },
  umbrellaIcon: {
    width: 146,
    height: 146,
    marginBottom: 20,
    alignItems: 'center',
  },
  umbrellaTop: {
    width: 120,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  umbrellaSegment: {
    width: 35,
    height: 60,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 2,
  },
  segment1: {
    borderTopLeftRadius: 60,
    borderBottomLeftRadius: 5,
  },
  segment2: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  segment3: {
    borderTopRightRadius: 60,
    borderBottomRightRadius: 5,
  },
  umbrellaHandle: {
    width: 8,
    height: 70,
    backgroundColor: '#FFFFFF',
    marginTop: -5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 3,
  },
  appName: {
    fontFamily: 'AbrilFatface-Regular',
    fontSize: 60,
    lineHeight: 81,
    color: '#FFFFFF',
    fontWeight: '400',
    marginTop: 10,
  },
});

export default SplashScreen;