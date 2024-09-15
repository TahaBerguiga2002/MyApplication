import pandas as pd
import re
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

data = pd.read_csv('malicious_phish.csv')

data['label'] = data['type'].apply(lambda x: 1 if x in ['phishing', 'defacement', 'malware'] else 0)






def extract_features(url):
    features = {}

    features['url_length'] = len(url)
    features['num_digits'] = len(re.findall(r'\d', url))
    features['num_special_chars'] = len(re.findall(r'[^\w]', url))
    features['num_subdomains'] = len(url.split('.')) - 1
    features['has_ip'] = 1 if re.search(r'\d+\.\d+\.\d+\.\d+', url) else 0
    return features

features = data['url'].apply(extract_features).apply(pd.Series)

processed_data = pd.concat([features, data['label']], axis=1)

processed_data.dropna(inplace=True)
X = processed_data.drop('label', axis=1)
y = processed_data['label']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42) #split
model = RandomForestClassifier(n_estimators=100, random_state=42)#random_state shuffle data (melange) #intialization
model.fit(X_train, y_train)#fit model data
y_pred = model.predict(X_test) #prediction test model
print(f'Accuracy: {accuracy_score(y_test, y_pred)}')  #
print(classification_report(y_test, y_pred))
def is_malicious(url):
    features = extract_features(url)
    features_df = pd.DataFrame([features])
    prediction = model.predict(features_df)[0]
    return "Malicious" if prediction == 1 else "Safe"
test_url = "https://wagner-hide-arrest-zum.trycloudflare.com"
print(f'The URL "{test_url}" is {is_malicious(test_url)}.')
import pickle
pickle.dump(model, open('url.pkl', 'wb'))
print('model successfully created')
