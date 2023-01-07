import pickle
from flask import Flask,request,app,jsonify,url_for,render_template
import numpy as np
import pandas as pd

app= Flask(__name__)
# Load the model
xgb_model = pickle.load(open('xgbclassifier.pkl','rb'))
scalar = pickle.load(open('scaling.pkl', 'rb'))

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/predict_api', methods=['POST'])

def predict_api():
    data = request.json['data']
    print(np.array(list(data.values())).reshape(1,-1))
    new_data = scalar.transform(np.array(list(data.values())).reshape(1,-1))
    op = xgb_model.predict(new_data)
    print(op[0])
    return jsonify(int(op[0]))

if __name__=="__main__":
    app.run(debug=True)
