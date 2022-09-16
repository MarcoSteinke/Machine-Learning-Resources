from flask import Flask
from flask import jsonify
from flask_json import as_json
from markupsafe import escape
from model import predict


app = Flask(__name__)

@app.route('/')
def index():
    prediction = predict(0)
    # float32 is not serializable for JSON, so we have to convert it to a string
    return jsonify(dict(zip(['label', 'confidence'], [prediction[0], str(prediction[1])])))

@app.route('/user/<username>')
def return_user_page(username):
    return "User {}".format(escape(username))