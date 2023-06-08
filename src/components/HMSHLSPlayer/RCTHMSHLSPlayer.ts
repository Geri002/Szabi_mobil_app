import {
  requireNativeComponent,
  StyleProp,
  NativeSyntheticEvent,
  ViewStyle,
} from 'react-native';
import type {
  HMSHLSPlayerPlaybackEvent,
  HMSHLSPlayerStatsEvent,
} from '../../types';

export type HmsHlsPlaybackEventHandler = (
  event: NativeSyntheticEvent<HMSHLSPlayerPlaybackEvent>
) => void;

export type HmsHlsStatsEventHandler = (
  event: NativeSyntheticEvent<HMSHLSPlayerStatsEvent>
) => void;

export type RCTHMSHLSPlayerProps = {
  url?: string;
  style?: StyleProp<ViewStyle>;
  enableStats?: boolean;
  enableControls?: boolean;
  onHmsHlsPlaybackEvent?: HmsHlsPlaybackEventHandler;
  onHmsHlsStatsEvent?: HmsHlsStatsEventHandler;
};

export const RCTHMSHLSPlayer =
  requireNativeComponent<RCTHMSHLSPlayerProps>('HMSHLSPlayer');
