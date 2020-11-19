
import sys
import os
import tensorflow as tf
from tensorflow.keras.layers import *
from tensorflow.keras.optimizers import *
from tensorflow.keras.models import Model
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping
from tensorflow.keras import backend as K
from tensorflow import keras

'''
base_model=keras.applications.VGG16(
    weights='imagenet',
    input_shape=(224,224,3),
    include_top=False
)
base_model.trainable=False

inputs = Input(shape=(224, 224, 3))
x = base_model(inputs, training=False)
x = Flatten()(x)
x = Dense(256, activation='relu')(x)
x = Dropout(.5)(x)
outputs = Dense(6, activation = 'softmax')(x)
model = Model(inputs, outputs)
'''

from tensorflow.keras.models import Sequential
def swish(x):
    return (K.sigmoid(x)*x)


shape_img = (224,224,3)    
''' 
model =Sequential()
model.add(Conv2D(filters=32, kernel_size=(3,3),input_shape=shape_img, activation=swish, padding = 'same'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Conv2D(filters=64, kernel_size=(3,3),input_shape=shape_img, activation=swish, padding = 'same'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Conv2D(filters=64, kernel_size=(3,3),input_shape=shape_img, activation=swish, padding = 'same'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Conv2D(filters=64, kernel_size=(3,3),input_shape=shape_img, activation=swish, padding = 'same'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Conv2D(filters=64, kernel_size=(3,3),input_shape=shape_img, activation=swish, padding = 'same'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Conv2D(filters=64, kernel_size=(3,3),input_shape=shape_img, activation=swish, padding = 'same'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Conv2D(filters=64, kernel_size=(3,3),input_shape=shape_img, activation=swish, padding = 'same'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Conv2D(filters=32, kernel_size=(3,3),input_shape=shape_img, activation=swish, padding = 'same'))
model.add(Flatten())
model.add(Dense(256,activation=swish))
model.add(Dropout(0.5))
model.add(Dense(4, activation="softmax"))
'''

base_model=keras.applications.VGG19( #Transfer Learning
    weights='imagenet',
    input_shape=(224,224,3),
    include_top=False
)
base_model.trainable=False

#base_model = tf.keras.applications.inception_resnet_v2.InceptionResNetV2(input_shape=(224,224, 3),
#                                            include_top=False, 
#                                           weights='imagenet')
inputs = Input(shape=(224, 224, 3))
x = base_model(inputs, training=False)
x = Flatten()(x)
x = Dense(256, activation=swish)(x)
x = Dropout(.5)(x)
outputs = Dense(5, activation = 'softmax')(x)
model = Model(inputs, outputs)

model.compile(loss='categorical_crossentropy',
              metrics=["accuracy"],
             optimizer = 'adam')

transformation_ratio=0.05
datagen = ImageDataGenerator(rescale=1. / 255,
                             validation_split = 0.13,
                             rotation_range=transformation_ratio,
                             shear_range=transformation_ratio,
                             zoom_range=transformation_ratio,
                             cval=transformation_ratio,
                             horizontal_flip=True,
                             vertical_flip=True)
train_it = datagen.flow_from_directory("../fruitclass/train", 
                                       target_size=(224,224), 
                                       color_mode='rgb', 
                                       class_mode="categorical",
                                       batch_size=12,
                                       subset = "training")

# Validation Data
val_it = datagen.flow_from_directory("../fruitclass/train",
                                     target_size=(224,224),
                                     color_mode='rgb',
                                     class_mode="categorical",
                                     batch_size=12,
                                     subset='validation')

# load and iterate test dataset

test_it = datagen.flow_from_directory("../fruitclass/test", 
                                      target_size=(224,224), 
                                      color_mode='rgb', 
                                      class_mode="categorical")

history = model.fit_generator(generator = train_it,
                              steps_per_epoch=train_it.samples/train_it.batch_size,
                              epochs=15,
                              validation_data=val_it,
                              validation_steps=val_it.samples/val_it.batch_size,
)

model.evaluate(test_it, steps=test_it.samples/test_it.batch_size)
model.save('foodClass_v4')
