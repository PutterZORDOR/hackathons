import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
step: 1 | 2 | 3;
};

export default function BottomStep({ step }: Props) {

return (

<View style={styles.container}>

<View style={styles.lineRow}>

<View style={styles.line}/>
<View style={styles.line}/>

</View>

<View style={styles.iconRow}>

<View style={[styles.circle, step === 1 && styles.active]}>
<MaterialCommunityIcons name="qrcode-scan" size={20} color={step===1?"white":"black"} />
</View>

<View style={[styles.circle, step === 2 && styles.active]}>
<MaterialCommunityIcons name="umbrella" size={20} color={step===2?"white":"#17468C"} />
</View>

<View style={[styles.circle, step === 3 && styles.active]}>
<MaterialIcons name="lock" size={20} color="white" />
</View>

</View>

<View style={styles.textRow}>

<Text style={styles.label}>สแกน QR code</Text>
<Text style={styles.label}>คืนร่ม</Text>
<Text style={[styles.label, step===3 && {color:"black"}]}>ล็อคเสร็จสิ้น</Text>

</View>

</View>

);

}

const styles = StyleSheet.create({

container:{
position:"absolute",
bottom:40,
width:"100%",
alignItems:"center"
},

lineRow:{
flexDirection:"row",
position:"absolute",
top:18
},

line:{
width:110,
height:4,
backgroundColor:"#D9D9D9",
marginHorizontal:10,
borderRadius:10
},

iconRow:{
flexDirection:"row",
justifyContent:"space-between",
width:260
},

circle:{
width:37,
height:37,
borderRadius:20,
backgroundColor:"#D9D9D9",
justifyContent:"center",
alignItems:"center"
},

active:{
backgroundColor:"#FF0000"
},

textRow:{
flexDirection:"row",
justifyContent:"space-between",
width:260,
marginTop:8
},

label:{
fontSize:9
}

});