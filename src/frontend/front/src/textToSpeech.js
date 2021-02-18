const { pipeline } = require("stream");
// eslint-disable-next-line no-undef
let player = require("play-sound")((opts = {}));
const fs = require("fs");
const TextToSpeechV1 = require("ibm-watson/text-to-speech/v1");
const { IamAuthenticator } = require("ibm-watson/auth");
const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: "s9ucfNGeqEeMVFd8RmbV09-qbIseVXJzfUN_6T4u8ns4",
  }),
  serviceUrl:
    "https://api.us-east.text-to-speech.watson.cloud.ibm.com/instances/b0e6340b-a166-4997-a689-f317f80b7ad4",
});

async function handleAudio(audio) {
  console.log("entrou");
  if (audio) {
    await player.play(audio, function (err) {
      if (err) throw err;
    });
  }
}

async function speak(text) {
    const params = {
    text: text,
    voice: "pt-BR_IsabelaV3Voice",
    accept: "audio/wav",
  };
  console.log(params);
  await textToSpeech
    .synthesize(params)
    .then((response) => {
      const audio = response.result;
      console.log(audio)
      return textToSpeech.repairWavHeaderStream(audio);
    })
    .then((repairedFile) => {
      pipeline(fs.writeFileSync("audio.wav", repairedFile)).on(
        "close",
        function () {
          return new Promise((resolve, reject) => {
            try {
              const file = fs.readFileSync("audio.wav", { encoding: "binary" });
              // eslint-disable-next-line no-unused-expressions
              // sh.exec(audio.wav, { silent: true }).output;
              console.log('porradas');
              resolve(file);
              setTimeout(() => {
                handleAudio(file);
              }, 2000);
            } catch (e) {
              reject(e);
            }
          });
        }
      );
    });
  }
speak('texto para falar de novo');
// eslint-disable-next-line no-undef
// player.play('audio.wav', function (err) {
//     if (err) throw err;
//   });
module.exports = { speak }
