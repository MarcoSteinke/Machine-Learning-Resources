import * as tf from '@tensorflow/tfjs';

const importModel = (resource) => { return tf.loadLayersModel(resource) };

module.exports = {
    importModel: importModel
};

const model = importModel("exports/keras_ocr/model.json");
