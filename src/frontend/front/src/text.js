const { pipeline } = require("stream");
const fs = require("fs");
// eslint-disable-next-line no-undef
let player = require("play-sound")((opts = {}));
// const sh = require("shelljs");
const TextToSpeechV1 = require("ibm-watson/text-to-speech/v1");
const { IamAuthenticator } = require("ibm-watson/auth");
const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: "s9ucfNGeqEeMVFd8RmbV09-qbIseVXJzfUN_6T4u8ns4",
  }),
  serviceUrl:
    "https://api.us-east.text-to-speech.watson.cloud.ibm.com/instances/b0e6340b-a166-4997-a689-f317f80b7ad4",
});
async function functionTeste(audio) {
  console.log("entrou");
  if (audio) {
    await player.play(audio, function (err) {
      if (err) throw err;
    });
  }
}
function speak(text) {
  const params = {
    text: text,
    voice: "pt-BR_IsabelaV3Voice",
    accept: "audio/wav",
  };
  textToSpeech
    .synthesize(params)
    .then((response) => {
      const audio = response.result;
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
              resolve(file);
              setTimeout(() => {
                functionTeste(file);
              }, 2000);
            } catch (e) {
              reject(e);
            }
          });
        }
      );
    });
}
speak("já deu certo!!");