import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import {
  downloadOnDemandMarkers,
  getExternalUserId,
  IARMarker,
} from 'react-native-iar-sdk';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons/faImage';

const MarkerItem = ({
  marker,
  onMarkerItemPress,
}: {
  marker: IARMarker;
  onMarkerItemPress: (arg0: string) => void;
}) => {
  return (
    <View style={styles.markerItem} key={marker.id}>
      <TouchableOpacity
        style={styles.markerButton}
        onPress={() => onMarkerItemPress(marker.id)}
      >
        <View style={styles.markerLeftCol}>
          {marker.image ? (
            <Image
              style={styles.markerThumbnail}
              source={{
                uri: marker.image,
              }}
            />
          ) : (
            <FontAwesomeIcon
              size={50}
              icon={faImage}
              style={styles.markerIcon}
            />
          )}
        </View>
        <View style={styles.markerRightCol}>
          <Text style={styles.markerItemNameText}>{marker.name}</Text>
          <Text style={styles.markerItemIdText}>{marker.id}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const OnDemandMarkersScreen = () => {
  const [userId, setUserId] = useState('');
  const [onDemandMarkers, setOnDemandMarkers] = useState<IARMarker[]>([]);

  const navigation = useNavigation();

  const fetchExternalUserId = async () => {
    try {
      const savedUserID: string = await getExternalUserId();

      setUserId(savedUserID);
      // console.log('fetchExternalUserId - savedUserID', savedUserID);
      return savedUserID;
    } catch (error: unknown) {
      console.error('fetchExternalUserId - error', error);
      return null;
    }
  };

  const fetchOnDemandMarkers = async () => {
    try {
      // Grab the external user ID from the SDK
      const userIdResponse = await fetchExternalUserId();

      if (userIdResponse !== undefined) {
        // download a list of On Demand Markers from available to the Organization
        const markers: IARMarker[] = await downloadOnDemandMarkers();
        //console.log('fetchOnDemandMarkers - markers', markers);

        // Set our local state
        setOnDemandMarkers(markers);
      }
    } catch (error: unknown) {
      console.error('fetchOnDemandMarkers - error', error);
    }
  };

  useEffect(() => {
    // Fetch On Demand Markers on Initialization
    fetchOnDemandMarkers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMarkerItemPress = (markerId: string) => {
    // Navigate to the AR Screen, passing the Marker ID through.
    navigation.navigate('SurfaceViewScreen', {
      markerId: markerId,
    });
  };

  return (
    <SafeAreaView style={styles.safeViewArea}>
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <Text style={styles.userIdText}>
            {userId === undefined
              ? 'No User Id Set, Please set one in User Management'
              : `User ID: ${userId}`}
          </Text>
        </View>
        <ScrollView>
          <View style={styles.markerItemsContainer}>
            {onDemandMarkers.map((marker: IARMarker) => {
              if (marker === null) {
                return null;
              }
              return (
                <MarkerItem
                  marker={marker}
                  key={marker.id}
                  onMarkerItemPress={onMarkerItemPress}
                />
              );
            })}
          </View>
        </ScrollView>
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
  },
  userContainer: {
    borderBottomWidth: 1,
    borderColor: '#E3E3E3',
    padding: 20,
  },
  userIdText: {
    textAlign: 'center',
    color: '#000000',
    fontWeight: '800',
    fontSize: 16,
  },
  markerItemsContainer: {},
  markerItem: {
    borderBottomWidth: 1,
    borderColor: '#E3E3E3',
  },
  markerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  markerLeftCol: {},
  markerRightCol: {},
  markerThumbnail: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    marginRight: 20,
  },
  markerIcon: {
    color: '#3578F6',
    marginRight: 20,
  },
  markerItemNameText: {
    color: '#000000',
    fontWeight: '800',
    fontSize: 16,
  },
  markerItemIdText: {
    color: '#666666',
  },
});

export default OnDemandMarkersScreen;
