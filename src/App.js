import React from 'react';
import styles from './App.css'; 
import { Navbar } from './features/navbar/Navbar'
import { Posts } from './features/posts/Posts';
import { Subreddits } from './features/subreddits/Subreddits';

function App() {
	return (
		<main>
			<Navbar/>
			<section className={styles.section}>
				<Posts/>
				<Subreddits/>
			</section>
		</main>
	);
}

export default App;
