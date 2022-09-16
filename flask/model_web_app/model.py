# load the model
from cgi import test
import tensorflow as tf
from tensorflow.keras.layers import Dense, Flatten, Conv2D
from tensorflow.keras import Model
import matplotlib.pyplot as plt
import numpy as np
from tensorflow import keras as keras

# load mnist dataset
mnist = tf.keras.datasets.mnist

(x_train, y_train), (x_test, y_test) = mnist.load_data()
x_train, x_test = x_train / 255.0, x_test / 255.0

# Add a channels dimension
x_train = x_train[..., tf.newaxis].astype("float32")
x_test = x_test[..., tf.newaxis].astype("float32")

print("x_train {}, x_test {}".format(x_train.shape, x_test.shape))

train_ds = tf.data.Dataset.from_tensor_slices(
    (x_train, y_train)).shuffle(10000).batch(32)

test_ds = tf.data.Dataset.from_tensor_slices((x_test, y_test)).batch(32)

print(test_ds)

# load the mnist model
mnist_model = keras.models.load_model("./mnist_model/")

# print the model summary
#mnist_model.summary()

# use the model to predict

def predict(index):
    predictions = mnist_model.predict(test_images)[index]
    predictions_norm = np.linalg.norm(predictions)
    normalized_predictions = abs(predictions / predictions_norm)
    
    return [normalized_predictions.tolist().index(normalized_predictions.max()), normalized_predictions.max()]

test_images = x_test
# prediction = predict(test_images, 0)
# print("label={}, confidence={},".format(prediction[0], prediction[1]))
