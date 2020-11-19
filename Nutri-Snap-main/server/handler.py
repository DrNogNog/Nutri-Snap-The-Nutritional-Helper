from tensorflow import keras
import PIL
from PIL import Image
import numpy as np
import tensorflow as tf
import os
import requests
from tensorflow.keras import backend as K
from tensorflow.keras.backend import set_session
from tensorflow.keras.models import load_model
# custom swish activation
def swish(x):
    return (K.sigmoid(x)*x) 
global graph
global sess
sess = tf.Session()
graph=tf.get_default_graph()

set_session(sess)
modelFood=keras.models.load_model('../model/foodClass_v3',custom_objects={'swish':swish})


def predict(file,id):
    try:
        file=Image.open(file)
        file=file.resize((224,224))
        file=np.array(file)
        file=np.expand_dims(file,axis=0)
        with graph.as_default():
            set_session(sess)
            fruitRes=modelFood.predict(file)
            fruitMax=np.argmax(fruitRes)
            data={"data":"undefined","food":"undefined","nutrients":"undefined","id":"undefined"}
            data["id"]=id
            if fruitMax==0:
                data["food"]="Ceaser Salad"
            elif fruitMax==1:
                data["food"]="Hamburger"
            elif fruitMax==2:
                data["food"]="Mac and Cheese"
            elif fruitMax==3:
                data["food"]="Pizza"
            url = "https://nutritionix-api.p.rapidapi.com/v1_1/search/"+data["food"]

            querystring = {"fields":"nf_calories,nf_total_fat"}

            headers = {
                'x-rapidapi-host': "nutritionix-api.p.rapidapi.com",
                'x-rapidapi-key': "baedb480cdmsh017e67830c2f872p1a2366jsnb401d2325dd7"
            }
            response = requests.request("GET", url, headers=headers, params=querystring)
            response=response.json()
            response=response["hits"]
            urlNutr="https://api.edamam.com/api/food-database/v2/parser?ingr="+data["food"]+"&app_id=b0bb8ba1&app_key=a3ee0f537f9f4922926682f2c3bc9f94"
            nutr=requests.request("GET",urlNutr)
            nutr=nutr.json()
            nutr=nutr["hints"][0]["food"]["nutrients"]
            data["nutrients"]=nutr
            if(len(response)<1):
                data["data"]="Not found"
                return data
            if(len(response)<3):
                data["data"]=response[0]
                return data
            num=0
            for i in range(0,3):
                num+=response[i]["fields"]["nf_calories"]
            data["data"]=response[0]
            data["data"]["fields"]["nf_calories"]=(num/3)
            return data

            
        #model.predict(file)
        #return "error"
        #return np.argmax(model.predict(file)) #instead of just taking the argmax see if any of the other predictions for rooteness (maybe just any of the predictions) != 0 then say it has some roteness
    except Exception as e:
        return str(e)+" From handler"


