# DevTinder APIs 

## AuthRouter 
- POST /signup
- POST /login
- POST /logout 

## ProfileRouter 
- GET / profile / view 
- PATCH / PROFILE /view
- PATCH /profile/ password 

## ConnectionRequestRouter
- POST / request/ send /interested/:userId
- POST / request/ send /ignore/:userId
- POST / request/review/rejected /:requestId 
- POST / request/review/accepted /:requestId 

## User Router
-  GET /user/ connections 
-  GET/user/requests/received
-  GET/user/feed-get you the profiles of other 

Status : ignore , interested , accepted , rejected  