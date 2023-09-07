import {
  HMSAudioTrackSettings,
  HMSCameraFacing,
  HMSIOSAudioMode,
  HMSLogAlarmManager,
  HMSLogger,
  HMSLogLevel,
  HMSLogSettings,
  HMSSDK,
  HMSTrackSettings,
  HMSTrackSettingsInitState,
  HMSVideoTrackSettings,
} from '@100mslive/react-native-hms';
import React, { useEffect } from 'react';
import { batch, useDispatch } from 'react-redux';

import { getJoinConfig } from './utils';
import { saveUserData, setHMSInstance } from './redux/actions';
import { FullScreenIndicator } from './components/FullScreenIndicator';
import { clearConfig, useLeaveMethods } from './hooks-util';
import { store } from './redux';
import type { HMSIOSScreenShareConfig } from './utils/types';

const getTrackSettings = () => {
  const joinConfig = getJoinConfig();

  /**
   * Customize local peer's Audio track settings before Joining the Room.
   *
   * Checkout Track Settings docs for more details {@link https://www.100ms.live/docs/react-native/v2/how-to-guides/interact-with-room/track/track-settings}
   */
  let audioSettings = new HMSAudioTrackSettings({
    initialState: joinConfig.mutedAudio
      ? HMSTrackSettingsInitState.MUTED
      : HMSTrackSettingsInitState.UNMUTED,
    audioSource: joinConfig.audioMixer
      ? ['mic_node', 'screen_broadcast_audio_receiver_node']
      : undefined,
    /**
     * `audioMode` param allows you to capture audio in its highest quality
     * by disabling voice processing and increasing the maximum bandwidth limit
     *
     * Checkout Music Mode docs for more details {@link https://www.100ms.live/docs/react-native/v2/how-to-guides/configure-your-device/microphone/music-mode}
     */
    audioMode: joinConfig.musicMode ? HMSIOSAudioMode.MUSIC : undefined,
  });

  /**
   * Customize local peer's Video track settings before Joining the Room.
   *
   * Checkout Track Settings docs for more details {@link https://www.100ms.live/docs/react-native/v2/how-to-guides/interact-with-room/track/track-settings}
   */
  let videoSettings = new HMSVideoTrackSettings({
    initialState: joinConfig.mutedVideo
      ? HMSTrackSettingsInitState.MUTED
      : HMSTrackSettingsInitState.UNMUTED,
    cameraFacing: HMSCameraFacing.FRONT,
    disableAutoResize: !joinConfig.autoResize,
    forceSoftwareDecoder: joinConfig.softwareDecoder,
  });

  return new HMSTrackSettings({
    video: videoSettings,
    audio: audioSettings,
  });
};

const getLogSettings = (): HMSLogSettings => {
  return new HMSLogSettings({
    level: HMSLogLevel.VERBOSE,
    isLogStorageEnabled: true,
    maxDirSizeInBytes: HMSLogAlarmManager.DEFAULT_DIR_SIZE,
  });
};

const getIOSBuildConfig = (): Partial<HMSIOSScreenShareConfig> =>
  store.getState().user.iosBuildConfig || {};

/**
 * Regular Usage:
 * const hmsInstance = await HMSSDK.build();
 * @returns
 */
const getHmsInstance = async (): Promise<HMSSDK> => {
  /**
   * Only required for advanced use-case features like iOS Screen/Audio Share, Android Software Echo Cancellation, etc
   * NOT required for any other features.
   * @link https://www.100ms.live/docs/react-native/v2/advanced-features/track-settings
   */
  const trackSettings = getTrackSettings();

  /**
   * Regular Usage:
   * const hmsInstance = await HMSSDK.build();
   *
   *
   * Advanced Usage Example:
   * @param {trackSettings} trackSettings is an optional value only required to enable features like iOS Screen/Audio Share, Android Software Echo Cancellation, etc
   *
   * @param {appGroup} appGroup is an optional value only required for implementing Screen & Audio Share on iOS. They are not required for Android. DO NOT USE if your app does not implements Screen or Audio Share on iOS.
   *
   * @param {preferredExtension} preferredExtension is an optional value only required for implementing Screen & Audio Share on iOS. They are not required for Android. DO NOT USE if your app does not implements Screen or Audio Share on iOS.
   *
   *
   * const trackSettings = getTrackSettings();
   * const hmsInstance = await HMSSDK.build({
   *  trackSettings,
   *  appGroup: 'group.reactnativehms', // required for iOS Screenshare, not required for Android
   *  preferredExtension: 'RNHMSExampleBroadcastUpload', // required for iOS Screenshare, not required for Android
   * });
   */

  const logSettings = getLogSettings();

  const { appGroup, preferredExtension } = getIOSBuildConfig();

  const hmsInstance = await HMSSDK.build({
    logSettings,
    trackSettings,
    appGroup,
    preferredExtension,
    isPrebuilt: true,
  });

  const logger = new HMSLogger();
  logger.updateLogLevel(HMSLogLevel.VERBOSE, true);
  hmsInstance.setLogger(logger);

  return hmsInstance;
};

export const HMSInstanceSetup = () => {
  const dispatch = useDispatch();
  const { leave } = useLeaveMethods(true);

  useEffect(() => {
    let ignore = false;

    const setupHMSInstance = async () => {
      clearConfig();
      getHmsInstance()
        .then(async (hmssdkInstance) => {
          if (!ignore) {
            // If this component is mounted
            // save instance in store
            batch(() => {
              dispatch(setHMSInstance(hmssdkInstance));
              // TODO: remove this from user reducer
              dispatch(saveUserData({ hmsInstance: hmssdkInstance }));
            });
          } else {
            // If this component is not mounted when this response is received
            // that means Root component is unmounted, we can destroy instance safely
            await leave();
          }
        })
        .catch((error) => {
          // TODO: Handle this gracefully, inform library user about this
          console.warn('Get HMS Instance Error: ', error);
        });
    };

    setupHMSInstance();

    return () => {
      ignore = true;
    };
  }, []);

  return <FullScreenIndicator />;
};
