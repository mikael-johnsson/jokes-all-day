# Jokes all day
*Jokes all day* is the place to go if you want a big ol' laugh! See some of the worlds best jokes and take part in the community yourself!

This is a project created under the Code Institute flag, being the portfolio project 5. It is for learning purposes only.

Find the live site [here]()

![Image of the responsiveness of the site]()

## Contents

* [User Experience](#user-experience)
    * [Colour Scheme](#colour-scheme)
    * [Font](#Font)
* [Project Planning](#project-planning)
    * [Agile Methods](#agile-methods)
    * [MoSCoW method](moscow-method)
    * [User Stories](#user-stories)
    * [Wireframes](#wireframes)
    * [ERDs](#erds)
* [Features](#features)
    * [CRUD functionality](#crud-functionality)
    * [Showcase](#showcase)
        * [Navbar](#navbar)
        * [Sign Up / Login / Logout](#sign-up--login--logout)
        * [Home page](#home-page)
        * [List menu](#list-menu)
        * [List](#list)
        * [Error pages](#error-pages)
        * [Admin page](#admin-page)
        * [Messages](#messages)
    * [Future Features](#future-features)
        * [Visual examples in home page](#visual-examples-in-home-page)
        * [Improved email feature](#improved-email-feature)
        * [A shop price scanner](#a-shop-price-scanner)
        * [Link to admin page](#li)
* [Technologies and Languages used](#technologies-and-languages-used)
* [Testing](#testing)
* [Deployment](#deployment)
    * [Creating the Django App](#github)
    * [Deploying on Heroku](#Django)
    * [How to fork](#heroku)
    * [How to clone](#CI-database)
* [Credits](#credits)
    * [Code](#code)
    * [Acknowledgements](#acknowledgements)

## User Experience

### Colour Scheme


- 
- 
- 
- 

![Image of the colour pallette used]()
### Font


## Project Planning
The object of this site is to give the users a laugh. Laughter is the best medicine is obviously not true in a literal sense, but absolutely true figuratively speaking. 

Users can post jokes that the rest of the community can take part of. A star rating system gives the user instant feedback on their jokes, both separately and as an average on all the posted jokes.

**Site Goals**
* Provide a n easy way to good jokes
* Have a nice look with good responsiveness
* Have easy to use features
* Have an easy to use report function to keep the quality of the site high

### Agile Methods
This project was planned with agile methods. As some features depended on others to be built, the obvious way was to start with the most fundamental features and user stories first and work upwards.

Only one iteration has been completed and future features are planned to take place in the second iteration.

### MoSCoW Method
The issues created for this site were labeled with the use of the MoSCoW method. That divides the labels into:

* Must have - features that is a must for the site to be working as intended
* Should have - features that the site should have to be of use to the user
* Could have - features that could bring that little extra to the user
* Won't have - features that no longer fit the project or won't be included in this release

### Epics, User Stories, Issues
#### Epic: Setup
- Create a repository at Github and use it to create a workspace in Gitpod.
- Install React in the workspace
- Install React Bootstrap, React Infinite Scroll and other necessary packages

#### Epic: User Accounts 
- As a user, I can easily find the login and logout button, so that I can enter and leave the site when I please
- As a non logged in user, I can easily find the account pages, so that I can create an account and log in

#### Epic: Joke (with full CRUD)
- As a user, I can create a joke, so that I can share my comedy with other users
- As a user, I can see my own jokes, so that I can get a clear picture of what jokes I have posted
- As a user, I can edit my own joke, so that I can update it to my satisfaction
- As a user, I can delete my joke, so that I can choose what jokes to display to other users


#### Epic: Interaction
- As a user, I can see jokes by other users, so that I can take part in the joke community
- As a user, I can search the feeds, so that I can find a specific joke or user
- As a user, I can rate other users jokes, so that I can share how much I liked it
- As a user, I can see my own given average rating, so that I can display my rating to other users
- As a user, I can see a jokes average rating, so that I can see what users think of that joke
- As a user, I can report a joke, so that I can let admin know that I find the joke offensive

#### Epic: Site owner administration
- As an admin, I can handle users accounts, so that I can maintain a high quality site
- As an admin, I can handle reports, so that I can keep track of which reports have been dealt with
- As an admin, I can delete a joke, so that I can maintain a high quality site


### Wireframes
The site was developed mobile first. The desktop wireframes are therefor bigger versions of the mobile wireframes. In the wireframes checkboxes are to be seen. That feature was never implemented. More information can be found at [Future features](#future-features).

**Mobile**

![Wireframe for the start page on mobile]()
![Wireframe for the sign up page on mobile]()
![Wireframe for the login page on mobile]()
![Wireframe for the list menu on mobile]()
![Wireframe for the list on mobile]()
![Wireframe for the share list feature on mobile]()

**Desktop**

![Wireframe for the start page on desktop]()
![Wireframe for the sign up page on desktop]()
![Wireframe for the login page on desktop]()
![Wireframe for the list menu on desktop]()
![Wireframe for the list on desktop]()
![Wireframe for the share list feature on desktop]()
### ERDs
This site uses three models: Django's *User* model, a *list* model and a *list item* model. 

Below is the Entity Relationship Diagram:

![Image of the sites ERD](static/images/documentation/your-shopping-list-ERD.png)


**User**

Django's User model is a excellent way to create and handle users at your site. Combined with the AllAuth framework, a lot of the work to create a functioning site with users is already done. 

The default fields for the AllAuth sign up page is *username*, *email* and *password.* To differentiate between regular users and admin accounts the *Superuser* field was added to the ERD. These are not all of the Django User model fields, but those used in this site.

**List**

The List model is a custom model. It has a primary key of Djangos default id field, that increments automatically. That id is also what builds the detailed list views URL. The author field is a foreign key that connects with the user model. It is mostly used for authentification.

**List item**

The List item model is what creates what you actually see in the lists. It also has a primary key of the default id field. It also connects to the user model via the author field. The List model has a second foreign key connecting it to the List model. This is to make sure that the correct items are displayed when opening a list.

## Features
### CRUD functionality
This site contains three different kind of objects: User, List and List item.

As a logged in user you can handle List and List items. With simple buttons and forms you can create, read, update and delete your lists and list items.

As a non logged in user you are only allowed to create a user. Remaining handling features of the user object is limited to the superusers through the admin page. As of now there is no way for a regular user to update username, change password or delete account.

### Feature showcase
#### Navbar
The Navbar is simple. An only text logo and links to Sign Up, Login and (when logged in) Logout.

![Image of the sites navbar when not logged in](static/images/documentation/navbar-signup-login.jpg)

![Image of the sites navbar when logged in](static/images/documentation/navbar-logout.jpg)

#### Sign Up / Login / Logout
The Sign Up, Login and Logout pages all inherits the navbar from the rest of the site. Their own design comes mostly from the AllAuth framework.

![Image of the sites sign up page](static/images/documentation/sign-up-page.jpg)
![Image of the sites login page](static/images/documentation/login-page.jpg)
![Image of the sites logout page](static/images/documentation/logout-page.jpg)

#### Home page
The home page is what a non logged in user sees when entering the site. Back end wise this is the same page as the List menu.

A short text quickly explains to the user what the site can do and why it is useful.

![Image of the sites home page](static/images/documentation/home-page.jpg)

#### List menu
The list menu displays the user's lists with a notebook like background. The name of the list appears to be on one of the lines in the notebook. At the bottom of the menu the user finds the "Create New List"-button. That opens a modal in which the user can submit a name to the list.

![Image of the list menu](static/images/documentation/list-menu.jpg)
![Image of the new list modal](static/images/documentation/new-list-modal.jpg)

#### List
In the detailed list view is where the real work of the site takes place. This is where the user creates the content of the list. The page also allows the user to edit the list, delete the list and via email share the list.

The *EDIT* and *EDIT LIST* buttons allows the user to edit the list name respectively the list items.

To share and delete the list - modals pop up and the user can enter the information needed and/or confirm the action.

![Image of the sites list page](static/images/documentation/detailed-list.jpg)
![Image of the sites list page when edit buttons clicked](static/images/documentation/list-edits.jpg)
![Image of the share list modal](static/images/documentation/share-list-modal.jpg)
![Image of the delete list modal](static/images/documentation/delete-list-modal.jpg)
#### Error pages
If an error were to appear, the site has a 404 / 403 / 500 page ready to go. For consistency they all look the same with slight differences in the displayed message and error code. A link takes the user back to the home page.

![Image of the sites 404 page](static/images/documentation/404-page.jpg)

#### Admin page
The site uses the Django Admin page. From there a superuser can use CRUD functionality on all of the sites objects.

![Image of the sites admin page](static/images/documentation/admin-page.jpg)

#### Messages
Django Messages are used to confirm or inform to user of it's actions. The messages are always displayed between the content and the navbar. They also have a close button to hide the message.

![Image of a message on the site](static/images/documentation/messages.jpg)

### Future features
There are a lot of features that were considered for this site that would make it a lot better. Time has, as always, been a factor in the development and it wasn't sufficient to create and implement these features.

#### Checkbox
For a long time during the development, a checked field was part of the List item model. The idea was to allow the user to check a checkbox when an item had been bought / put in the basket when at the store. That data would then be stored until the next time the list were opened. 

Lack of understanding how to connect the input checkbox element with the checked field in the model put the feature on hold for now.

#### Visual examples in home page

To give a new user a better understanding of how the site looks and works, images or real examples of the list menu and detailed list could be displayed on the home page.

#### Improved email feature
As of now, the email feature gives the receiver the name of the list, the list items and a custom message. Ideally the receiver would also get the notebook look that is associated with the site, in the email. The chosen email service, EmailJS, seems to lack that feature as of now.

#### A shop price scanner
A feature that would really take the site to the next level would be the shop price scanner. The idea would be that the user inserts a list item (for example "Granny Smith apples") and the site scans the local grocery stores and suggests a store to visit depending on that stores price of the specific item. This would of course require an item library and a function to scan stores websites.

#### Link to admin page
To make it easier for a Superuser to navigate to the admin page, a link to the page could be added to the navbar or to a footer. For now the superuser needs to add /admin to the home page URL.

## Technologies used
- **HTML5**, used to create the structure of the site
- **CSS**, used to add custom styling
- **Javascript**, used to add interactivity
- **Python**, used to provide functionality
- **Django**, framework used to create the backend shell of the site
- **Bootstrap**, used for easy styling
- **CI Database**, used for data storage
- **Lucidchart**, used for creating ERDs
- **Balsamiq**, used for creating wireframes
- **Am I responsive?**, used for responsiveness imagery
- **Coolors**, used for creating colour pallette
- **Gitpod**, used for writing code in
- **Github**, used for storing code in 
- **Heroku**, used for deployment

## Testing
Testing of the site can be found [here](TESTING.md).

## Deployment
### Creating the Django App
This is how this Django App was created:
1. [This](https://github.com/Code-Institute-Org/gitpod-full-template) Code Institute template was used
2. When own repository had been created, a Gitpod workspace was created
3. Django was installed: `pip3 install django gunicorn` 
4. Supporting database libraries were installed: `pip3 install dj_database_url psycopg2`
5. A requirements file were created: `pip freeze --local > requirements.txt`
6. A project were created: `django-admin startproject project_name`
7. An app were created: `python3 manage.py startapp app_name` 
8. App were addded to INSTALLED_APPS[] in project_name > settings
9. Changes were migrated: `python3 manage.py migrate`

The app were the working. Test your app with command `python3 manage.py runserver`

### Deploying on Heroku
This app was deployed using Heroku.
1. Create an account and / or login to Heroku.
2. Click "New" and "Create new app"
3. Choose a name and a region
4. If not last deployment, add DISABLE_COLLECTSTATIC = 1 to config vars in settings
5. Add your DATABASE_URL (if any) and SECRET_KEY to config vars
6. In deployment, connect Heroku App to you Github repository
7. Deploy through automatic or manual deployment

### How to fork
These are instructions how to fork the app from Github:

1. Sign in / create an account at [Github](https://www.github.com)
2. Go to the application's repository [*your-shopping-list*](https://github.com/mikael-johnsson/your-shopping-list)
3. Click "Fork" > "Create a new fork"
4. Choose an appropriate name and click "Create Fork"

### How to clone
These are instructions how to fork the app from Github:

1. Sign in / create an account at [Github](https://www.github.com)
2. Go to the application's repository [*your-shopping-list*](https://github.com/mikael-johnsson/your-shopping-list)
3. Click "Code"
4. Choose to clone via HTTPS, SSH-key or Github CLI
5. Go to IDE of choice, I chose Gitpod
6. Create workspace via chosen clone way from step 4

## Credits
### Code
The log in/log out/sign up code is from Django AllAuth library and inplemented as it was in the Code Institute Blog Walkthrough.

The notebook look is from [here](https://www.codesdope.com/blog/article/getting-notebook-paper-effect-with-css/).
### Acknowledgments
A big thank you to my mentor Graeme Taylor for inspiration and encouragement.