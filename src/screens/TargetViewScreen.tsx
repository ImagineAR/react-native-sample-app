import React from 'react';
import { Linking, SafeAreaView, StyleSheet, View } from 'react-native';
import { IARPlaceButtonConfig, TargetView } from 'react-native-iar-sdk';

const TargetViewScreen = () => {
  const onRewardAwarded = () => {
    console.log('TargetViewScreen - onRewardAwarded');
  };

  const onTrackingChanged = (isTracking: boolean) => {
    console.log('TargetViewScreen - onTrackingChanged: ', isTracking);
  };

  const onTargetScanned = (targetId: string) => {
    console.log('TargetViewScreen - onTargetScanned: ', targetId);
  };

  const onRewardButtonPressed = async (actionButtonUri: string) => {
    console.log('TargetViewScreen - onRewardButtonPressed: ', actionButtonUri);
    try {
      await Linking.openURL(actionButtonUri);
    } catch (e) {
      console.error("Couldn't load page", e);
    }
  };

  const placeButtonConfig: IARPlaceButtonConfig = {
    borderWidth: 2,
    borderRadius: 5,
    textColor: '#ffd800',
    backgroundColor: '#ff00e8',
    borderColor: '#FFFFFF',
    width: 200,
    height: 50,
  };

  return (
    <SafeAreaView style={styles.safeViewArea}>
      <View style={styles.container}>
        <TargetView
          style={styles.targetView}
          rewardAwarded={() => onRewardAwarded()}
          rewardButtonPressed={onRewardButtonPressed}
          trackingChanged={(isTracking) => onTrackingChanged(isTracking)}
          targetScanned={(targetId) => onTargetScanned(targetId)}
          placeButtonConfig={placeButtonConfig}
          rewardButtonConfig={placeButtonConfig}
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
  targetView: {
    flex: 1,
  },
});

export default TargetViewScreen;
