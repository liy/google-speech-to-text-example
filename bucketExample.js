// Imports the Google Cloud client library for Beta API
/**
 * TODO(developer): Update client library import to use new
 * version of API when desired features become available
 */
const speech = require('@google-cloud/speech').v1p1beta1;

// Creates a client
const client = new speech.SpeechClient();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
const gcsUri = 'gs://cloud-samples-tests/speech/commercial_mono.wav'
//  'Model to use, e.g. phone_call, video, default';
const model = 'default';
// Encoding of the audio file, e.g. LINEAR16';
const encoding = 'LINEAR16'
const sampleRateHertz = 8000;
const languageCode = 'en-US';//'BCP-47 language code, e.g. en-US';

async function main() {
  const config = {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
    enableAutomaticPunctuation: true
  };

  const request = {
    config: config,
    audio: {
      uri: gcsUri
    },
  };

  // Detects speech in the audio file
  const [operation] = await client.longRunningRecognize(request);
  const [response] = await operation.promise();
  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
  console.log(`Transcription: ${transcription}`);
}
main().catch(console.error);