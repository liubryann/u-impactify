## Sprint Goal
The goal for this sprint is to complete some of the highest priority tickets. This is so that we can complete the initial portion of the site (from a user perspective), such as landing page, login and signup; all 3 pages with a header and footer. Our additional goal is to have a functional dashboard with a header and footer that uses mock courses to display something for a user. The ultimate goal is to have the frontend and backend of the above complete and able to demo.

## Team Capacity

The capacity for this sprint is **21** story points (does not include tasks in the sprint)

## Participants
Shree Shah, Ivin Able, Eric Li, Bryan Liu, Simar Bassi, Runjie Zhang, Harry Geng

## Sprint stories and subtasks

| User Story | Description | Tasks|
| ---------- | -------- |-------|
| **DON-1**: As John Buck, a student I want to be able to log into the system so that I can access the website  | Need to implement a sign up and log in system for the users. | DON-30: Create Login Page UI |
|||  DON-40: Login Page Backend|
| **DON-2**: As John Buck, Tien Levi, Mary Janet, I want to be able to sign up for the application | Need to implement a sign up and log in system for the impact learner.| DON-25: Implement signup backend with express and firebase |
|||  DON-26: Implement signup front end with react|
| **DON-6**: As John Buck, a student, I want to view a dashboard with all my courses so that I can see everything I am subscribed to in one place | Need to have a page where a student can see all of their courses. | DON-37: Create Navbar|
|||  DON-41: Create Dashboard layout|
|||  DON-42: Create course card component|
|||  DON-43: Implement redux for dashboard courses|
|||  DON-44: User Courses Backend|
| **DON-24**: As John Buck - a student, Tien Levi - an instructor, and Mary Janet - representing her organization , I want to be able to view a landing page when first accessing the page so that I can learn about the platform and be given options to login and signup | Landing page allows user an initial place to view the site and give them an opportunity to sign in or sign up.| DON-45: Create Topbar|
|||  DON-46: Create BottomBar and landing page|


*No Spikes for this sprint were needed*

## Decisions about user stories 
- Try to keep pages as similar as possible and then show different components based on user type (DON-6 dashboard)
- We have to set up frontend and backend as a separate task (all tasks)
- Showing courses on dashboard is mocked until course creation/enrolment is implemented (DON-6 dashboard)
