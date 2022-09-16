from flask import Flask
from markupsafe import escape

app = Flask(__name__)

@app.route('/')
def index():
    return "<div>Hello World</div>"

@app.route('/user/<username>')
def return_user_page(username):
    return "User {}".format(escape(username))