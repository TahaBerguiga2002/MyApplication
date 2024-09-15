from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import pickle
import pandas as pd
import re

app = Flask(__name__)
CORS(app)  


model = pickle.load(open('url.pkl', 'rb'))

def remove_https(url):
    if url.startswith("https://"):
        return url[8:]  
    elif url.startswith("http://"):
        return url[7:]
    return url

def extract_features(url):
    features = {}
    features['url_length'] = len(url)
    features['num_digits'] = len(re.findall(r'\d', url))
    features['num_special_chars'] = len(re.findall(r'[^\w]', url))
    features['num_subdomains'] = len(url.split('.')) - 1
    features['has_ip'] = 1 if re.search(r'\d+\.\d+\.\d+\.\d+', url) else 0
    return pd.DataFrame([features])

@app.route('/')
def home():
    return render_template('popup.html')

@app.route('/classify', methods=['POST'])
def classify_url():
    data = request.get_json()
    if 'url' not in data:
        return jsonify({'error': 'Invalid input'}), 400

    url = data['url']
    features = extract_features(url)
    prediction = model.predict(features)[0]
    result = "Malicious URL" if prediction == 1 else "Safe URL"
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
