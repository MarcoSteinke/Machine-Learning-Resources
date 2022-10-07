from flask import Flask, request, jsonify, escape
import flask
import numpy as np

# Initialize the Flask application
app = Flask(__name__)

@app.route('/')
def index():
    return flask.render_template('index.html')


# route http posts to this method
@app.route('/api/test', methods=['POST'])
def test():
    if request.method == 'POST':
        f = request.files['file']
        return f.read()



if __name__ == '__main__':
    # start flask app
    app.run(host="0.0.0.0", port=5000)
    