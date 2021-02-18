const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: "s9ucfNGeqEeMVFd8RmbV09-qbIseVXJzfUN_6T4u8ns4",
  }),
  serviceUrl:
    "https://api.us-east.text-to-speech.watson.cloud.ibm.com/instances/b0e6340b-a166-4997-a689-f317f80b7ad4",
});
function fnTextToSpeech(value) {
  let params = {
    text: value,
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
    fs.writeFileSync("audio.wav", repairedFile);
    console.log("audio.wav written with a corrected wav header");
  })
  .catch((err) => {
    console.log(err);
  });
}




  module.exports = {fnTextToSpeech}