import * as tf from '@tensorflow/tfjs';

const model = await tf.loadLayersModel('./model.json')
const predict = model.predict("jsdf")
console.log(predict)