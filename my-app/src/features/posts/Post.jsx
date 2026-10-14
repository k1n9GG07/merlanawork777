import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { 
  deletePost, 
  toggleComments, 
  addComment, 
  deleteComment, 
  updatePost 
} from './postsSlice';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import './Post.css';

const Post = ({ post }) => {
  const [commentText, setCommentText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editText, setEditText] = useState(post.text);
  const dispatch = useDispatch();

  const handleAddComment = () => {
    if (commentText.trim()) {
      dispatch(addComment({ postId: post.id, text: commentText }));
      setCommentText('');
    }
  };

  const handleOpenModal = () => {
    setEditText(post.text);
    setIsModalOpen(true);
  };

  const handleConfirmEdit = () => {
    if (editText.trim() && editText.trim() !== post.text) {
      dispatch(updatePost({ id: post.id, newText: editText.trim() }));
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="post-card">
        <p className="post-text">{post.text}</p>
        
        <div className="post-actions">
          <Button 
            variant="secondary" 
            onClick={() => dispatch(toggleComments(post.id))}
          >
            {post.showComments ? 'Скрыть' : 'Комментарии'}
          </Button>
          <span className="comment-count">
            Количество комментариев - {post.comments.length}
          </span>
          <Button variant="primary" onClick={handleOpenModal}>
            Изменить
          </Button>
          <Button 
            variant="danger" 
            onClick={() => dispatch(deletePost(post.id))}
          >
            Удалить
          </Button>
        </div>

        {post.showComments && (
          <div className="comments-section">
            <div className="add-comment-block">
              <Input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Новый комментарий ..."
                onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
              />
              <Button variant="primary" onClick={handleAddComment}>
                Добавить
              </Button>
            </div>

            <div className="comments-list">
              {post.comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <span className="comment-text">{comment.text}</span>
                  <Button 
                    variant="danger" 
                    onClick={() => dispatch(deleteComment({ 
                      postId: post.id, 
                      commentId: comment.id 
                    }))}
                  >
                    Удалить
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmEdit}
        text={editText}
        setText={setEditText}
      />
    </>
  );
};

export default Post;