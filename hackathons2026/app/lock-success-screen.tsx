import React, { useEffect, useRef } from "react";
import BottomStep from "../components/BottomStep";
import {
View,
Text,
StyleSheet,
TouchableOpacity,
Animated,
SafeAreaView
} from "react-native";
import { router } from "expo-router";

export default function LockSuccessScreen() {

const scaleAnim = useRef(new Animated.Value(0)).current;

useEffect(() => {

Animated.spring(scaleAnim,{
toValue:1,
friction:6,
useNativeDriver:true
}).start();

},[]);

return (

<SafeAreaView style={styles.container}>

{/* Header */}

<View style={styles.header}>
<Text style={styles.headerText}>ล็อคเสร็จสิ้น</Text>
</View>

{/* Success Area */}

<View style={styles.centerArea}>

<Animated.View
style={[
styles.successCircle,
{ transform: [{ scale: scaleAnim }] }
]}
>

<Text style={styles.check}>✓</Text>

</Animated.View>

<Text style={styles.percent}>100%</Text>

</View>

{/* Button */}

<TouchableOpacity
style={styles.button}
onPress={() => router.replace("/home")}
>

<Text style={styles.buttonText}>เสร็จสิ้น →</Text>

</TouchableOpacity>

{/* Description */}

<Text style={styles.description}>
คืนร่มเรียบร้อยแล้ว ขอบคุณที่เลือกใช้ Mubrella{"\n"}
การคืนร่มครั้งนี้ช่วยลดขยะและทำให้เมืองของเราน่าอยู่ยิ่งขึ้นอีกนิด
</Text>
<BottomStep step={3} />

</SafeAreaView>

);
}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#FFFFFF",
alignItems:"center"
},

header:{
width:"100%",
height:110,
backgroundColor:"#17468C",
borderBottomLeftRadius:28,
borderBottomRightRadius:28,
justifyContent:"center",
alignItems:"center"
},

headerText:{
color:"#FFFFFF",
fontSize:24,
fontWeight:"700"
},

centerArea:{
marginTop:100,
alignItems:"center"
},

successCircle:{
width:185,
height:185,
borderRadius:92,
backgroundColor:"#34C759",
justifyContent:"center",
alignItems:"center"
},

check:{
color:"#FFFFFF",
fontSize:90,
fontWeight:"bold"
},

percent:{
marginTop:40,
fontSize:32,
fontWeight:"700",
color:"#17468C"
},

button:{
position:"absolute",
bottom:200,
width:"85%",
height:70,
backgroundColor:"#34C759",
borderRadius:66,
justifyContent:"center",
alignItems:"center"
},

buttonText:{
color:"#FFFFFF",
fontSize:24,
fontWeight:"700"
},

description:{
position:"absolute",
bottom:120,
width:"75%",
textAlign:"center",
fontSize:12,
lineHeight:16,
color:"#000"
}

});