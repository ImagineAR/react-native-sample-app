import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useIsFocused, useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faCloudArrowDown } from '@fortawesome/free-solid-svg-icons/faCloudArrowDown';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons/faLocationDot';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { getExternalUserId } from 'react-native-iar-sdk';

const HomeScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [userId, setUserId] = useState('');

  useEffect(() => {
    const getSavedUserId = async () => {
      try {
        const savedUserID: string = await getExternalUserId();
        if (savedUserID !== undefined) {
          setUserId(savedUserID);
        }
      } catch (error) {
        // console.log('HomeScreen - Cannot get External User ID');
      }
    };
    if (isFocused) {
      getSavedUserId();
    }
  }, [isFocused]);

  const onUserManagementPress = () => {
    navigation.navigate('userManagement');
  };

  const onOnDemandMarkersPress = () => {
    navigation.navigate('onDemandMarkers');
  };

  const onLocationMarkerPress = () => {
    navigation.navigate('locationMarkers');
  };

  const onRewardsPress = () => {
    navigation.navigate('rewards');
  };

  return (
    <SafeAreaView style={styles.safeViewArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.headerImage}
            source={require('../assets/ImagineAR_Wordmark_Blue.png')}
          />
          <Text style={styles.headerText}>React Native SDK</Text>
        </View>
        <View style={styles.navContainer}>
          <View style={styles.navItem}>
            <TouchableOpacity
              onPress={onUserManagementPress}
              style={styles.navItemButton}
            >
              <FontAwesomeIcon
                size={24}
                icon={faUser}
                style={styles.navItemIcon}
              />
              <Text style={styles.navItemText}>User Management</Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.navItem,
              userId === '' ? styles.navItemDisabled : null,
            ]}
          >
            <TouchableOpacity
              onPress={onOnDemandMarkersPress}
              style={styles.navItemButton}
              disabled={userId === ''}
            >
              <FontAwesomeIcon
                size={24}
                icon={faCloudArrowDown}
                style={styles.navItemIcon}
              />
              <Text style={styles.navItemText}>On Demand Markers</Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.navItem,
              userId === '' ? styles.navItemDisabled : null,
            ]}
          >
            <TouchableOpacity
              onPress={onLocationMarkerPress}
              style={styles.navItemButton}
              disabled={userId === ''}
            >
              <FontAwesomeIcon
                size={24}
                icon={faLocationDot}
                style={styles.navItemIcon}
              />
              <Text style={styles.navItemText}>Location Markers</Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.navItem,
              userId === '' ? styles.navItemDisabled : null,
            ]}
          >
            <TouchableOpacity
              onPress={onRewardsPress}
              style={styles.navItemButton}
              disabled={userId === ''}
            >
              <FontAwesomeIcon
                size={24}
                icon={faStar}
                style={styles.navItemIcon}
              />
              <Text style={styles.navItemText}>Rewards</Text>
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
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 150,
  },
  headerImage: {
    width: 250,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 25,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingBottom: 15,
    color: 'black',
  },
  navContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: '#E3E3E3',
  },
  navItem: {
    borderBottomWidth: 1,
    borderColor: '#E3E3E3',
  },
  navItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  navItemIcon: {
    marginRight: 10,
    color: '#3578F6',
  },
  navItemText: {
    color: '#000000',
  },
  navItemDisabled: {
    opacity: 0.5,
  },
});

export default HomeScreen;
