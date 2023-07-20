import React, { useState } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

function App() {
  const [videoSrc, setVideoSrc] = useState('');
  const [message] = useState('Click Start to transcode');
  const ffmpeg = createFFmpeg({
    log: true,
    corePath: 'https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js',
  });

  const trim = async ({ target: { files } }: any) => {
    const { name } = files[0];
    console.log('Loading ffmpeg-core.js');
    await ffmpeg.load();
    console.log('Start trimming');

    ffmpeg.FS('writeFile', name, await fetchFile(files[0]));
    await ffmpeg.run('-i', name, '-vf', 'transpose=3', 'output.mp4');
    console.log('Complete trimming');
    const data = ffmpeg.FS('readFile', 'output.mp4');
    setVideoSrc(URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' })));
  };
  return (
    <div className="App">
      <input type="file" onChange={trim} />
      <p />
      <video src={videoSrc} controls></video>
      <br />
      {/* <button onClick={doTranscode}>Start</button> */}
      <p>{message}</p>
    </div>
  );
}

export default App;
