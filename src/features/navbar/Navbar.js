import React from 'react';
import { FaSearch } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux';
import styles from './Navbar.module.css';
import { setSearchValue, selectSearchValue } from './NavbarSlice';

export function Navbar() {
	const dispatch = useDispatch();
	const searchValue = useSelector(selectSearchValue)

	return (
		<header className={styles.header}>
			<h1 className={styles.h1}>Tiny<span>Reddit</span></h1>
			<div className={styles.searchbardiv}>
				<div className={styles.searchbar}>
					<input 
						type='text'
						placeholder='Search'
						value={searchValue}
						onChange={(e) => dispatch(setSearchValue(e.target.value))}
					/>
					<div className={styles.searchicon}>
						<FaSearch size={24}/>
					</div>
				</div>
			</div>
		</header>
	);
}
