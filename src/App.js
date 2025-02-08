import React from 'react';
import styles from './App.css'; 
import { Navbar } from './features/navbar/Navbar'
import { Posts } from './features/posts/posts';
import { Subreddit } from './features/subreddits/subreddits';

function App() {
	return (
		<main>
			<Navbar/>
			<section>
				<Posts/>
				<Subreddit/>
			</section>
		</main>
	);
}

export default App;
