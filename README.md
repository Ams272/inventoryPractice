# inventoryPractice
This is a simple app that basically does 4 main functions
At the frontend, it has 4 forms, 
A form takes care of adding information to the database
Another deletes a specified item in the database
The last one updates the information in the database

At the backend,

all the routes the backend has, their http verbs, the request params, the request body and all that is required
/info/get
verb: method get
params: nil
response: 200, array of items


/info/add
method: post
params: nil
request body: 
    name: required
    quantity: required
    comment: required
    
/info/delete
method: post
params: nil
request body: 
    name: required

/info/update
method: put
params: nil
request body:
    name: required