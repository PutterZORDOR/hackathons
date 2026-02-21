import { View, Text, StyleSheet, Image, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function Splash() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;
  const [count, setCount] = useState(5);

  useEffect(() => {
    //  Fade + Slide animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();

    // 🔢 Countdown
    const timer = setInterval(() => {
        setCount((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
   }, []);

   useEffect(() => {
     if (count === 0) {
    router.replace("/login");

  }
  }, [count]);

  return (
    <LinearGradient
      colors={["#020012", "#051F3F", "#145EA3"]}
      locations={[0, 0.5, 1]}
      style={styles.container}
    >
      <View style={styles.overlay} />

      <Image
        source={require("../assets/images/mubrella-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Animated.View
  style={{
    opacity: fadeAnim,
    transform: [{ translateY }],
    position: "absolute",
    bottom: 40,
    right: 25,
  }}
>
  <TouchableOpacity onPress={() => router.replace("/login")}>
    <Text style={styles.bottomText}>
      {count} ข้าม
    </Text>
  </TouchableOpacity>
  </Animated.View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 42, 120, 0.2)",
  },

  logo: {
    width: 290,
    height: 250,
  },

  bottomText: {
    position: "absolute",
    bottom: 40,
    right: 25,
    color: "white",
    fontSize: 20,
    fontWeight: "300",
    letterSpacing: 1,
  },
});

