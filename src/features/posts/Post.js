import React from 'react';
import styles from './Post.module.css'

export function Post({votes=0, message='', numberOfComments=0, postTimeInSeconds=1}){
    const postData = {
        votes: shortenValue(votes),
        message: message,
        numberOfComments: shortenValue(numberOfComments),
        postTimeInSeconds: shortenPostTime(postTimeInSeconds)
    }

    function shortenValue(value){
        let newValue = value
        if(newValue > 999999999){
            newValue = String(newValue).slice(0, -9) + '.' + String(newValue).slice(-9)
            newValue = String(newValue).slice(0, -8) + 'b'
        } else if(newValue > 999999){
            newValue = String(newValue).slice(0, -6) + '.' + String(newValue).slice(-6)
            newValue = String(newValue).slice(0, -5) + 'm'
        } else if(newValue > 999){
            newValue = String(newValue).slice(0, -3) + '.' + String(newValue).slice(-3)
            newValue = newValue.slice(0, -2) + 'k'
        }
        return String(newValue);
    }

    function shortenPostTime(seconds){
        function formatWithCommas(number) {
            return number.toLocaleString();
          }
        
          if (seconds < 60) {
            return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
          } else if (seconds < 3600) {
            const minutes = Math.floor(seconds / 60);
            return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
          } else if (seconds < 86400) {
            const hours = Math.floor(seconds / 3600);
            return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
          } else if (seconds < 604800) {
            const days = Math.floor(seconds / 86400);
            return `${days} day${days !== 1 ? 's' : ''} ago`;
          } else if (seconds < 2419200) {
            const weeks = Math.floor(seconds / 604800);
            return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
          } else if (seconds < 29030400) {
            const months = Math.floor(seconds / 2419200);
            return `${months} month${months !== 1 ? 's' : ''} ago`;
          } else {
            const years = Math.floor(seconds / 29030400);
            return `${formatWithCommas(years)} year${years !== 1 ? 's' : ''} ago`;
          }
    }

    return (
        <div className={styles.post}>
            <div className={styles.votes}>
                <button type="button">&#8679;</button>
                <h2>{postData.votes}</h2>
                <button type="button">&#8681;</button>
            </div>
            <div className={styles.postinfo}>
                <div className={styles.message}>
                    <div>
                        <p>{postData.message}</p>
                        <img src="" alt="" width={styles.imagecontainer}></img>
                    </div>
                </div>
                <div className={styles.extra}>
                    <div className={styles.comments}>
                        <button type="button">
                            <p>💬</p>
                            <p>{postData.numberOfComments}</p>
                        </button>
                    </div>
                    <div className={styles.posttime}>
                        <p>{postData.postTimeInSeconds}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}