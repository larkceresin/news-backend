# news-backend
Practicum final project, backend for auth, registration, and storage
Live on api.larkceresin.students.nomoreparties.site

GET /users/me - provides info on user currently logged in (email and name)  
GET /articles - lists all saved articles by current user logged in  
POST /articles - adds an article to saved.  
DELETE /articles/articleID - removed article from saved list through ID  
POST /signup creates a user (needs email, password, and name)  
POST /signin validates user and returns a JWT.  
