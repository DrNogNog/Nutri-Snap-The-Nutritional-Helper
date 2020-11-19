from flask import Flask, make_response,request
import json
import requests
import base64
import random
from flask_cors import CORS, cross_origin
import handler
import string
#from flask_ngrok import run_with_ngrok

def nice_json(arg):
    response = make_response(json.dumps(arg, sort_keys = True, indent=4))
    response.headers['Content-type'] = "application/json"
    return response
def handle_image(image):
    try:
        image=image.replace(' ','+')
        img=base64.b64decode(image)
        rand=''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(15))
        with open("imgs/"+rand+".jpg","wb") as fh:
            fh.write(img)
            fh.close()
            return handler.predict("imgs/"+rand+".jpg",rand)
    except Exception as e:
        return str(e)+" from handle_image"
    
   

app=Flask(__name__)
#CORS(app)

@app.route("/uploadImage",methods=['POST','OPTIONS'])
@cross_origin(origin="*")
def handle():
    if request.method=='POST':
        for i in request.form:
            print(i)
        
        try:
            image=request.form["image"]
            return nice_json({
                "result":handle_image(image)
            })
        except Exception as e:
            print(e)
            return nice_json({
                "error":str(e)
            })



if __name__=="__main__":
    print("Starting Server on port 3000")
    app.run(port=3000,debug=True)