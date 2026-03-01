import { createContext, useReducer, useContext, useCallback } from "react";

const PostsContext = createContext();

export const usePosts = () => useContext(PostsContext);

const initialState = {
    posts: [
        { id: 1, username: "junhyung_park", location: "Seoul, Korea",       detail: "아 배고프다 🍚", image: null, timeAgo: "5h", comments: [], likes: 0, likedBy: [] },
        { id: 2, username: "park.junhyung", location: "West Lafayette, IN", detail: "아 졸리다 😴",   image: null, timeAgo: "2h", comments: [], likes: 0, likedBy: [] },
    ],
    isModalOpen: false,
    savedPostIds: [],
};

const MY_USERNAME = 'junhyung_park';

function postsReducer(state, action) {
    switch (action.type) {

        case 'ADD_POST':
            return { ...state, posts: [{ ...action.payload, comments: [], likes: 0, likedBy: [] }, ...state.posts] };

        case 'DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.payload),
                savedPostIds: state.savedPostIds.filter(id => id !== action.payload),
            };

        case 'TOGGLE_LIKE':
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id !== action.payload) return post;
                    const alreadyLiked = post.likedBy.includes(MY_USERNAME);
                    return {
                        ...post,
                        likes:   alreadyLiked ? post.likes - 1 : post.likes + 1,
                        likedBy: alreadyLiked
                            ? post.likedBy.filter(u => u !== MY_USERNAME)
                            : [...post.likedBy, MY_USERNAME],
                    };
                }),
            };

        case 'ADD_COMMENT':
            return {
                ...state,
                posts: state.posts.map(post =>
                    post.id === action.payload.postId
                        ? { ...post, comments: [...post.comments, action.payload.comment] }
                        : post
                ),
            };

        case 'SAVE_POST':
            return { ...state, savedPostIds: [...state.savedPostIds, action.payload] };

        case 'UNSAVE_POST':
            return { ...state, savedPostIds: state.savedPostIds.filter(id => id !== action.payload) };

        case 'OPEN_MODAL':
            return { ...state, isModalOpen: true };

        case 'CLOSE_MODAL':
            return { ...state, isModalOpen: false };

        default:
            return state;
    }
}

export const PostsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(postsReducer, initialState);

    const addPost    = useCallback((newPost) => dispatch({ type: 'ADD_POST',     payload: newPost }),               []);
    const deletePost = useCallback((id)      => dispatch({ type: 'DELETE_POST',  payload: id }),                   []);
    const toggleLike = useCallback((id)      => dispatch({ type: 'TOGGLE_LIKE',  payload: id }),                   []);
    const addComment = useCallback((postId, comment) => dispatch({ type: 'ADD_COMMENT', payload: { postId, comment } }), []);
    const savePost   = useCallback((id)      => dispatch({ type: 'SAVE_POST',    payload: id }),                   []);
    const unsavePost = useCallback((id)      => dispatch({ type: 'UNSAVE_POST',  payload: id }),                   []);
    const openModal  = useCallback(()        => dispatch({ type: 'OPEN_MODAL' }),                                  []);
    const closeModal = useCallback(()        => dispatch({ type: 'CLOSE_MODAL' }),                                 []);

    return (
        <PostsContext.Provider value={{
            posts:        state.posts,
            isModalOpen:  state.isModalOpen,
            savedPostIds: state.savedPostIds,
            addPost,
            deletePost,
            toggleLike,
            addComment,
            savePost,
            unsavePost,
            openModal,
            closeModal,
        }}>
            {children}
        </PostsContext.Provider>
    );
};

export default PostsContext;