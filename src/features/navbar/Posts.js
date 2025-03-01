import React from "react";
import { useSelector } from "react-redux";
import styles from './Posts.module.css'
import { selectPosts } from "./NavbarSlice";
import { Post } from "./Post";

export function Posts(){

    const posts = useSelector(selectPosts)

    return (
        <div className={styles.posts_section}>
            {Object.values(posts).map(post => (
                <Post
                    key={post.id}
                    id={post.id}
                    votes={post.score}
                    message={post.title}
                    numberOfComments={post.num_comments}
                    postTimeInSeconds={post.created_utc}
                    author={post.author}
                    thumbnail={post.thumbnail}
                    permalink={post.permalink}
                    comments={post.comments}
                    visible={post.visible}
                />
            ))}
        </div>
    )
}