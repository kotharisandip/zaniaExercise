# app.py
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
#CORS(app)
CORS(app, resources={r"/documents": {"origins": "http://localhost:3000"}})
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://sandip:sandip123@localhost:5432/document_db'
db = SQLAlchemy(app)

class Document(db.Model):
    __tablename__ = 'documents'
    
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50))
    title = db.Column(db.String(100))
    position = db.Column(db.Integer)

@app.route('/documents', methods=['GET'])
def get_documents():
    documents = Document.query.order_by(Document.position).all()
    return jsonify([{
        'type': doc.type,
        'title': doc.title,
        'position': doc.position
    } for doc in documents])

@app.route('/documents', methods=['POST'])
def save_documents():
    documents = request.json
    for doc in documents:
        document = Document.query.filter_by(type=doc['type']).first()
        if document:
            document.position = doc['position']
        else:
            document = Document(type=doc['type'], title=doc['title'], position=doc['position'])
            db.session.add(document)
    db.session.commit()
    return jsonify({'message': 'Documents saved successfully'})

if __name__ == '__main__':
    app.run(debug=True)
