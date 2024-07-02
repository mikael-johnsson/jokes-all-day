# Testing for *Jokes all day*

This is the testing for the site *Jokes all day*.

Link to live site [here](https://jokes-all-day-frontend-26d817bb989c.herokuapp.com/)

Find the README [here](README.md).
## User Story testing


|User Story|Working|
|-|-|
|Epic: *User Accounts*||
|As a user, I can easily find the login and logout button, so that I can enter and leave the site when I please|✔️|
|As a non logged in user, I can easily find the account pages, so that I can create an account and log in|✔️|
|Epic: *Joke (with full CRUD)*||
|As a user, I can create a joke, so that I can share my comedy with other users|✔️|
|As a user, I can see my own jokes, so that I can get a clear picture of what jokes I have posted|✔️|
|As a user, I can edit my own joke, so that I can update it to my satisfaction|✔️|
|As a user, I can delete my joke, so that I can choose what jokes to display to other users|✔️|
|Epic: *Interaction*||
|As a user, I can see jokes by other users, so that I can take part in the joke community|✔️|
|As a user, I can search the feeds, so that I can find a specific joke or user|✔️|
|As a user, I can rate other users jokes, so that I can share how much I liked it|✔️|
|As a user, I can see my own given average rating, so that I can display my rating to other users|✔️|
|As a user, I can see a jokes average rating, so that I can see what users think of that joke|✔️|
|As a user, I can report a joke, so that I can let admin know that I find the joke offensive|✔️|
|Epic: *Site owner administration*||
|As an admin, I can handle reports, so that I can keep track of which reports have been dealt with|✔️|
|As an admin, I can delete a joke, so that I can maintain a high quality site|✔️|

## Automated Testing
### W3C HTML

W3C HTML validator checks for errors and warnings in the deployed html code. This site was run through the validator and came back with no errors or warnings. It did display info about unnecessary trailing slashes.

![Image of the W3C html validator](src/assets/documentation/testing/html_validation.jpg)

### W3C CSS
W3C CSS validator checks for errors and warnings in the sites css pages. These are the results:

|File|Errors|
|-|-|
|App.module.css|No errors|
|Alert.module.css|No errors|
|Button.module.css|No errors|
|Joke.module.css|No errors|
|JokeFeed.module.css|No errors|
|MoreDropdown.module.css|No errors|
|NavBar.module.css|No errors|npm start
|NotFound.module.css|No errors|
|SignInUpForm.module.css|No errors|

### Prettier
The extension Prettier formats documents by a good coding standard. It makes the code more readable. Prettier has been used on all files in this project.

### Lighthouse
Lighthouse is a tool in Google Chrome Devtools that analyze a website on it's Performance, Accessibility, Best Practices and SEO. These are this sites results:

*Home page, desktop*
![Lighthouse score for desktop, home page: Performance 79, Accessibility 93, Best Practices 100, SEO 100](src/assets/documentation/testing/LH_home_page_desktop.jpg)

*Profile page, desktop*
![Lighthouse score for desktop, profile page: Performance 84, Accessibility 98, Best Practices 100, SEO 100](src/assets/documentation/testing/LH_profile_page_desktop.jpg)

*Report page, desktop*
![Lighthouse score for desktop, report page: Performance 92, Accessibility 95, Best Practices 100, SEO 100](src/assets/documentation/testing/LH_report_page_desktop.jpg)

*Home page, mobile*
![Lighthouse score for mobile, home page page: Performance 55, Accessibility 93, Best Practices 100, SEO 100](src/assets/documentation/testing/LH_home_page_mobile.jpg)

*Profile page, mobile*
![Lighthouse score for mobile, profile page: Performance 55, Accessibility 98, Best Practices 100, SEO 100](src/assets/documentation/testing/LH_profile_page_mobile.jpg)

*Report page, mobile*
![Lighthouse score for mobile, report page: Performance 58, Accessibility 95, Best Practices 100, SEO 100](src/assets/documentation/testing/LH_report_page_mobile.jpg)

**Conclusion:**

There is absolutely work to be done in the performance area. As of now, the site is a bit too slow. Actions to be taken in a later iteration:
- Improve imports. React bootstraps imports are not written in the most efficient way. This means longer loading times as unnecessary data is being loaded.
- More efficient code. A lot of data handling of the site ends with a page reload. A more efficient code would use the full strength of React and only re-render affected components.


## Manual Testing
### Not logged in User
*NavBar*
|Feature|Expected Outcome|Testing Performed|Result|
|-|-|-|-|
|||||
|||||
|||||
|||||
|||||

*Sign up page*
|Feature|Expected Outcome|Testing Performed|Result|
|-|-|-|-|
|||||
|||||
|||||
|||||
|||||

*Login page*
|Feature|Expected Outcome|Testing Performed|Result|
|-|-|-|-|
|||||
|||||
|||||
|||||
|||||

*Home page*
|Feature|Expected Outcome|Testing Performed|Result|
|-|-|-|-|
|||||
|||||
|||||
|||||
|||||

### Logged in User
*NavBar*
|Feature|Expected Outcome|Testing Performed|Result|
|-|-|-|-|
|||||
|||||
|||||
|||||
|||||

### Admin
*NavBar*
|Feature|Expected Outcome|Testing Performed|Result|
|-|-|-|-|
|||||
|||||
|||||
|||||
|||||


## Bugs
### Fixed bugs

### Flaws
