from flask import Flask, jsonify
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app)

@app.route('/api/documents', methods=['GET'])
def get_documents():
    # Connect to PostgreSQL database
    conn = psycopg2.connect(
        dbname='your_dbname', user='your_user', password='your_password', host='localhost'
    )
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM documents')
    documents = cursor.fetchall()
    cursor.close()
    conn.close()

    return jsonify(documents)

if __name__ == '__main__':
    app.run(debug=True)
