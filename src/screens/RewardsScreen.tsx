import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  getExternalUserId,
  getUserRewards,
  IARReward,
} from 'react-native-iar-sdk';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons/faImage';

const RewardItem = ({ reward }: { reward: IARReward }) => {
  return (
    <View style={styles.rewardItem}>
      <View style={styles.rewardLeftCol}>
        {reward.image ? (
          <Image
            style={styles.rewardImage}
            source={{
              uri: reward.image,
            }}
          />
        ) : (
          <FontAwesomeIcon size={50} icon={faImage} style={styles.rewardIcon} />
        )}
      </View>
      <View style={styles.rewardRightCol}>
        <Text style={styles.rewardItemNameText}>{reward.name}</Text>
        <Text style={styles.rewardItemIdText}>Id: {reward.id}</Text>
        <Text style={styles.rewardItemIdText}>Type: {reward.type}</Text>
        <Text style={styles.rewardItemIdText}>
          RewardReasonType: {reward.rewardReasonType}
        </Text>
        {reward.actionButtonEnabled ? (
          <View>
            <Text style={styles.rewardItemIdText}>
              ActionButtonText: {reward.actionButtonText}
            </Text>
            <Text style={styles.rewardItemIdText}>
              ActionButtonUrl: {reward.actionButtonUrl}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const RewardsScreen = () => {
  const [rewards, setRewards] = useState<IARReward[]>();
  const [userId, setUserId] = useState('');
  useEffect(() => {
    const getRewards = async () => {
      const savedUserID: string = await getExternalUserId();
      setUserId(savedUserID);
      if (savedUserID) {
        const userRewards: IARReward[] = await getUserRewards();
        setRewards(userRewards);
      }
    };

    getRewards();
  }, []);

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
        {userId === '' ? (
          <View>
            <Text>No UserID Set, Please Login in User Management</Text>
          </View>
        ) : (
          <ScrollView>
            <View>
              {rewards?.map((reward: IARReward) => {
                return <RewardItem reward={reward} key={reward.id} />;
              })}
            </View>
          </ScrollView>
        )}
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
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  rewardLeftCol: {},
  rewardRightCol: {},
  rewardImage: {
    width: 50,
    height: 75,
    resizeMode: 'contain',
    marginRight: 20,
  },
  rewardIcon: {
    color: '#3578F6',
    marginRight: 20,
  },
  rewardItemNameText: {
    color: '#000000',
    fontWeight: '800',
    fontSize: 16,
  },
  rewardItemIdText: {
    color: '#666666',
  },
});

export default RewardsScreen;
