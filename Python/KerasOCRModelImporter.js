import * as tf from '@tensorflow/tfjs';

const importModel = (resource) => await tf.loadLayersModel(resource);
