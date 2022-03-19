# Python

import tensorflowjs as tfjs

def transform_model_to_tfjs(model, name):
    tfjs.converters.save_keras_model(model, "exports/")
