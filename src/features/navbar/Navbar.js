import React from 'react';
import { FaSearch } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux';
import styles from './Navbar.module.css';
import { setSearchValue, selectSearchValue, fetchPosts } from './NavbarSlice';

export function Navbar() {
	const dispatch = useDispatch();
	const searchValue = useSelector(selectSearchValue)

	const handleSearch = () => {
		dispatch(fetchPosts(searchValue))
	}

	return (
		<header className={styles.header}>
			<h1 className={styles.h1}>Tiny<span>Reddit</span></h1>
			<div className={styles.searchbardiv}>
				<div className={styles.searchbar}>
					<form autoComplete="off">
						<input 
							type="text"
							placeholder="Search"
							value={searchValue}
							onChange={(e) => dispatch(setSearchValue(e.target.value))}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									e.preventDefault()
									handleSearch();
								}
							}}
							autoComplete="off"  // Ensure it's here
							autoCorrect="off"
							spellCheck="false"
							name="search"
							id="search"
						/>
					</form>
					<div className={styles.searchicon} onClick={handleSearch}>
						<FaSearch size={24}/>
					</div>
				</div>
			</div>
		</header>
	);
}
