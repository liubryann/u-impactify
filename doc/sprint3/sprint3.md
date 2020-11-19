## Sprint Goal
We have many goals for this sprint. One of them involves allowing a user to create a post on the giving garden. This post will have a title, post content, post type and will also include the author's profile picture and name. One of our other goals this sprint is to allow a user's profile information to be viewed when another user hovers over their icon. This is useful when a user wants to know more about a the person who has written a post, and about an instructor before they take a course. Finally, our last goal was to ensure that a student is able to enroll into a course that they wish to take, from the Courses page. These goals allowed us to complete the Giving Garden feature of this application and move further along for the Courses feature.

## Team Capacity

The capacity for this sprint is **13** story points (does not include tasks/bugs in the sprint)

## Participants
Shree Shah, Ivin Able, Eric Li, Bryan Liu, Simar Bassi, Runjie Zhang, Harry Geng

## Sprint stories and subtasks

| User Story | Description | Subtasks|
| ---------- | -------- |-------|
| **DON-7**: As John Buck, a student, I want to enroll to courses so that I can use the material that is uploaded to advance my knowledge in that field | Need to have an enroll button for courses so that users (that are not instructors) can enroll into a course.|DON-72: Create backend function|
||| DON-79: Add redux for button|
| **DON-16**: As John Buck - a student, Tien Levi - an instructor, and Mary Janet - an organization, I want to post on the Giving Garden asking for support or offering a service| There needs to be the functionality of creating a post on the Giving Garden, either offering a service or asking for donations/help.| DON-75: Post Creation Redux |
|||  DON-76: Post creation backend|
| **DON-21**: As John Buck - a student, Tien Levi - an instructor, and Mary Janet - representing her organization , I want to be able to view another user's profile information so that I can learn more about them through the platform | A way to display a user's profile information when another user requires it. | DON-77: Add profile picture and username to post component|
|||  DON-78: Add profile viewer component|
|||  DON-80: Make profile names on posts and courses viewable|
|||  DON-82: Create redux function to grab other users information|

*No Spikes for this sprint were needed*

## Decisions about user stories 
- **DON-16** : user must create a post of typing OFFERING or ASKING
- **DON-21** : user information will be displayed as a hover box 
