import React from "react";
import styles from './Comment.module.css'
import { useDispatch } from "react-redux";
import { decrementCommentVotes, incrementCommentVotes } from "./NavbarSlice";

export function Comment({ comment, shortenPostTime, shortenValue, postId }) {
    const dispatch = useDispatch()
    const [imageError, setImageError] = React.useState(false);
  
    const handleImageError = () => {
      setImageError(true); 
    };
  
    return (
      <div className={styles.comment} key={comment.id}>
        <div className={styles.user}>
          {!imageError ? (
            <img
                className={styles.logo}
              src={comment.thumbnail}
              alt="User Avatar"
              onError={handleImageError}
            />
          ) : (
            <div className={styles.fallBackLogo}></div>
          )}
          <p>{comment.author}</p>
          <p>{shortenPostTime(comment.created_utc)}</p>
        </div>
        <div className={styles.commentMessage}>
            <p>{comment.body}</p>
        </div>
        <div className={styles.widgets}>
            <div>
                <button 
                    type="button" 
                    onClick={(e) => dispatch(incrementCommentVotes({postId: postId, commentId: comment.id}))}
                    className={comment.voteStatus === 1? styles.highlighted: ''}
                >&#8679;</button>
                <p>{shortenValue(comment.score)}</p>
                <button 
                    type="button" 
                    onClick={(e) => dispatch(decrementCommentVotes({postId: postId, commentId: comment.id}))}
                    className={comment.voteStatus === -1? styles.highlighted: ''}
                >&#8681;</button>
            </div>
            <div>
                <a href={comment.permalink} target="_blank" rel="noreferrer">
                    <button type="button">
                        <p>💬</p>
                        <p>View Replies</p>
                    </button>
                </a>
            </div>
        </div>
      </div>
    );
  }