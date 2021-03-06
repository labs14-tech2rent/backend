# Backend

# API Documentation

####  Backend delpoyed to [Heroku](https://labstech2rent.herokuapp.com/), STAGING URL: [Heroku Staging](https://labstech2rentstaging.herokuapp.com) <br>

##  Getting started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- **npm run server** to start the local server
- **npm run test** to start server using testing environment

### Backend framework goes here


-    Point One
-    Point Two
-    Point Three
-    Point Four

##  Endpoints



#### Items Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/api/items`            | all items      | Returns the list of all items in the db.     |
| PUT    | `/api/items/:id `       | edit item      | Modify an existing item.                     |
| DELETE | `/api/items/:id `       | delete item    | Remove item from the db.                     |

#### User Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/api/users/`           | all users           | Returns a list of all users.                       |
| GET    | `/api/users/unprotected`| all users no auth   | Returns a list of all users.                       |
| GET    | `/api/users/:id/reviews`| user with reviews   | Returns a user with  reviews.                      |
| GET    | `/api/users/userIDs`    | all users Ids       | Returns a list of all user IDs.                    |
| POST   | `/api/users/:id/items`  | add new item        | Adds a new item for a user.                        |
| POST   | `/api/auth/register`    | add new user        | Registration of profile of a new user.             |
| PUT    | `/api/users/:id`        | edit user           | Modify an existing user.                           |
| POST   | `/api/users/findUser`   | logged in user      | Retrieves user information                         |


# Data Model



#### ITEMS

---

```
  {
      users_ownerId: 1,
      name: "APEMAN Trail Camera 16MP 1080P Wildlife Camera, Night Detection Game Camera with No Glow 940nm IR LEDs, Time Lapse, Timer, IP66 Waterproof Design",
      price: 20.00,
      picture: "https://ae01.alicdn.com/kf/HTB1Brc7QFXXXXbFXVXXq6xXFXXXX.jpg",
      category: "Cameras",
      sub_category: "Trail Camera",
      description: "Trail cameras are fit for hunters and wildlife enthusiasts alike. These motion-activated cameras capture images day or night, whenever an animal passes into the field of view.",
      available: 1,
      payment_type: "Online",
      avarage_raiting: 4.5,
      condition: "Used",
      city: "Philadelphia", 
      state: "PA",
      zipcode: '19099'
  }
```

#### USERS

---

```
  {
    "id": 1,
    REQUIRED "auth0_user_id": "fake |348100",
    REQUIRED "email": "Gerhard_Schaden@hotmail.com",
    REQUIRED "name": "Lionel603100",
    "profile_picture": "https://s3.amazonaws.com/uifaces/faces/twitter/giuliusa/128.jpg",
    "phone": "1-178-323-9534 x11315",
    "date_of_birth": "1561860083989.0",
    "preferred_payment_type": "Amex Black Card",
    "street": "90239 Cruickshank Route",
    "city": "Madisonhaven",
    "state": "IA",
    "zip_code": 62903,
    "average_rating": 5.7,

  }
```


#### USERS_REVIEWS

---

```
      {
        user_id: 1,
        reviewer_id: 2,
        rating: 4.5,
        review_title: "Great Job",
        review_body: "Love this user so much! Excellent work and great service. Always rent things from him"

      }
```

##  Actions



### Items

`getAll()` -> Returns all items

`getItemById(itemId)` -> Returns a single item by ID

<br>
<br>
<br>

### Users

`getAll()` -> if no param all users

`getAllByIds()` -> Returns all users by user ID

`addUser(user object)` --> Creates a new user and returns that user.

`getUserById(id)` -> Returns one user by ID (not Auth0 id)

`getUserByUsername(filter)` -> Filters username

##  Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

    *  STAGING_DB - optional development db for using functionality not available in SQLite
    *  NODE_ENV - set to "development" until ready for "production"
    *  JWT_SECRET - you can generate this by using a python shell and running import random''.join([random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789!@#\$%^&amp;*(-*=+)') for i in range(50)])
    *  SENDGRID_API_KEY - this is generated in your Sendgrid account
    *  stripe_secret - this is generated in the Stripe dashboard
    
## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](https://github.com/labs14-tech2rent/frontend) for details on the frontend of our project.

See [Android Documentation](https://github.com/labs14-tech2rent/android) for details on the Android version of our project.
