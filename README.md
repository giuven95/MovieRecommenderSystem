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

## Problem formulation

TODO

### Peculiarities of the recommendation problem

Recommendation is a different enough problem from classification and regression to have its own unique challenges.

* **Novelty should sometimes be taken into account**

  TODO

* **Diversity should be taken into account**

  TODO

* **Serendipity should be taken into account**

  TODO

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

TODO

## Technologies
The following technologies were used for the project:

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
