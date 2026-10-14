import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [
    {
      id: 1,
      text: "Сегодня было замечательное предложение пойти поужинать этим вечером. Главное, чтобы погода была преимущественно теплой.",
      comments: [
        { id: 101, text: "Первый комментарий о выше сказанном посте ..." },
        { id: 102, text: "Второй комментарий о выше сказанном посте ..." }
      ],
      showComments: false,
    }
  ],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push({
        id: Date.now(),
        text: action.payload,
        comments: [],
        showComments: false,
      });
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
    updatePost: (state, action) => {
      const { id, newText } = action.payload;
      const existingPost = state.posts.find(post => post.id === id);
      if (existingPost) {
        existingPost.text = newText;
      }
    },
    toggleComments: (state, action) => {
      const post = state.posts.find(post => post.id === action.payload);
      if (post) {
        post.showComments = !post.showComments;
      }
    },
    addComment: (state, action) => {
      const { postId, text } = action.payload;
      const post = state.posts.find(post => post.id === postId);
      if (post) {
        post.comments.push({ id: Date.now(), text });
      }
    },
    deleteComment: (state, action) => {
      const { postId, commentId } = action.payload;
      const post = state.posts.find(post => post.id === postId);
      if (post) {
        post.comments = post.comments.filter(c => c.id !== commentId);
      }
    }
  },
});

export const { 
  addPost, 
  deletePost, 
  updatePost, 
  toggleComments, 
  addComment, 
  deleteComment 
} = postsSlice.actions;

export default postsSlice.reducer;