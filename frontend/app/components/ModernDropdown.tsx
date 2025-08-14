import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Animated,
} from "react-native";
import Colors from "../../constants/colours";

type DropdownProps = {
  options: string[];
  selected: string | null;
  onSelect: (value: string) => void;
};

export default function ModernDropdown({
  options,
  selected,
  onSelect,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleDropdown = () => {
    setOpen((prev) => !prev);
    Animated.timing(animation, {
      toValue: open ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, options.length * 40], // height per option
  });

  return (
    <View style={styles.container}>
      {/* Selected option / Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={toggleDropdown}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>
          {selected || "Select symbol"}
        </Text>
      </TouchableOpacity>

      {/* Animated dropdown */}
      <Animated.View style={[styles.dropdown, { height }]}>
        <FlatList
          data={options}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                onSelect(item);
                toggleDropdown();
              }}
            >
              <Text style={styles.optionText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 10,
  },
  button: {
    backgroundColor: Colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: "bold",
  },
  dropdown: {
    overflow: "hidden",
    backgroundColor: Colors.secondary,
    borderRadius: 8,
    marginTop: 5,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  optionText: {
    fontSize: 14,
    color: Colors.text,
  },
});
