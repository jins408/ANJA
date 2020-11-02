import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("taste-ac33e-firebase-adminsdk-u8rj0-fc33c78348.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

# taste-ac33e-firebase-adminsdk-u8rj0-fc33c78348

def push_data():
    doc_ref = db.collection(u'users').document(u'alovelace')
    doc_ref.set({
        u'first': u'Ada',
        u'last': u'Lovelace',
        u'born': 1815
    })