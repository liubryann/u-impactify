## Sprint Goal
We have many goals for this sprint. One of them involves completing part of the Giving Garden that allows users to view posts that other users have created. Another goal that involved a few stories is adding more functionality to the Courses feature that this application has. After this sprint, an instructor should be able to create a new course with lecture material (videos), and users should be able to view all the courses that are available. The last goal for this sprint is to create an editable Profile Page that users can use to modify their profile picture, introduction and skills. 

## Team Capacity

The capacity for this sprint is **55** story points (does not include tasks/bugs in the sprint)

## Participants
Shree Shah, Ivin Able, Eric Li, Bryan Liu, Simar Bassi, Runjie Zhang, Harry Geng

## Sprint stories and subtasks

| User Story | Description | Subtasks|
| ---------- | -------- |-------|
| **DON-4**: As John Buck - a student, Tien Levi - an instructor, and Mary Janet - representing her organization , I want to add profile information so that I can be identified on the platform | Need to have a page for the user's to input their information when they sign up, as well as a database to store their information. |DON-51: On signup, give user a default image |
||| DON-52: UI and Redux for profile page|
||| DON-62: User details backend |
| **DON-11**: As Tien Levi, an instructor, I want to create a course with a title and summary so that students can view it and subscribe to it | Need to have a course creation page with a title and a summary section, and after the course is created it must be visible to all students.| DON-47: Create course creation page |
|||  DON-49: Implement course creation backend with express and firebase|
||| DON-56: Implement course creation redux state management|
| **DON-12**: As Tien Levi, an instructor, I want to upload videos and documents so that students subscribed to my course can learn the content | There needs to be an option/page for the instructor to upload the media file(s) for the course. | DON-66: Add upload course content front end components|
|||  DON-67: Add backend for course content upload and connect with redux|
| **DON-13**: As John Buck - a student, Tien Levi - an instructor, and Mary Janet - representing her organization, I want to see all the courses that are available so that I can find courses that I want to take | A course library page that displays all available courses.| DON-58: Create page layout for Courses tab|
|||  DON-63: Add enroll/unenroll button to coursecard|
|||  DON-64: Set up state management for courses page|
| **DON-14**: As John Buck - a student, Tien Levi - an instructor, and Mary Janet - representing her organization, I want to access the Giving Garden so that I can view posts made by other users | There needs to be a Giving Garden page that is accessible to everyone.| DON-50: Implement frontend for viewing Giving Garden|
|||  DON-59: Set up state management|
|||  DON-60: Create post component and wrapper|
|||  DON-61: Giving Garden Backend|


*No Spikes for this sprint were needed*

## Decisions about user stories 
- **DON-11** : button to create a new course should only be visible on the dashboard for an Instructor account