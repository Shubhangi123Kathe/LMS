import { createContext, useCallback, useEffect, useReducer } from "react";
import axios from 'axios';

export const PostStore = createContext({
    postData: [],
    addPost: () => { },
    upvotePost: () => { },
    downvotePost: () => { },
    contributePost: () => { },
    deletePost: () => { }
});

const postReducer = (currentPostList, action) => {
    let newPostList = currentPostList.slice();

    switch (action.type) {
        case 'initialize':
            return action.payload;
        case 'add':
            newPostList.push(action.payload);
            return newPostList;
        case 'upvote':
            return newPostList.map(post => post.id === action.payload ? { ...post, votes: post.votes + 1 } : post);
        case 'downvote':
            return newPostList.map(post => post.id === action.payload ? { ...post, votes: post.votes - 1 } : post);
        case 'delete':
            return newPostList.filter(post => post.id !== action.payload.id);
        case 'contribute':
            console.log("Contributing...");
            return newPostList;
        default:
            return currentPostList;
    }
};

// eslint-disable-next-line react/prop-types
const PostProvider = ({ children }) => {
    const [postData, dispatchPost] = useReducer(postReducer, []);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:3000/project/all", { withCredentials: true });
                dispatchPost({ type: 'initialize', payload: response.data });
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const addPost = useCallback(async (postObj) => {
        try {
            const response = await axios.post("http://localhost:3000/project/create", postObj, { withCredentials: true });
            dispatchPost({ type: 'add', payload: response.data });
        } catch (error) {
            console.error('Error adding post:', error);
        }
    }, [dispatchPost]);

    const upvotePost = useCallback(async (pid) => {
        dispatchPost({ type: 'upvote', payload: pid });
        const response = await axios.get("http://localhost:3000/project/all", { withCredentials: true });
        dispatchPost({ type: 'initialize', payload: response.data });
    }, [dispatchPost]);

    const downvotePost = useCallback(async (pid) => {
        dispatchPost({ type: 'downvote', payload: pid });
        const response = await axios.get("http://localhost:3000/project/all", { withCredentials: true });
        dispatchPost({ type: 'initialize', payload: response.data });
    }, [dispatchPost]);

    const deletePost = useCallback((postObj) => {
        dispatchPost({ type: 'delete', payload: postObj });
    }, [dispatchPost]);

    const contributePost = useCallback((postObj) => {
        dispatchPost({ type: 'contribute', payload: postObj });
    }, [dispatchPost]);

    return (
        <PostStore.Provider value={{ postData, addPost, deletePost, upvotePost, downvotePost, contributePost }}>
            {children}
        </PostStore.Provider>
    );
};

export default PostProvider;
