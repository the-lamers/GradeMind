from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Разрешить CORS для всех доменов

# @app.route('/api/data', methods=['GET'])
# def get_data():
#     return jsonify({"message": "Hello from Flask!"})

@app.route('/api/data', methods=['POST'])
def post_data():
    data = request.json
    return jsonify({"reply": data["answer"]})

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)