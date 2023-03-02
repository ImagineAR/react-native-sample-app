import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { createExternalUserId, setExternalUserId } from 'react-native-iar-sdk';

import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons/faArrowsRotate';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons/faUserPlus';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons/faRightToBracket';
import { useNavigation } from '@react-navigation/native';

const UserManagementScreen = () => {
  const [userId, setUserId] = useState('iar|12345');

  const navigation = useNavigation();

  const onCreateExternalUserIdPress = async () => {
    try {
      const response = await createExternalUserId(userId);

      // Log out createExternalUserId response
      // console.log('onCreateExternalUserIdPress - response', response);

      // Set the external user ID locally in the SDK
      setExternalUserId(userId);
      navigation.goBack();
    } catch (error: unknown) {
      // Log out an error
      console.error('onCreateExternalUserIdPress - error', error);
    }
  };

  const onLoginUserPress = async () => {
    try {
      if (userId !== '') {
        // Set the selected external UserId on the SDK
        setExternalUserId(userId);
        navigation.goBack();
      }
    } catch (error: unknown) {
      // Log out an error
      console.error('onLoginUserPress - error', error);
    }
  };

  const onGenerateUserIdPress = () => {
    setUserId(uuid());
  };

  return (
    <SafeAreaView style={styles.safeViewArea}>
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <View style={styles.item}>
            <Text style={[styles.itemText, styles.itemTitle]}>User ID:</Text>
            <TextInput
              style={styles.itemTextInput}
              value={userId}
              onChangeText={(text) => {
                setUserId(text);
              }}
            />
          </View>
          <View style={styles.item}>
            <TouchableOpacity
              onPress={onGenerateUserIdPress}
              style={styles.itemButton}
            >
              <FontAwesomeIcon
                size={24}
                icon={faArrowsRotate}
                style={styles.itemIcon}
              />
              <Text style={styles.itemText}>Generate a UUID as a User ID</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <TouchableOpacity
              onPress={onCreateExternalUserIdPress}
              style={styles.itemButton}
            >
              <FontAwesomeIcon
                size={24}
                icon={faUserPlus}
                style={styles.itemIcon}
              />
              <Text style={styles.itemText}>Create New User</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <TouchableOpacity
              onPress={onLoginUserPress}
              style={styles.itemButton}
            >
              <FontAwesomeIcon
                size={24}
                icon={faRightToBracket}
                style={styles.itemIcon}
              />
              <Text style={styles.itemText}>Login User</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeViewArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  itemContainer: {
    borderTopWidth: 1,
    borderColor: '#E3E3E3',
  },
  item: {
    borderBottomWidth: 1,
    borderColor: '#E3E3E3',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  itemIcon: {
    marginRight: 10,
    color: '#3578F6',
  },
  itemText: {
    color: '#000000',
  },
  itemTitle: {},
  itemTextInput: {
    flex: 1,
    marginLeft: 10,
    marginVertical: 20,
    minHeight: 45,
    padding: 10,
    borderWidth: 1,
    fontSize: 12.5,
    borderColor: '#E3E3E3',
    color: '#000000',
  },
});

export default UserManagementScreen;
