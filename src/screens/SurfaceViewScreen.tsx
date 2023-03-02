import React, { useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import {
  IARPlaceButtonConfig,
  IARReward,
  SurfaceView,
} from 'react-native-iar-sdk';

const SurfaceViewScreen = () => {
  const route = useRoute();
  const [downloadProgress, setDownloadProgress] = useState(0);

  const onProgressChange = (progress: number) => {
    console.log('SurfaceViewScreen - onProgressChange - progress: ', progress);
    setDownloadProgress(progress);
  };

  const onAssetAnchoredChange = (isAnchored: boolean) => {
    console.log(
      'SurfaceViewScreen - onAssetAnchoredChange - isAnchored: ',
      isAnchored
    );
  };

  const onSurfaceDetected = (isSurfaceDetected: boolean) => {
    console.log(
      'SurfaceViewScreen - onSurfaceDetected - isSurfaceDetected: ',
      isSurfaceDetected
    );
  };

  const onRewardsAwarded = (rewards: string[]) => {
    console.log('SurfaceViewScreen - onRewardsAwarded - rewards: ', rewards);
  };

  const placementText = Platform.OS === 'ios' ? 'Tap to Place' : 'Place';

  const placeButtonConfig: IPlaceButtonConfig = {
    borderWidth: 2,
    borderRadius: 5,
    textColor: '#FFFFFF',
    backgroundColor: '#333333',
    borderColor: '#FFFFFF',
    width: 100,
    height: 50,
    fontSize: 16,
    fontWeight: 'normal',
    anchoredText: 'Move',
    unAnchoredText: placementText,
  };

  return (
    <SafeAreaView style={styles.safeViewArea}>
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <Text style={styles.userIdTitle}>
            {route.params?.markerId === '' ? 'No Marker ID Set' : `Marker ID:`}
          </Text>
          <Text style={styles.userIdText}>
            {route.params?.markerId === '' ? '' : route.params?.markerId}
          </Text>
        </View>
        <View style={styles.progressArea}>
          {downloadProgress < 1 ? (
            <Text style={styles.downloadProgressText}>
              Download Progress: {Math.floor(downloadProgress * 100)}%
            </Text>
          ) : (
            <Text style={styles.downloadProgressText}>Download Complete</Text>
          )}
        </View>
        <SurfaceView
          style={styles.surfaceView}
          markerId={route.params?.markerId}
          onDownloadProgressChange={(progress) => onProgressChange(progress)}
          isSurfaceDetected={(isSurfaceDetected) =>
            onSurfaceDetected(isSurfaceDetected)
          }
          isAssetAnchored={(isAssetAnchored) =>
            onAssetAnchoredChange(isAssetAnchored)
          }
          rewardsAwarded={(rewards) => onRewardsAwarded(rewards)}
          placeButtonConfig={placeButtonConfig}
        />
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
    paddingBottom: 20,
  },

  userContainer: {
    borderBottomWidth: 1,
    borderColor: '#E3E3E3',
    padding: 15,
  },
  userIdTitle: {
    textAlign: 'center',
    color: '#000000',
    fontWeight: '800',
    fontSize: 16,
  },
  userIdText: {
    paddingTop: 5,
    textAlign: 'center',
    color: '#666666',
    fontSize: 14,
  },
  surfaceView: {
    flex: 1,
  },
  progressArea: {
    padding: 20,
  },
  downloadProgressText: {
    textAlign: 'center',
    color: '#000000',
    fontWeight: '800',
    fontSize: 16,
  },
});

export default SurfaceViewScreen;
