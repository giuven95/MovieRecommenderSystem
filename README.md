# MovieRecommenderSystem
An automatic movie recommendations system project

## Overview

This project was started for University of Messina course "Advanced Techniques for Data Analysis" from the Master's Degree in Engineering and Computer Science.

TODO

## Log
* 2023/01/21 11:50 - Created the project
* 2023/01/21 11:55 - Created section "Main approaches for creating recommender systems"
* 2023/01/21 12:15 - Created sections "Technologies" and "Datasets"
* 2023/01/21 12:20 - Created section "References"
* 2023/02/21 12:50 - Created section "Useful links"
* 2023/02/21 13:20 - Created section "Problem formulation"
* 2023/02/21 13:50 - Added more sections
* 2023/02/21 14:40 - Added more sections
* 2023/02/21 20:30 - Added React, Flask, MongoDB, Docker Compose inside "app" folder
* 2023/02/26 20:20 - Created job system (mockup)
* 2023/02/29 15:00 - Finishing Iteration 0
* 2023/02/29 17:20 - Problem formulation

## Problem formulation

Recommendation systems are a subclass of information filtering systems.

A recommender system uses:

- a dataset of items, like videos, songs, books, movies, items of clothing, e-commerce products etc. 

- a dataset of user interactions (e.g. reads, likes, buys) with some or all of those items

in order to predict items that are more pertinent to a particular user.

More formally, it is defined by:

- $C$: the set of all users

- $S$: the set of all possible items that can be recommended

- $U$: a utility function $U : C \times S$ [[3]](#3)

### Peculiarities of the recommendation problem

Recommendation is a different enough problem from classification and regression to have its own unique challenges.

* **Novelty should sometimes be taken into account**

  TODO

* **Diversity should be taken into account**

  Users can get better satisfaction when lists of recommended items are not monotonous, but rather diverse. [[4]](#4)

* **Serendipity should be taken into account**

  Users want to be surprised by item recommendations; they do not want them to be boring or predictable. [[5]](#5)

* **Often, recommender systems cannot be fully offline**

  TODO

* **In production environments, recommender systems should be mindful of presentation bias**

  TODO

* **In production environments, recommender systems should be robust**

  TODO

* **The future is not always like the past**

  TODO

## Main approaches for creating recommender systems
### Collaborative filtering

Collaborative filtering systems use a database of preferences for items
by users in order to predict additional items a new user might like. They do not rely on the features of users and items for predictions. [[1]](#1)

#### Techniques

TODO

### Content-based filtering

Content-based recommender systems analyze item metadata, like movie names, movie descriptions and tags, and find
regularities in the content. They rely on the features of users and items for predictions. [[1]](#1)

#### Techniques

TODO

### Hybrid approaches

Hybrid approaches combine content-based filtering techniques with those based on collaborative filtering. [[2]](#2)

#### Techniques

TODO

## Performance metrics

TODO

## Project scope and approach

TODO

## Iterations

### Iteration 0

Iteration 0 is comprised of a mock frontend written in React and a mock REST API written in Python using the Flask framework.

It is meant as a rough first draft to serve as the template for the web app project.

It does not contain an actual Machine Learning model, nor does it contain any data scraper.

Job requests are received from a form in the frontend which accepts a Letterboxd profile name to be scraped.

```jsx
<div className="Home AppPage">
  <h2>Find movies you will like!</h2>
  <div className="AppContainer">
    <form className="AppForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="AppFormGroup">
        <label htmlFor="name">
          Insert your Letterboxd profile name:
        </label>
        <input
          type="text"
          {...register("name")}
        />
      </div>
      {canSubmit? <div className="AppFormGroup">
        <button className="AppButton" type="submit">
          <PlayArrowIcon />
          Submit
        </button>
      </div> : ""}
    </form>
  </div>
  {jobStatus === null ? "" : <>
    <h3>Job status</h3>
    <div className="AppContainer">
      <JobStatusBar />
    </div>
  </>}
  {(jobResponse === null || jobResponse.length === 0) ? "" : <>
    <h3>Check out your results</h3>
    <div className="AppContainer">
      <ResponseSection />
    </div>
  </>}
</div>
```

An unique job ID is created in the corresponding Flask endpoint, and it is sent back to the frontend.

Jobs are stored in a MongoDB collection.

```python
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
```

Jobs are passed to workers through a Redis queue for asynchronous execution. A worker script, also written in Python, pretends to process the job request going through different phases.

```python
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
```

The web page polls a job status endpoint every few seconds, notifying the user of any updates. When the job status is set to "DONE", a job response endpoint is queried and the mock suggestions are downloaded in order to display them.

```jsx
  useEffect(() => {
    let intervalId = null;

    if (jobStatus === "DONE" && jobResponse === null) {
      intervalId = setInterval(() => {
        fetch(BACKEND_API_URL + `/response/${jobId}`)
          .then((res) => res.json())
          .then((data) => {console.log(data); setJobResponse(data.response)})
          .catch((error) => console.error(error));
      }, POLLING_DELAY_MS);
    }

    return () => clearInterval(intervalId);
  }, [jobId, jobStatus, jobResponse]);

  useEffect(() => {
    let intervalId = null;

    if (jobId) {
      intervalId = setInterval(() => {
        fetch(BACKEND_API_URL + `/status/${jobId}`)
          .then((res) => res.json())
          .then((data) => setJobStatus(data.status))
          .catch((error) => console.error(error));
      }, POLLING_DELAY_MS);
    }

    return () => clearInterval(intervalId);
  }, [jobId]);

```

TODO

## Technologies
The following technologies were used for the project:

### Frontend

- React

- Zustand

TODO

### Backend

- Flask

- Redis

- MongoDB

TODO

### Machine learning

TODO

### Deployment and infrastructure

TODO

## Datasets
The following datasets were used for the project:

TODO

## References


<a id="1">[1]</a> 

Xiaoyuan Su and Taghi M. Khoshgoftaar,
"A Survey of Collaborative Filtering Techniques",
https://downloads.hindawi.com/archive/2009/421425.pdf


<a id="2">[2]</a> 

Ana Belén Barragáns-Martínez, Enrique Costa-Montenegro, Juan C. Burguillo, Marta Rey-López, Fernando A. Mikic-Fonte, Ana Peleteiro,
A hybrid content-based and item-based collaborative filtering approach to recommend TV programs enhanced with singular value decomposition,
Information Sciences,
Volume 180, Issue 22,
2010,
Pages 4290-4311,
ISSN 0020-0255,
https://doi.org/10.1016/j.ins.2010.07.024.


<a id="3">[3]</a> 

Nitin Mishra et al 2021 J. Phys.: Conf. Ser. 1717 012002


<a id="4">[4]</a> 

Ziegler, C.N., McNee, S.M., Konstan, J.A. and Lausen, G. (2005).
"Improving recommendation lists through topic diversification".
Proceedings of the 14th international conference on World Wide Web. pp. 22–32.


<a id="5">[5]</a> 

Castells, Pablo; Hurley, Neil J.; Vargas, Saúl (2015). "Novelty and Diversity in Recommender Systems". In Ricci, Francesco; Rokach, Lior; Shapira, Bracha (eds.). Recommender Systems Handbook (2 ed.). Springer US. pp. 881–918. doi:10.1007/978-1-4899-7637-6_26. ISBN 978-1-4899-7637-6.


## Useful links

* [Youtube playlist about recommender systems](https://www.youtube.com/playlist?list=PL3ZVX5cUMdLbiFgitZszhnMUZHDDEL0rS)

    - [Problem formulation (Andrew Ng) ](https://www.youtube.com/watch?v=giIXNoiqO_U)
    
    - [Content based recommendations (Andrew Ng)](https://www.youtube.com/watch?v=9siFuMMHNIA)
    
    - [Collaborative filtering (Andrew Ng)](https://www.youtube.com/watch?v=9AP-DgFBNP4)
    
    - [Collaborative filtering algorithm (Andew Ng)](https://www.youtube.com/watch?v=YW2b8La2ICo)
    
    - [Hybrid recommender systems in Python (Maciej Kula, PyData 2016)](https://www.youtube.com/watch?v=EgE0DUrYmo8)

* [Building Production Recommender Systems - Maciej Kula - WEB2DAY 2017](https://www.youtube.com/watch?v=CLNFmm6Lj_I)

* [Neural Networks for Recommender Systems - Maciej Kula - PyData 2017](https://www.youtube.com/watch?v=ZkBQ6YA9E40)

* [Best practices for recommender systems, GitHub repo by Microsoft](https://github.com/microsoft/recommenders)

* [Letterboxd movie recommendations project, GitHub repo by Sam Learner](https://github.com/sdl60660/letterboxd_recommendations)

* [List of movies every hacker should watch, GitHub repo by k4m4](https://github.com/k4m4/movies-for-hackers)
