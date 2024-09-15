from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)


lr = joblib.load('logistic_regression_model.pkl')
cv = joblib.load('count_vectorizer.pkl')


def predict_email(email_text):
    email_cv = cv.transform([email_text])
    prediction = lr.predict(email_cv)
    return "Spam" if prediction[0] == 1 else "Not A Spam"


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    email_text = data['text'] 
    prediction = predict_email(email_text)
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
