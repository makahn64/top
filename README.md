# Toptal Blogster

## Project Requirements
The requirements for the test project are:
Write a simple Blogging application using React Native:

- After opening the app, users should see all published blog posts, sorted by date (newest on top).
- No authentication should be required to read blog posts from all users.
- A user should be able to “pull to refresh” on blog post lists to refresh the blog list.
- A user should be able to share any blog post (it should be implemented with native share OS feature). Any other user should be able to open the shared deep link inside the app.
- Users must be able to create an account and log in.
- To be able to write a blog post, users must be logged in.
- A user should be able to edit or delete their blog posts.
- Every blog post must contain an author, title, cover image, blog text, and date of publishing.
- Cover image must be added using the device camera or accessing the camera roll (up to user choice). 
- Minimal UI/UX design is needed. You will not be marked by graphic design. However, do try to keep it as tidy as possible
- You may write your own custom backend or use any available 3rd party backend services (Firebase or similar).
- The project should be demonstrated either on the iOS or Android platforms. This means that if you chose iOS, you wouldn’t need to show the project on any Android devices, but it will need to run well on all iOS phones, not just on one selected.
- Write unit and e2e tests for bonus points.


## Support on Various iOS Devices

### iPhone 4 through iPhone 11

UI looks correct on all devices tested:
- iPhone 4s
- iPhone 5s
- iPhone 6s
- iPhone X, 11
    
UI was forced to portrait only since landscape modes worked poorly for blogging and there appeared to be about 2-4 hours of additional work to ensure the app wasn't spilling over into unsafe areas.

### iPads

The iPad UIs need work. I would not normally use the same UI for an iPad app as for an iPhone, so very little time
was spent improving the look on these devices. Notes are below.

#### iPad Pro (12")

The UI looks just OK for a tablet. If this were a real product, I would design a specific layout and nav for iPad.

Issues (in Jira):
- Tab bar icons and labels are way too small and text is missing. Will need changes to Metrics.js and icon styling in RootNav. 
- Post image aspect ratio is way too wide. Currently this is a fixed numeric height that works well for handsets. Should be replaced with ratio based on
screen height, if time.
- Post cells have uneven margins (image thumbs are higher than text). Have look at whether margins are fixed or Metrics.js based.

#### iPad Air 2 (10")

YIKES!! This one looks even worse that the above. Isues (in Jira):
- Font sizes are waaay too big.
- Tab bar is even more messed up.
