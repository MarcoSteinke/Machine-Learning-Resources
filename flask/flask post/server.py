from flask import Flask, request
import flask as flask
from markupsafe import escape

app = Flask(__name__)

form = """
    <form action="http://localhost:5000/user/add" method="post">
        <input type="text" name="username" id="username" placeholder="Username">
        <input type="submit" value="Send">
    </form>
"""

users = ["Marco"]

@app.route('/')
def index():
    return flask.redirect('/users')

@app.route('/users')
def return_users():
    return escape(users) + flask.render_template("index.html")

@app.route('/user/add', methods=['POST'])
def add_user():
    if request.method == 'POST':
        username = request.form.get('username')
        users.append(username)
        return escape(users)

#"User {}".format(escape(username))