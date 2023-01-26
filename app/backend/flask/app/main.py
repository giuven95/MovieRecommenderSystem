import datetime
import os
import time
import uuid
from flask import Flask, Response, request, jsonify
from flask_cors import CORS
from constants import API_PREFIX
from rq import Queue
from redis import Redis
from shared_modules.my_mongo import my_mongo_connect
from shared_modules.jobs import process_job, Job, JOB_STATUSES

app = Flask(__name__)
cors = CORS(app)

redis_conn = Redis(host=os.environ['REDIS_HOST'], port=os.environ["REDIS_PORT"], password=os.environ['REDIS_PASSWORD'])
q = Queue(connection=redis_conn)

@app.route(API_PREFIX + "/hello", methods=["GET"])
def get_hello_world():
    return jsonify({"hello": "world"})


@app.route(API_PREFIX + "/request", methods=["POST"])
def post_request():
    my_mongo_connect()
    data = request.get_json()
    if "name" not in data:
        return jsonify({"error": "Missing field name in request body"}), 400
    profile_name = data["name"]
    job_id = str(uuid.uuid4())
    job_doc = Job(job_id=job_id, profile_name=profile_name, status=JOB_STATUSES[0], response=[])
    job_doc.save()
    q.enqueue(process_job, {"id": job_id, "profile_name": profile_name})
    return jsonify({"id": job_id})


@app.route(API_PREFIX + "/status/<job_id>", methods=["GET"])
def get_job_status(job_id):
    my_mongo_connect()
    job = Job.objects(job_id=job_id).first()
    if not job:
        return jsonify({"error": "Job not found"}), 404
    return jsonify({"status": job.status})


@app.route(API_PREFIX + "/response/<job_id>", methods=["GET"])
def get_job_response(job_id):
    my_mongo_connect()
    job = Job.objects(job_id=job_id).first()
    if not job:
        return jsonify({"error": "Job not found"}), 404
    return jsonify({"response": job.response})


@app.route(API_PREFIX + "/stop/<job_id>", methods=["POST"])
def stop_job(job_id):
    my_mongo_connect()
    job_doc = Job.objects(job_id=job_id).first()
    if not job:
        return jsonify({"error": "Job not found"}), 404
    job_doc.stopped = True
    job_doc.save()
    return jsonify({"stopped": True})