import { createContext, useReducer, useContext, useCallback } from "react";

const PostsContext = createContext();

export const usePosts = () => useContext(PostsContext);

const initialState = {
    posts: [
        { id: 1, username: "junhyung_park", location: "Seoul, Korea",       detail: "아 배고프다 🍚", image: null, timeAgo: "5h" },
        { id: 2, username: "park.junhyung", location: "West Lafayette, IN", detail: "아 졸리다 😴",   image: null, timeAgo: "2h" },
    ],
    isModalOpen: false,
    savedPostIds: [],
};

function postsReducer(state, action) {
    switch (action.type) {
        case 'ADD_POST':
            return { ...state, posts: [action.payload, ...state.posts] };
        case 'DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.payload),
                savedPostIds: state.savedPostIds.filter(id => id !== action.payload),
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

    const addPost    = useCallback((newPost) => dispatch({ type: 'ADD_POST',    payload: newPost }), []);
    const deletePost = useCallback((id)      => dispatch({ type: 'DELETE_POST', payload: id }),     []);
    const savePost   = useCallback((id)      => dispatch({ type: 'SAVE_POST',   payload: id }),     []);
    const unsavePost = useCallback((id)      => dispatch({ type: 'UNSAVE_POST', payload: id }),     []);
    const openModal  = useCallback(()        => dispatch({ type: 'OPEN_MODAL' }),                   []);
    const closeModal = useCallback(()        => dispatch({ type: 'CLOSE_MODAL' }),                  []);

    return (
        <PostsContext.Provider value={{
            posts:        state.posts,
            isModalOpen:  state.isModalOpen,
            savedPostIds: state.savedPostIds,
            addPost,
            deletePost,
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