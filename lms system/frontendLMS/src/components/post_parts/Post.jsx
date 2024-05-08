import { useContext, useState } from 'react';
import PostPopUp from './PostPopUp';
import { PostStore } from '../../store/backend-store';
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import styles from '../css_modules/Posts.module.css';
import axios from 'axios'
export default function Post({ postObj }) {
    const [learnMoreClicked, clickLearnMore] = useState(false);
    const { upvotePost, downvotePost } = useContext(PostStore);


    const handleUpvote = async (postId) => {
        try {
          // Send an HTTP GET request to upvote the post
          await axios.get(`http://localhost:3000/project/vote/${postId}/upvote`, {withCredentials: true});
          upvotePost(postId);
        } catch (error) {
          console.error('Error upvoting post:', error);
        }
      };
    
      const handleDownvote = async (postId) => {
        try {
          // Send an HTTP GET request to downvote the post
          await axios.get(`http://localhost:3000/project/vote/${postId}/downvote`, {withCredentials:true});
          
          downvotePost(postId);
        } catch (error) {
          console.error('Error downvoting post:', error);
        }
      };


    return (
        <>
            <div className={styles.obj_cont}>
                <h1 className={styles.title}>{postObj.post.title}</h1>
                <p className={styles.info}>{postObj.post.description}</p>
                <div className={styles.action_info}>
                    <div className={styles.action_btns}>
                        <button onClick={() => handleUpvote(postObj.post._id)}><BiSolidUpvote /></button>
                        <button onClick={() => handleDownvote(postObj.post._id)}><BiSolidDownvote /></button>
                        <span>{postObj.voteCount.result}</span>
                    </div>
                    <button className={styles.learn_more} onClick={() => clickLearnMore(true)}>learn more</button>
                </div>
            </div>

            {
                learnMoreClicked && <PostPopUp upvotePost={upvotePost} downvotePost={downvotePost} post={post} closeLearnMore={clickLearnMore} />
            }
        </>
    )
}