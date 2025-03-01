import React from 'react';
import styles from './Post.module.css'
import { Comment } from './Comment';
import { useDispatch, useSelector } from 'react-redux';
import { incrementUpvotes, decrementUpvotes, fetchComments, toggleState } from './NavbarSlice';
import { selectVoteStatus } from './NavbarSlice';

export function Post({id, votes=0, message='', numberOfComments=0, postTimeInSeconds=1, author='', thumbnail='', permalink='', visible=false}){
    const dispatch = useDispatch()
    const voteStatus = useSelector(selectVoteStatus(id))

    const comments = useSelector((state) => {
        const post = state.search.posts.find(post => post.id === id);
        return post ? post.comments : [];
    });

    const postData = {
        id: id,
        votes: shortenValue(votes),
        message: message,
        numberOfComments: shortenValue(numberOfComments),
        postTimeInSeconds: shortenPostTime(postTimeInSeconds)
    }

    function shortenValue(value) {
        let isNegative = value < 0;
        let newValue = Math.abs(value);
    
        if (newValue >= 1_000_000_000) {
            newValue = (newValue / 1_000_000_000).toFixed(1);
            if (Number(newValue) === 1000) return "999.9b";
            newValue += "b";
        } else if (newValue >= 1_000_000) {
            newValue = (newValue / 1_000_000).toFixed(1);
            if (Number(newValue) === 1000) return "999.9m";
            newValue += "m";
        } else if (newValue >= 1000) {
            newValue = (newValue / 1000).toFixed(1);
            if (Number(newValue) === 1000) return "999.9k";
            newValue += "k";
        }
    
        return isNegative ? `-${newValue}` : newValue;
    }

    function shortenPostTime(utcTimestamp) {
        function formatWithCommas(number) {
            return number.toLocaleString();
        }
    
        const now = Math.floor(Date.now() / 1000); // Current time in seconds (UTC)
        const secondsElapsed = now - utcTimestamp;
    
        if (secondsElapsed < 60) {
            return `${secondsElapsed} second${secondsElapsed !== 1 ? 's' : ''} ago`;
        } else if (secondsElapsed < 3600) {
            const minutes = Math.floor(secondsElapsed / 60);
            return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
        } else if (secondsElapsed < 86400) {
            const hours = Math.floor(secondsElapsed / 3600);
            return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        } else if (secondsElapsed < 604800) {
            const days = Math.floor(secondsElapsed / 86400);
            return `${days} day${days !== 1 ? 's' : ''} ago`;
        } else if (secondsElapsed < 2419200) {
            const weeks = Math.floor(secondsElapsed / 604800);
            return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
        } else if (secondsElapsed < 29030400) {
            const months = Math.floor(secondsElapsed / 2419200);
            return `${months} month${months !== 1 ? 's' : ''} ago`;
        } else {
            const years = Math.floor(secondsElapsed / 29030400);
            return `${formatWithCommas(years)} year${years !== 1 ? 's' : ''} ago`;
        }
    }

    const handleComments = (postId) => {
        dispatch(toggleState(postId))
        if (permalink) {
          dispatch(fetchComments(permalink));
        } else {
          console.error("Error: Invalid permalink!");
        }
      };

    return (
        <div className={styles.post} key={id}>
            <div className={styles.votes}>
                <button 
                    type="button"
                    onClick={() => dispatch(incrementUpvotes({ id: postData.id }))}
                    className={`
                        ${styles.voteButton} 
                        ${voteStatus === 1 ? styles.upvoted : ''}
                    `}
                >&#8679;</button>
                <h2>{postData.votes}</h2>
                <button 
                    type="button"
                    onClick={() => dispatch(decrementUpvotes({ id: postData.id }))}
                    className={`
                        ${styles.voteButton} 
                        ${voteStatus === -1 ? styles.downvoted : ''}
                    `}
                >&#8681;</button>
            </div>
            <div className={styles.postinfo}>
                <a href={permalink} target='_blank' rel='noreferrer'>
                    <div className={styles.message}>
                        <div>
                            <p>{postData.message}</p>
                            <img src={thumbnail} alt="" width={styles.imagecontainer}></img>
                        </div>
                    </div>
                </a>
                <div className={styles.extra}>
                    <div className={styles.comments}>
                        <button type="button" onClick={(e) => handleComments(postData.id)}>
                            <p>💬</p>
                            <p>{postData.numberOfComments}</p>
                        </button>
                    </div>
                    <div className={styles.author}>
                        {author && (
                            <p>By {author}</p>
                        )}
                    </div>
                    <div className={styles.posttime}>
                        <p>{postData.postTimeInSeconds}</p>
                    </div>
                </div>
                {visible && <div className={styles.commentBox}>
                    {Object.keys(comments).map((comment) => (
                        <Comment comment={comments[comment]} shortenPostTime={shortenPostTime} postId={id} shortenValue={shortenValue}/>
                    ))}
                </div>}
            </div>
        </div>
    )
}