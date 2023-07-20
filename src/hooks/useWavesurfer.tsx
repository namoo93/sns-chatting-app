import { useState, useEffect, useCallback } from 'react';
import { COLOR } from 'constants/COLOR';

export const useWavesurfer = ({ waveformRef, wavesurfer, url, play, setPlay }) => {
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    speed: 1,
    duration: 0,
    progress: 0,
  });

  const create = useCallback(async () => {
    const WaveSurfer = (await import('wavesurfer.js')).default;
    const formWaveSurferOptions = (ref) => ({
      container: ref,
      waveColor: COLOR.BLACK,
      progressColor: COLOR.BLACK,
      cursorColor: 'transparent',
      barWidth: 1,
      barRadius: 1,
      responsive: true,
      height: 22,
      normalize: true,
      partialRender: true,
      audioRate: 1,
    });
    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create({
      ...options,
      audioRate: playerState.speed,
    });
    wavesurfer.current.load(url);
    wavesurfer.current.on('ready', function () {
      setPlayerState({
        ...playerState,
        isPlaying: false,
        duration: Math.ceil(wavesurfer.current.getDuration()),
        progress: Math.ceil(wavesurfer.current.getCurrentTime()),
      });
    });
    wavesurfer.current.on('audioprocess', function () {
      setPlayerState({
        ...playerState,
        isPlaying: true,
        duration: Math.ceil(wavesurfer.current.getDuration()),
        progress: Math.ceil(wavesurfer.current.getCurrentTime()),
      });
    });
    wavesurfer.current.on('finish', function () {
      setPlay(false);
      setPlayerState({
        ...playerState,
        isPlaying: false,
        duration: Math.ceil(wavesurfer.current.getDuration()),
        progress: Math.ceil(wavesurfer.current.getCurrentTime()),
      });
    });
  }, [playerState, setPlay, url, waveformRef, wavesurfer]);

  useEffect(() => {
    create();
    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, [create, wavesurfer]);
  useEffect(() => {
    if (play) {
      wavesurfer.current.play(0);
    }
  }, [play, wavesurfer]);

  const handleSpeed = (event) => {
    const speed = Number(event.target.value);
    setPlayerState({
      ...playerState,
      speed,
    });
  };
  return {
    playerState,
    handleSpeed,
  };
};
