const modelParams = {
  flipHorizontal: true, // flip e.g for video
  imageScaleFactor: 0, // reduce input image size for gains in speed.
  maxNumBoxes: 2, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.79, // confidence threshold for predictions.
};

navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.mosGetUserMedia;

const video = document.querySelector ('#video');
const audio = document.querySelector ('#audio');

let model;
handTrack.startVideo (video).then (status => {
  if (status) {
    navigator.getUserMedia (
      {audio: true, video: { width: 1000, height: 400 }},
      stream => {
        video.srcObject = stream;
        // Run detection
        setInterval (runDetection, 300);
      },
      err => console.log (err)
    );
  }
});

handTrack.load (modelParams).then (lmodel => {
  model = lmodel;
});


function runDetection () {
  model.detect (video).then (predictions => {
    if (predictions.length!==0) {
      let hand1 = predictions[0].bbox;
      let x = hand1[0];
      let y = hand1[1];
      if (y > 300) {
        if (x < 200) {
        audio.src="chords.mp3"
      }
    }
    }
  });
}

