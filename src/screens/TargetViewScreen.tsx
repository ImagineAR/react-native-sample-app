import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { IARPlaceButtonConfig, TargetView } from 'react-native-iar-sdk';

const TargetViewScreen = () => {
  const onRewardAwarded = () => {
    console.log('TargetViewScreen - onRewardAwarded');
  };

  const onTrackingChanged = (isTracking: boolean) => {
    console.log('TargetViewScreen - onTrackingChanged: ', isTracking);
  };

  const placeButtonConfig: IARPlaceButtonConfig = {
    borderWidth: 2,
    borderRadius: 5,
    textColor: '#FFFFFF',
    backgroundColor: '#333333',
    borderColor: '#FFFFFF',
    width: 100,
    height: 50,
  };

  return (
    <SafeAreaView style={styles.safeViewArea}>
      <View style={styles.container}>
        <TargetView
          style={styles.targetView}
          rewardAwarded={() => onRewardAwarded()}
          trackingChanged={(isTracking) => onTrackingChanged(isTracking)}
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
  targetView: {
    flex: 1,
  },
});

export default TargetViewScreen;
