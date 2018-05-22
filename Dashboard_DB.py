from flask import Flask
from handler.Handler import Handler
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

# Default Route
@app.route('/')
def welcome():
    return 'Messaging App Dashboard - Default Route'

# Trending topics via #hashtags (top 10)
@app.route('/Dashboard_DB/topics/')
def getTrendigTopics():
    return Handler().getTrendingTopics()

# Number of messages per day
@app.route('/Dashboard_DB/messages/')
def getMessages():
    return Handler().getMessages()

# Number of replies per day
@app.route('/Dashboard_DB/replies/')
def getReplies():
    return Handler().getReplies()

# Number of likes per day
@app.route('/Dashboard_DB/likes')
def getLikes():
    return Handler().getLikes()

# Number of dislikes per day
@app.route('/Dashboard_DB/dislikes/')
def getDislikes():
    return Handler().getDislikes()

# Active users posting messages or replies per day (top 10)
@app.route('/Dashboard_DB/users/')
def getActiveUsers():
    return Handler().getActiveUsers()

if __name__ == '__main__':
    app.run()