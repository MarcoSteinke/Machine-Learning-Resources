# Python

import tensorflowjs as tfjs
import keras_ocr

def transform_model_to_tfjs(model, name):
    tfjs.converters.save_keras_model(model, "exports/" + name)

detector = keras_ocr.pipeline.Pipeline().detector.build_detector()
recognizer = keras_ocr.pipeline.Pipeline().recognizer
transform_model_to_tfjs(detector, "keras_ocr")