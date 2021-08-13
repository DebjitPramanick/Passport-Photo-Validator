import json
import sys
import os
import boto3
import base64

def write_to_file(path, data):
    with open(path, "wb") as f:
        f.write(base64.b64decode(data))


def lambda_handler(event, context): # Lambda Function
    
    client = boto3.client('rekognition')
    encodedImg = event["photo"]
    encodedImg = encodedImg[23:]
    
    write_to_file('/tmp/passport.jpg', encodedImg)
    
    try:
        imgFile = open('/tmp/passport.jpg', 'rb')
        imgBytes = imgFile.read()
        imgFile.close()
    except:
        print("Could not read file.")
        
    imgObj = {'Bytes': imgBytes}
    response_labels = client.detect_faces(Image=imgObj)
    
    
    return {
        'body': json.dumps(response_labels)
    }
