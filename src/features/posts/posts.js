import React from "react";
import styles from './Posts.module.css'
import { Post } from "./Post";

export function Posts(){
    return (
        <div className={styles.posts_section}>
            <Post 
                votes={54634} 
                message="What are your thoughts on saving the economy?"
                numberOfComments={1262}
                postTimeInSeconds={114782743}
            />
        </div>
    )
}