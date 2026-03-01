## Original Website
- instagram (https://www.instagram.com)

## Scope of Recreation
Recreated Instagram's basic feautres like main feed, posting, like, comment, search, and profile pages.

## Features
- Scrollable feed with posts(username, location, caption, and image)
- Adding Post by modal (+ button in navbar) with image upload, caption, and location
- Like toggle with counter allowing only one like per account
- Comment submission with counter
- Bookmark/save toggle which shows saved posts in Profile's Saved tab
- Deleting Post by ••• menu on own posts
- Filter users in Search page by their name
- See profile page with avatar, follower stats, bio, post grid, and saved grid
- Dark / Light mode toggle from the sidebar
- Responsive layout — sidebar on desktop, bottom nav bar on mobile

## Technical Implementation

### State Management
- Context API: Two global contexts handle all shared state.
  ModeContext manages the dark/light theme toggle.
  PostsContext manages posts array, modal state, saved post IDs, likes, and comments.
- useReducer: PostsContext uses a reducer instead of numerous useStates.
  Actions: ADD_POST, DELETE_POST, TOGGLE_LIKE, ADD_COMMENT, SAVE_POST, UNSAVE_POST, OPEN_MODAL, CLOSE_MODAL.
- useState: Used for local state such as form inputs, menu toggles, and tab selection.
  Likes and comments are no longer local — they live in PostsContext so they persist across navigation.

### Routing Structure
- HashRouter is used for url directing
- / : Home page —  posts
- /search : Search page — filter users by name or ID
- /profile : Profile page — post grid, saved grid, and user details

### Hooks Used
- useEffect : Manages scroll during opening and closing of modals when adding a new post
- useState: Manages local states within the jsx file - Addpost.jsx, Post.jsx, Interaction.jsx, and more...
- useReducer: Manages complex state logic. in PostsContext.jsx - manages posts, likes, comments, saved posts, and modal state
- useContext: Allow access of ModeContext.jsx and PostsContext.jsx throughout the app
- useRef: Auto-focuses to a text input and triggers image input on modal in AddPost/jsx
- useMemo: Memoizes filtered post/user arrays in Profile.jsx and Search to avoid unnecessary recalculation
- useCallback: Keeps dispatch wrapper functions stable across re-renders in PostsContext.jsx
- React.memo: Wraps Post.jsx and Story.jsx components to avoid re-renders during unrelated state changes
- useDocumentTitle (custom hook): Minimize the repeated pattern of setting document.title for different pages -  Home, Search, and Profile

## 4. What is Still in Progress or Planned Next
- Login/signup page that uses real user authentication
- DB storage so likes, comments, and images can be kept after refreshing pages maube using sql
- Follow/unfollow system that allows users to follow other users
- Video upload support for improved post and reels(short for video) creation.