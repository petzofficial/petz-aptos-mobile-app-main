import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import PlayerActions from '../components/PlayerActions';
import Countdown from '../components/Countdown';
import PomoModule from '../native/PomoModule';
import type { TabParamList, StackParamList } from '../types/navigation';
import { useTheme } from '../hooks/useTheme';
import { usePomoTimer } from '../hooks/usePomoTimer';
import { Orientation, useOrientation } from '../hooks/useOrientation';
import HeaderButton from '../components/HeaderButton';
import { useNavigation } from '@react-navigation/native';
import InfoIcon from '../assets/icons/info.svg';
import Notifi from '../assets/icons/alert-triangle.svg';
import * as Progress from 'react-native-progress';

type PomoScreenProps = BottomTabScreenProps<TabParamList, 'Pomo'>;

const PomoScreen = (_props: PomoScreenProps) => {
  const theme = useTheme();
  const orientation = useOrientation();
  // const navigation = useNavigation();
  const navigation =
    useNavigation<BottomTabScreenProps<TabParamList, 'Pomo'>>();
  const { running, time, percent, cycle, cycleCount, cycleDuration, state } =
    usePomoTimer();

  return (
    <ScrollView>
      <HeaderButton onPress={() => navigation.navigate('About')}>
        <View style={styles.headerContainer}>
          <View style={styles.subContainer}>
            <Notifi color={theme.colors.notification} width={24} height={24} />
            <Text style={styles.TextColor}>PetZ Money</Text>
            <InfoIcon color={theme.colors.text} width={24} height={24} />
          </View>
          <View style={styles.flexView}>
            <Notifi color={theme.colors.notification} width={24} height={24} />
            <View style={styles.boxWhite}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={require('../assets/icons/pst-removebg-preview.png')}
                  style={{ width: 24, height: 24 }}
                />

                <Text
                  style={[
                    styles.TextColor,
                    { color: 'orange', fontSize: 16, marginLeft: 6 },
                  ]}>
                  100 APT
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 6,
                }}>
                <Image
                  source={require('../assets/icons/pgt-removebg-preview.png')}
                  style={{ width: 24, height: 24 }}
                />

                <Text
                  style={[styles.TextColor, { color: 'orange', fontSize: 16 }]}>
                  100 APT
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 6,
                }}>
                <Image
                  source={require('../assets/icons/pst-removebg-preview.png')}
                  style={{ width: 24, height: 24 }}
                />

                <Text
                  style={[styles.TextColor, { color: 'orange', fontSize: 16 }]}>
                  100 APT
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.boxView}>
          <Text style={[styles.TextColor, { color: 'orange', fontSize: 16 }]}>
            Level
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View>
              <Progress.Bar
                progress={0.6}
                width={270}
                color="#2AAA8A"
                unfilledColor="#D3D3D3"
                borderWidth={0}
              />
            </View>
            <Text style={{ marginLeft: 10 }}>60%</Text>
          </View>

          <Text
            style={[
              styles.TextColor,
              { color: 'orange', fontSize: 16, marginTop: 10 },
            ]}>
            Energy
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View>
              <Progress.Bar
                progress={0.8}
                width={270}
                color="blue"
                unfilledColor="#D3D3D3"
                borderWidth={0}
              />
            </View>
            <Text style={{ marginLeft: 10 }}>80%</Text>
          </View>
        </View>

        <View style={styles.boxView}>
          <Text style={[styles.TextColor, { color: '#D3D3D3', fontSize: 16 }]}>
            Choose Task
          </Text>
        </View>

        <View style={{ flex: 1, flexDirection: 'row' }}></View>
      </HeaderButton>

      {cycleDuration !== 0 && (
        <View
          style={[
            styles.container,
            orientation === Orientation.PORTRAIT
              ? styles.containerPortrait
              : styles.containerLandscape,
          ]}>
          <View style={styles.countdown}>
            <Countdown time={time} percent={percent} state={state} />

            <Text style={[{ color: theme.colors.text }, styles.cycleText]}>
              {cycle}/{cycleCount}
            </Text>
          </View>

          <PlayerActions
            playing={running}
            onPlay={() => PomoModule.play()}
            onPause={() => PomoModule.pause()}
            onStop={() => PomoModule.stop()}
            onReset={() => PomoModule.reset()}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  countdown: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerPortrait: {
    flexDirection: 'column',
    marginVertical: 48,
  },

  containerLandscape: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 16,
  },

  cycleText: {
    marginTop: 16,
    fontSize: 14,
  },

  subContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  flexView: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
  },
  headerContainer: {
    backgroundColor: '#F9692C',
    paddingHorizontal: 30,
    height: 150,
    paddingVertical: 30,
  },
  boxWhite: {
    backgroundColor: 'white',
    height: 35,
    flexDirection: 'row',
    paddingHorizontal: 5,
    borderRadius: 10,
    marginLeft: 20,
    width: '100%',
    paddingRight: 30,
    justifyContent: 'space-around',
  },
  TextColor: {
    color: 'white',
    fontWeight: '600',
    fontSize: 20,
  },
  boxView: {
    borderColor: '#D3D3D3',
    borderWidth: 1,
    //  height:100,
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 20,
    borderRadius: 10,
  },
});

export default PomoScreen;
