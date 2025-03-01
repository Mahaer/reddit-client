import React from 'react';
import styles from './App.css'; 
import { Navbar } from './features/navbar/Navbar'
import { Posts } from './features/navbar/Posts';

function App() {
	return (
		<main>
			<Navbar/>
			<section className={styles.section}>
				<Posts/>
			</section>
		</main>
	);
}

export default App;
