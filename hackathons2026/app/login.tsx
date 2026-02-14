import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  Image,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const handleLogin = () => {
    router.replace("/(tabs)");
  };

  return (
    <ImageBackground
      source={require("../assets/images/login-bg.jpg")}
      style={styles.container}
      resizeMode="cover"
    >
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/login-logo-mubrella.png")}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomContainer}>
        {/* Apple */}
        <Pressable style={[styles.button, styles.apple]} onPress={handleLogin}>
          <View style={styles.row}>
            <Ionicons name="logo-apple" size={22} color="white" />
            <Text style={styles.buttonTextWhite}>
              {"  "}ล็อกอินผ่าน Apple
            </Text>
          </View>
        </Pressable>

        {/* Facebook */}
        <Pressable
          style={[styles.button, styles.facebook]}
          onPress={handleLogin}
        >
          <View style={styles.row}>
            <Ionicons name="logo-facebook" size={25} color="white" />
            <Text style={styles.buttonTextWhite}>
              {"  "}ล็อกอินผ่าน Facebook
            </Text>
          </View>
        </Pressable>

        {/* Google */}
        <Pressable style={[styles.button, styles.google]} onPress={handleLogin}>
          <View style={styles.row}>
            <Ionicons name="logo-google" size={22} color="#3B3C4F" />
            <Text style={styles.buttonTextDark}>
              {"  "}ล็อกอินผ่าน Google
            </Text>
          </View>
        </Pressable>

        {/* Terms */}
        <Text style={styles.terms}>
          เมื่อดำเนินการต่อถือว่าคุณอ่านและเห็นด้วยกับ
          เงื่อนไขการบริการ และ นโยบายความเป็นส่วนตัว
          และต้องมีอายุ 16 ปีขึ้นไป
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },

  logoContainer: {
    marginTop: 100,
    alignItems: "center",
  },

  logoImage: {
    width: 260,
    height: 140,
  },

  bottomContainer: {
    paddingVertical: 35,
    paddingHorizontal: 20,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    gap: 18,
  },

  button: {
    height: 58,
    borderRadius: 66,
    justifyContent: "center",
    alignItems: "center",

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 6,

    // Android
    elevation: 8,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  apple: {
    backgroundColor: "#000",
  },

  facebook: {
    backgroundColor: "#256EDD",
  },

  google: {
    backgroundColor: "#F8F8F8",
  },

  buttonTextWhite: {
    color: "white",
    fontSize: 17,
    fontWeight: "500",
  },

  buttonTextDark: {
    color: "#3B3C4F",
    fontSize: 17,
    fontWeight: "600",
  },

  terms: {
    color: "white",
    fontSize: 11,
    textAlign: "center",
    opacity: 0.8,
    lineHeight: 15,
  },
});


