import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPost } from './features/posts/postsSlice';
import Button from './components/Button';
import Input from './components/Input';
import Post from './features/posts/Post';
import './App.css';

function App() {
  const [newPostText, setNewPostText] = useState('');
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  const handleAddPost = () => {
    if (newPostText.trim()) {
      dispatch(addPost(newPostText.trim()));
      setNewPostText('');
    }
  };

  return (
    <div className="app-container">
      <div className="create-post-block">
        <Input
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
          placeholder="Новый пост ..."
          onKeyDown={(e) => e.key === 'Enter' && handleAddPost()}
        />
        <Button onClick={handleAddPost} variant="primary">
          Добавить
        </Button>
      </div>

      <div className="posts-list">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default App;