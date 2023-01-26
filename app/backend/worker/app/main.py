import sys
import os
from rq import Connection, Worker
from redis import Redis
from shared_modules.jobs import process_job

if __name__ == "__main__":
    with Connection(Redis(host=os.environ['REDIS_HOST'], port=os.environ["REDIS_PORT"], password=os.environ['REDIS_PASSWORD'])):
        qs = sys.argv[1:] or ['default']
        w = Worker(qs)
        w.work()
