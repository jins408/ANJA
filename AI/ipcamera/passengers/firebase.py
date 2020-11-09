import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from datetime import datetime

cred = credentials.Certificate("taste-ac33e-firebase-adminsdk-u8rj0-fc33c78348.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

# taste-ac33e-firebase-adminsdk-u8rj0-fc33c78348

def push_data(data):
    doc_ref = db.collection(u'logs').document(data['line']).collection(u'messages')
    doc_ref.add({
        u'id': data['id'],
        u'line': data['line'],
        u'sid': data['sid'],
        u'ssid': data['ssid'],
        u'category': data['category'],
        u'time': datetime.now()
    })