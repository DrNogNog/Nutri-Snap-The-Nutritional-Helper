# -*- coding: utf-8 -*-
"""
Created on Thu Nov  5 11:55:34 2020

@author: Dennis
"""


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
import PIL
from PIL import Image
import numpy as np



#rottenfruitMin_v1 ~ 0.96 test. rottenfruitMin_v2 (swish !relu) ~ 0.96  (doesnt work)
def swish(x):
    return (K.sigmoid(x)*x)
model=keras.models.load_model('fruitClass_v5',custom_objects={'swish':swish}) 

#fresh bannana
fb="../tests/banana/fresh.jpg"
fb=Image.open(fb)
fb=fb.resize((224,224))
fb=np.array(fb)
fb=np.expand_dims(fb,axis=0)
fbh=model.predict(fb)
print(np.argmax(fbh))
print(fbh)

#rotten banana
rb="../tests/banana/rotten.jpg"
rb=Image.open(rb)
rb=rb.resize((224,224))
rb=np.array(rb)
rb=np.expand_dims(rb,axis=0)
rbh=model.predict(rb)
print(np.argmax(rbh))
print(rbh)



#fresh orange
fo="../tests/orange/fresh3.jpg"
fo=Image.open(fo)
fo=fo.resize((224,224))
fo=np.array(fo)
fo=np.expand_dims(fo,axis=0)
foh=model.predict(fo)
print(np.argmax(foh))
print(foh)

#rotten orange
ro="../tests/orange/rotten.jpg"
ro=Image.open(ro)
ro=ro.resize((224,224))
ro=np.array(ro)
ro=np.expand_dims(ro,axis=0)
roh=model.predict(ro)
print(np.argmax(roh)) 
print(roh)

