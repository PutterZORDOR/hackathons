import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "expo-router";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
import BottomStep from "../components/BottomStep";
export default function ScanReturn() {

    const [step,setStep] = useState(1)

    const router = useRouter();

    const formatTime = (sec:number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;

  return `${m}:${s.toString().padStart(2,"0")}`;
    };

    const [timeLeft, setTimeLeft] = useState(600); // 10 นาที = 600 วิ

    useEffect(() => {
        const timer = setInterval(() => {
        setTimeLeft((prev) => {
        if (prev <= 1) {
            clearInterval(timer);
            return 0;
        }
        return prev - 1;
    });
    }, 1000);

  return () => clearInterval(timer);
}, []);
  return (

    
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerText}>โปรดสแกน</Text>
      </View>

      {/* TIME */}
      <Text style={styles.timeLabel}>ระยะเวลา</Text>

      <View style={styles.timeBox}>
        <Text style={styles.timeText}>
            {formatTime(timeLeft)}
        </Text>
      </View>

      {/* QR ICON */}
      <View style={styles.qrContainer}>
        <Ionicons name="qr-code" size={220} color="#17468C" />
      </View>

      {/* SCAN BUTTON */}
      <TouchableOpacity
        style={styles.scanBtn}
        onPress={() => router.push("/qrscan-return")}
        >
        <Ionicons name="scan" size={24} color="white" />
        <Text style={styles.scanText}>โปรดสแกนคิวอาร์โค้ดจุดคืน</Text>
      </TouchableOpacity>

      {/* DESCRIPTION */}
      <Text style={styles.desc}>
        กรุณาสแกน QR Code ที่ตู้ Mubrella เพื่อเริ่มต้นการเช่าร่ม
        ระบบจะทำการตรวจสอบสถานะตู้และดำเนินการในขั้นตอนถัดไป
      </Text>
     <View style={styles.stepContainer}>

    {/* STEP 1 */}
    <View style={styles.stepItem}>
    <View style={[styles.stepCircle, step >=1 && styles.activeStep]}>
    <Ionicons name="qr-code" size={20} color="white"/>
    </View>
    <Text style={styles.stepText}>สแกน QR code</Text>
    </View>

    <View style={styles.line}/>

    {/* STEP 2 */}
    <View style={styles.stepItem}>
    <View style={[styles.stepCircle, step >=2 && styles.activeStep]}>
        <Ionicons name="umbrella" size={20} color="white"/>
    </View>
    <Text style={styles.stepText}>คืนร่ม</Text>
    </View>

    <View style={styles.line}/>

    {/* STEP 3 */}
    <View style={styles.stepItem}>
    <View style={[styles.stepCircle, step >=3 && styles.activeStep]}>
    <Ionicons name="lock-closed" size={20} color="white"/>
    </View>
    <Text style={styles.stepText}>ล็อกเสร็จสิ้น</Text>
    </View>

</View>

    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#F2F2F2",
    alignItems:"center"
  },

  header:{
    width:"100%",
    height:100,
    borderBottomLeftRadius:28,
    borderBottomRightRadius:28,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#0A2A66"
  },

  headerText:{
    color:"white",
    fontSize:24,
    fontWeight:"700"
  },

  timeLabel:{
    marginTop:20,
    fontSize:14
  },

timeBox:{
  marginTop:10,
  paddingHorizontal:40,
  paddingVertical:10,
  borderWidth:5,
  borderColor:"#FF0000",
  borderRadius:50,
  backgroundColor:"white",
  shadowColor:"#000",
  shadowOpacity:0.25,
  shadowRadius:6,
  elevation:5
},

timeText:{
  fontSize:36,
  color:"#FF0000",
  fontWeight:"800"
},

  qrContainer:{
    marginTop:60
  },

  scanBtn:{
    marginTop:60,
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:"#34C759",
    paddingHorizontal:40,
    paddingVertical:16,
    borderRadius:50
  },

  scanText:{
    color:"white",
    fontSize:16,
    marginLeft:10,
    fontWeight:"600"
  },

  desc:{
    marginTop:30,
    width:260,
    textAlign:"center",
    fontSize:11
  },

stepContainer:{
 flexDirection:"row",
 alignItems:"center",
 justifyContent:"center",
 marginTop:40,
 paddingHorizontal:20
},

stepItem:{
 alignItems:"center"
},

stepCircle:{
 width:45,
 height:45,
 borderRadius:25,
 backgroundColor:"#CFCFCF",
 justifyContent:"center",
 alignItems:"center"
},

activeStep:{
 backgroundColor:"#05d343"
},

line:{
 flex:1,
 height:4,
 backgroundColor:"#CFCFCF"
},

stepText:{
 marginTop:5,
 fontSize:12
}



});