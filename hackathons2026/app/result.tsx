import { API_URL } from "@/config/api";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";


export default function ResultScreen() {
  const { box_id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [borrowing, setBorrowing] = useState(false);

  // ✅ Check box when page loads
  useEffect(() => {
    if (!box_id) return;

    console.log("Sending box_id to API:", box_id);

    fetch(`${API_URL}/check_box.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ box_id }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMessage(`Box found. Status: ${data.box.status}`);
        } else {
          setMessage(data.message);
        }
      })
      .catch(err => {
        console.error(err);
        setMessage("Server error");
      })
      .finally(() => setLoading(false));
  }, [box_id]);

  // ✅ Use umbrella button action
  const useUmbrella = () => {
    if (!box_id) return;

    setBorrowing(true);

    fetch(`${API_URL}/borrow_umbrella.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ box_id }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMessage(
            `Umbrella ${data.umbrella_id} borrowed successfully`
          );
        } else {
          setMessage(data.message);
        }
      })
      .catch(err => {
        console.error(err);
        setMessage("Server error");
      })
      .finally(() => setBorrowing(false));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RESULT PAGE</Text>
      <Text>BOX ID: {box_id}</Text>

      {loading ? (
        <Text>Checking box...</Text>
      ) : (
        <>
          <Text style={styles.result}>{message}</Text>

          {/* ✅ Use Umbrella Button */}
          <Pressable
            style={[
              styles.button,
              borrowing && { backgroundColor: "#999" },
            ]}
            onPress={useUmbrella}
            disabled={borrowing}
          >
            <Text style={styles.buttonText}>
              {borrowing ? "Processing..." : "Use Umbrella"}
            </Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() =>
              router.push({
                pathname: "/scan-umbrella",
                params: { box_id },
              })
            }
          >
            <Text style={styles.buttonText}>Return Umbrella</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  result: {
    marginTop: 10,
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
