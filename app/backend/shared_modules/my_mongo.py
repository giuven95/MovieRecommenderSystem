from mongoengine import connect
import os

def my_mongo_connect():
    connect(
        host=f"mongodb://{os.environ['MONGODB_USERNAME']}:{os.environ['MONGODB_PASSWORD']}@{os.environ['MONGODB_HOST']}",
    )