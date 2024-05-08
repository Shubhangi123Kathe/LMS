import { BiSolidDownvote, BiSolidUpvote } from 'react-icons/bi'

export default function PostPopUp({ upvotePost, downvotePost, closeLearnMore, post }) {
    return (
        <>
            <div className=''>
                <div className=''>
                    <h1>{post.title}</h1>
                    <button onClick={() => closeLearnMore(false)}>Close</button>
                </div>
                <div className=''>
                    {post.body}
                </div>

                <div className=''>
                    <div className=''>
                        participants: "nitesh", "rahul", "rohan"
                    </div>
                    <div className=''>
                        components: "computer"
                    </div>
                    <input type="text" placeholder="Enter components you want to add" />
                    <div className=''>
                        <button>Update Component Requirements</button>
                        <button>Participate</button>
                    </div>
                    <div className=''>
                        votes: {post.votes}
                        <button className='' onClick={() => upvotePost(post)}><BiSolidUpvote /></button>
                        <button className='' onClick={() => downvotePost(post)}><BiSolidDownvote /></button>
                    </div>

                </div>

            </div>
        </>
    )
}