import React, { useState, useRef } from 'react';
import { Text, View, StatusBar, TouchableOpacity, Picker } from 'react-native';
import styles from './index.css.js';
const createArray = (length) => {
  const arr = [];
  let i = 0;
  while (i < length) {
    arr.push(i.toString());
    i += 1;
  }
  return arr;
};

//create pickerItems values
const availableMinutes = createArray(10); //0-9
const availableSeconds = createArray(60); //0-59

//append 0 take last 2 numbers e.g 03 => 003 => 03
const formatNumber = (number) => {
  return `0${number}`.slice(-2);
};

//convert
const getRemaining = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return { minutes: formatNumber(minutes), seconds: formatNumber(seconds) };
};

export default function App() {
  const [selectedMinutes, setSelectedMinutes] = useState(0);
  const [selectedSeconds, setSelectedSeconds] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);
  let { minutes, seconds } = getRemaining(remainingTime);

  const renderPickers = () => {
    return (
      <View style={styles.pickerContainer}>
        <Picker
          mode="dropdown"
          style={styles.picker}
          itemStyle={styles.pickerItem}
          selectedValue={selectedMinutes}
          onValueChange={(value) => setSelectedMinutes(value)}>
          {availableMinutes.map((value) => (
            <Picker.Item key={value} label={value} value={value} />
          ))}
        </Picker>
        <Text style={styles.pickerItem}>min</Text>
        <Picker
          mode="dropdown"
          style={styles.picker}
          itemStyle={styles.pickerItem}
          selectedValue={selectedSeconds}
          onValueChange={(value) => setSelectedSeconds(value)}>
          {availableSeconds.map((value) => (
            <Picker.Item key={value} label={value} value={value} />
          ))}
        </Picker>
        <Text style={styles.pickerItem}>sec</Text>
      </View>
    );
  };

  const handlePress = () => {
    console.log(running);
    if (running) {
      clearInterval(intervalRef.current);
    } else {
      const newTime =
        parseInt(selectedMinutes, 10) * 60 + parseInt(selectedSeconds, 10);
      if (!newTime) {
        return alert('Cannot set a timer of 00:00!');
      }
      setRemainingTime(newTime);
      intervalRef.current = setInterval(
        () =>
          setRemainingTime((remainder) => {
            if (remainder === 0) {
              clearInterval(intervalRef.current);
              return 0;
            } else if (remainder === 1) setRunning(false);
            return remainder - 1;
          }),
        1000
      );
    }
    setRunning(!running);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {running ? (
        <Text style={styles.timer}>{`${minutes}:${seconds}`}</Text>
      ) : (
        renderPickers()
      )}
      <TouchableOpacity
        style={running ? styles.textContainerReset : styles.textContainer}
        onPress={handlePress}>
        {running ? (
          <Text style={styles.textReset}>{'Reset'}</Text>
        ) : (
          <Text style={styles.text}>{'Start'}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
