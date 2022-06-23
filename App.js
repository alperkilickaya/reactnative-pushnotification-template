import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import PushNotification, {Importance} from 'react-native-push-notification';

const App = () => {
  useEffect(() => {
    createChannels();
  }, []);

  const createChannels = () => {
    PushNotification.createChannel(
      {
        channelId: 'test-channel', // (required)
        channelName: 'Test Channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  };

  const handleNotification = item => {
    PushNotification.localNotification({
      channelId: 'test-channel',
      title: item + 'Notification', // (optional)
      message: `My ${item} Notification Message`, // (required)
      playSound: false, // (optional) default: true
    });
    PushNotification.localNotificationSchedule({
      channelId: 'test-channel', // (required)
      title: 'Scheduled Notification', // (optional)
      message: 'My 20 seconds Scheduled Notification Message', // (required)
      date: new Date(Date.now() + 20 * 1000), // (optional)
    });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNotification('LOCAL')}>
        <Text>Local Notification</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNotification('PUSH')}>
        <Text>Push Notification</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#00ffff',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
});

export default App;
