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
  getExternalUserId,
  getLocationMarkers,
  IARLocationMarker,
} from 'react-native-iar-sdk';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons/faImage';

interface ILocation {
  latitude: number;
  longitude: number;
  radius: number;
}

const defaultLocation: ILocation = {
  latitude: 38.30705,
  longitude: -100.36375,
  radius: 5000,
};

const MarkerItem = ({
  marker,
  onMarkerItemPress,
}: {
  marker: IARLocationMarker;
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
          <Text style={styles.markerItemIdText}>Id: {marker.id}</Text>
          <Text style={styles.markerItemIdText}>
            Latitude: {marker.latitude}
          </Text>
          <Text style={styles.markerItemIdText}>
            Longitude: {marker.longitude}
          </Text>
          <Text style={styles.markerItemIdText}>Radius: {marker.radius}m</Text>
          <Text style={styles.markerItemIdText}>
            Distance: {Math.floor(marker.distance)}m
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const LocationMarkerScreen = () => {
  const [userId, setUserId] = useState('');
  const [locationMarkers, setLocationMarkers] = useState<IARLocationMarker[]>(
    []
  );
  const [myLocation, setMyLocation] = useState<ILocation>(defaultLocation);

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

  const fetchLocationMarkers = async (
    longitude: number,
    latitude: number,
    radius: number
  ) => {
    try {
      // Grab the external user ID from the SDK
      const userIdResponse = await fetchExternalUserId();

      if (userIdResponse !== undefined) {
        // Download a list of Location Markers from available to the Organization
        // within the radius of the lat/long provided
        const markers: IARLocationMarker[] = await getLocationMarkers(
          longitude,
          latitude,
          radius
        );

        // Set our local state
        setLocationMarkers(markers);
      }
    } catch (error: unknown) {
      console.error('fetchLocationMarkers - error', error);
    }
  };

  useEffect(() => {
    // Fetch Location Markers on Initialization
    fetchLocationMarkers(
      myLocation.latitude,
      myLocation.longitude,
      myLocation.radius
    );
    // don't use fetchLocationMarker in the deps array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myLocation]);

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
        <View style={styles.userContainer}>
          <Text style={styles.userIdText}>User Location</Text>
          <Text style={styles.userIdText}>
            Latitude: {myLocation.latitude} | Longitude: {myLocation.longitude}
          </Text>
          <Text style={styles.userIdText}>Radius: {myLocation.radius}</Text>
        </View>
        <ScrollView>
          <View style={styles.markerItemsContainer}>
            {locationMarkers.map((marker: IARLocationMarker) => {
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
    height: 75,
    resizeMode: 'contain',
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

export default LocationMarkerScreen;
