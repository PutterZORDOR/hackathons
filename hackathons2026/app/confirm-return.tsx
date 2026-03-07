import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ConfirmReturn() {

  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(30);

useEffect(() => {
  const timer = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 0) return 0;
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, []);

useEffect(() => {
  if (timeLeft === 0) {
    router.replace("/place-umbrella");
  }
}, [timeLeft]);
const formatTime = (sec: number) => {
  const s = sec.toString().padStart(2, "0");
  return `00:${s}`;
};
  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerText}>ยืนยันตัวร่ม</Text>
      </View>

      {/* TIMER */}
      <Text style={styles.timeLabel}>ระยะเวลา</Text>

      <View style={styles.timerBox}>
        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
      </View>

      {/* UMBRELLA ICON */}
      <View style={styles.iconContainer}>
        <Ionicons name="umbrella" size={200} color="#0a3a73" />
      </View>

      {/* INSTRUCTION */}
       <View style={styles.instructionBox}>
              <Text style={styles.instruction}>
                กรุณาจัดตำแหน่งด้ามจับร่มให้ตรงกับโลโก้หน้าตู้
              </Text>
            </View>

      <Text style={styles.desc}>
        เพื่อให้ระบบสามารถยืนยันและตรวจสอบไอดีร่มสำหรับดำเนินการในขั้นตอนถัดไป
      </Text>

      {/* STEP PROGRESS */}
      <View style={styles.stepContainer}>

        {/* STEP 1 */}
        <View style={styles.stepItem}>
          <View style={styles.stepCircleInactive}>
            <Ionicons name="qr-code" size={22} color="white" />
          </View>
          <Text style={styles.stepText}>สแกน QR code</Text>
        </View>

        <View style={styles.stepLine} />

        {/* STEP 2 */}
        <View style={styles.stepItem}>
          <View style={styles.stepCircleActive}>
            <Ionicons name="umbrella" size={22} color="white" />
          </View>
          <Text style={styles.stepText}>คืนร่ม</Text>
        </View>

        <View style={styles.stepLine} />

        {/* STEP 3 */}
        <View style={styles.stepItem}>
          <View style={styles.stepCircleInactive}>
            <Ionicons name="lock-closed" size={22} color="white" />
          </View>
          <Text style={styles.stepText}>ล็อกเสร็จสิ้น</Text>
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  header: {
    width: "100%",
    height: 100,
    backgroundColor: "#0a3a73",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },

  timeLabel: {
    marginTop: 25,
    fontSize: 14,
  },

  timerBox: {
    marginTop: 10,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderWidth: 4,
    borderColor: "red",
    borderRadius: 40,
  },

  timerText: {
    fontSize: 36,
    color: "red",
    fontWeight: "700",
  },

  iconContainer: {
    alignItems: "center",
    marginTop: 40,
  },

instructionBox:{
marginTop:60,
backgroundColor:"#fff",
paddingVertical:16,
paddingHorizontal:30,
borderRadius:40,
shadowColor:"#000",
shadowOpacity:0.2,
shadowRadius:6
},

instruction:{
fontSize:16,
fontWeight:"500",
textAlign:"center"
},

  desc: {
    marginTop: 30,
    width: 260,
    textAlign: "center",
    fontSize: 11,
  },

  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },

  stepItem: {
    alignItems: "center",
  },

  stepCircleActive: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#0a3a73",
    justifyContent: "center",
    alignItems: "center",
  },

  stepCircleInactive: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
  },

  stepLine: {
    width: 60,
    height: 3,
    backgroundColor: "#D9D9D9",
  },

  stepText: {
    marginTop: 6,
    fontSize: 12,
  },

});