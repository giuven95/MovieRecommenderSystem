import time
from shared_modules.my_mongo import my_mongo_connect
from mongoengine import *

MOCK_WAIT = 5
JOB_STATUSES = ["INIT", "SCRAPING_DATA", "BUILDING_MODEL", "CREATING_RECOMMENDATIONS", "DONE"]
DEFAULT_SUGGESTIONS = [
    {"name": "The Shawshank Redemption", "score": 9.3},
    {"name": "The Godfather", "score": 9.2},
    {"name": "The Godfather: Part II", "score": 9.0},
    {"name": "The Dark Knight", "score": 9.0},
    {"name": "12 Angry Men", "score": 8.9},
    {"name": "Schindler's List", "score": 8.9},
    {"name": "The Lord of the Rings: The Return of the King", "score": 8.9},
    {"name": "Pulp Fiction", "score": 8.9},
    {"name": "The Good, the Bad and the Ugly", "score": 8.8},
    {"name": "Fight Club", "score": 8.8}
]

class Suggestion(EmbeddedDocument):
    name = StringField(required=True)
    score = FloatField(required=True)


class Job(Document):
    job_id = StringField(required=True, unique=True)
    profile_name = StringField(required=True)
    status = StringField(required=True)
    response = ListField(EmbeddedDocumentField(Suggestion))
    stopped = BooleanField(default=False)


def process_job(job):
    my_mongo_connect()
    for i, job_status in enumerate(JOB_STATUSES):
        job_doc = Job.objects(job_id=job['id']).first()
        if job_doc.stopped: return
        if i == 0: continue
        job_doc.status = job_status
        if i == len(JOB_STATUSES) - 1: 
            job_doc.response = [Suggestion(name=movie['name'], score=movie['score']) for movie in DEFAULT_SUGGESTIONS]
        job_doc.save()
        time.sleep(MOCK_WAIT)