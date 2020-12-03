## Sprint Goal
The goal for the final sprint of this project is to complete this app. We plan to complete some major functionality such as viewing course material in the form of videos for each subsection. This involves creating a page for each course with the outline and material. We also want to create a Settings page that allows any user to change their name and password for their account. Appropriate validation will be required so that users can only change their password if they remember their current one. This validation itself is an important feature. Lastly, though it is not included as any new stories, the goal is to complete all bug tickets and ensure that the U-Impactify app is fully funcitonal. 

## Team Capacity

The capacity for this sprint is **21** story points (does not include tasks/bugs in the sprint)

## Participants
Shree Shah, Ivin Able, Eric Li, Bryan Liu, Simar Bassi, Runjie Zhang, Harry Geng

## Sprint stories and subtasks

| User Story | Description | Subtasks|
| ---------- | -------- |-------|
| **DON-5**: As John Buck a student, Tien Levi an instructor, and Mary Janet representing her organization , I want to modify my account information such as name and login credentials so that I can make changes accordingly. | Need to have a page for users to modify their information after they have already signed up. |DON-98: Settings page UI|
||| DON-99: Settings page Redux|
||| DON-101: Settings Page Backend|
| **DON-9**: As John Buck, a student, I want to view the material outline in a course so that I can see the content breakdown of the course| Need to have a summary section for every course.| DON-93: Redux for getting course information|
|||  DON-95: Create front end to display course outline|
| **DON-10**: As John Buck, a student, I want to view each course material (video) so that I can learn the content | Need to have a material section for each course, as well as a place to store the media files for later viewing. | DON-92: Create a backend function to retrieve course content|
|||  DON-94: Create a component to contain video and title of course|
|||  DON-96: Click on course card directs you to course material|

*No Spikes for this sprint were needed*

## Decisions about user stories 
- **DON-5** : need good validation to ensure user knows current password, and cannot let user have empty name fields
