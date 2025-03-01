import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk('search/fetchPosts', async (query) => {
	const searchReddit = async (query) => {
		const response = await fetch(`https://www.reddit.com/search.json?q=${query}`);
		const data = await response.json();
	  
		return data.data.children.map((post) => {
		  const postData = post.data;
		  
		  const highQualityThumbnail = postData.preview?.images?.[0]?.source?.url.replace("&amp;", "&") || postData.thumbnail;
	  
		  return {
			id: postData.id,
			title: postData.title,
			permalink: `https://www.reddit.com${postData.permalink}`,
			url: postData.url,
			subreddit: postData.subreddit,
			author: postData.author,
			created_utc: postData.created_utc,
			num_comments: postData.num_comments,
			score: postData.score,
			thumbnail: highQualityThumbnail !== "self" && highQualityThumbnail !== "default" ? highQualityThumbnail : null,
			voteStatus: 0,
			comments: []
		  };
		});
	  };
	return await searchReddit(query)
})

export const fetchComments = createAsyncThunk(
	'search/fetchComments',
	async (permalink, { getState, rejectWithValue }) => {
	  try {
		// Get the current state
		const state = getState();
  
		// Find the post that matches the permalink
		console.log(permalink);
		const post = state.search.posts.find(post => post.permalink === permalink);
  
		if (!post) {
		  throw new Error("Post not found for this permalink.");
		}
  
		// Fetch comments
		const response = await fetch(`${permalink}.json`);
		const data = await response.json();
  
		// Function to fetch user avatar URL
		const fetchUserAvatar = async (username) => {
		  try {
			const userResponse = await fetch(`https://www.reddit.com/user/${username}/about.json`);
			const userData = await userResponse.json();
			return userData.data.icon_img || 'default-avatar-url'; // Replace with a default avatar URL if not available
		  } catch (error) {
			console.error("Error fetching user avatar:", error);
			return 'default-avatar-url'; // Replace with a default avatar URL
		  }
		};
  
		// Extract and map necessary data from comments
		const comments = await Promise.all(data[1].data.children.map(async (comment) => {
		  const commentData = comment.data;
		  const avatar = await fetchUserAvatar(commentData.author);
		  return {
			id: commentData.id,
			author: commentData.author,
			body: commentData.body,
			created_utc: commentData.created_utc,
			score: commentData.score,
			num_comments: commentData.num_comments,  // If you want to include number of replies
			thumbnail: avatar,  // Add the thumbnail URL
			permalink: permalink,
			voteStatus: 0,
			visibleComments: false
		  };
		}));
  
		// Return post ID with mapped comments
		return { id: post.id, comments };
	  } catch (error) {
		console.error("Error fetching comments:", error);
		return rejectWithValue(error.message);
	  }
	}
  );
const initialState = {
	value:'',
	loading:false,
	posts:[],
	error: null,
	loadingComment: false,
	errorComment: false
}

export const searchSlice = createSlice({
	name: 'search',
	initialState:initialState,
	reducers:{
		setSearchValue: (state, action) => {
			state.value = action.payload
		},
		incrementUpvotes: (state, action) => {
			const postId = action.payload.id
			const currentPost = state.posts.find(obj => obj.id === postId)
            const voteStatus = currentPost.voteStatus
            if (voteStatus === -1){
                currentPost.score += 1
                currentPost.voteStatus = 0
            } else if (voteStatus === 0){
                currentPost.score += 1
                currentPost.voteStatus = 1
            } else if (voteStatus === 1){
                currentPost.score -= 1
                currentPost.voteStatus = 0
            }
		},
        decrementUpvotes: (state, action) => {
			const postId = action.payload.id
			const currentPost = state.posts.find(obj => obj.id === postId)
            const voteStatus = currentPost.voteStatus
            if (voteStatus === -1){
				currentPost.score += 1
                currentPost.voteStatus = 0
            } else if (voteStatus === 0){
                currentPost.score -= 1
                currentPost.voteStatus = -1
            } else if (voteStatus === 1){
                currentPost.score -= 1
                currentPost.voteStatus = 0
            }
		},
		incrementCommentVotes: (state, action) => {
			const { postId, commentId} = action.payload
			const currentComment = state.posts.find(obj => obj.id === postId).comments.find(obj => obj.id === commentId)
			const voteStatus = currentComment.voteStatus
            if (voteStatus === -1){
                currentComment.score += 1
                currentComment.voteStatus = 0
            } else if (voteStatus === 0){
                currentComment.score += 1
                currentComment.voteStatus = 1
            } else if (voteStatus === 1){
                currentComment.score -= 1
                currentComment.voteStatus = 0
            }
		},
		decrementCommentVotes: (state, action) => {
			const { postId, commentId} = action.payload
			const currentComment = state.posts.find(obj => obj.id === postId).comments.find(obj => obj.id === commentId)
			const voteStatus = currentComment.voteStatus
            if (voteStatus === -1){
				currentComment.score += 1
                currentComment.voteStatus = 0
            } else if (voteStatus === 0){
                currentComment.score -= 1
                currentComment.voteStatus = -1
            } else if (voteStatus === 1){
                currentComment.score -= 1
                currentComment.voteStatus = 0
            }
		},
		toggleState: (state, action) => {
			let id = action.payload
			const currentPost = state.posts.find(obj => obj.id === id)
            currentPost.visible = !currentPost.visible
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPosts.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.loading = false;
				state.posts = action.payload
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message
			})
			.addCase(fetchComments.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchComments.fulfilled, (state, action) => {
				const { id, comments } = action.payload
				const currentPost = state.posts.find(obj => obj.id === id)
				currentPost.comments = comments
			})
			.addCase(fetchComments.rejected, (state, action) => {
				state.loading = false;
			})
	}
})

export const { 
	setSearchValue, 
	incrementUpvotes, 
	decrementUpvotes, 
	incrementCommentVotes, 
	decrementCommentVotes,
	toggleState 
} = searchSlice.actions
export const selectSearchValue = (state) => state.search.value;

export const selectPosts = (state) => state.search.posts;
export const selectVoteStatus = (id) => (state) => state.search.posts.find(obj => obj.id === id).voteStatus || 0;
export const { comments, loadingComment, errorComment} = (state) => state.search	

export default searchSlice.reducer