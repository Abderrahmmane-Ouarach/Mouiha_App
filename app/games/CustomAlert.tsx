import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";

interface CustomAlertProps {
  visible: boolean;
  onRetry: () => void;
  onCancel: () => void;
}

export default function CustomAlert({ visible, onRetry, onCancel }: CustomAlertProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>⚠️ لقد تجاوزت الحد المسموح من الأخطاء</Text>
        <Text style={styles.message}>
  حافظ على الماء 💧{"\n"}
اختر البطاقات الصحيحة! ركز اكثر</Text>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.retryBtn} onPress={onRetry}>
              <Text style={styles.retryText}>⟲ إعادة المحاولة</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 5
  },
  title: {
    fontSize: 20,
    fontFamily: "Tajawal-Bold",
    marginBottom: 20,
    color: "#d9534f",
    textAlign: "center",
    lineHeight: 27,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 25,
    color: "#333",
    fontFamily: "Tajawal-Bold",
    lineHeight: 22,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  },
  retryBtn: {
    flex: 1,
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 12,
    marginRight: 5,
    alignItems: "center"
  },
  retryText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Tajawal-Bold"
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: "#d9534f",
    padding: 12,
    borderRadius: 12,
    marginLeft: 5,
    alignItems: "center"
  },
  cancelText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Tajawal-Bold"
  }
});
