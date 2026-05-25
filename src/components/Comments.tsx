'use client';

import { useEffect, useState, FormEvent } from 'react';
import styles from './Comments.module.css';

const API_BASE = '/api';

interface Comment {
  id: string;
  timestamp: string;
  body: string;
  username: string;
  parent_id?: string;
  children?: Comment[];
}

interface CommentsProps {
  postSlug: string;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function buildCommentTree(comments: Comment[]): Comment[] {
  const commentMap = new Map<string, Comment>();
  const roots: Comment[] = [];

  comments.forEach((comment) => {
    commentMap.set(comment.id, { ...comment, children: [] });
  });

  comments.forEach((comment) => {
    const node = commentMap.get(comment.id)!;
    if (comment.parent_id) {
      const parent = commentMap.get(comment.parent_id);
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(node);
      }
    } else {
      roots.push(node);
    }
  });

  return roots;
}

function CommentItem({
  comment,
  postSlug,
  onReply,
}: {
  comment: Comment;
  postSlug: string;
  onReply: () => void;
}) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  async function handleReplySubmit(e: FormEvent<HTMLFormElement>, parentId: string) {
    e.preventDefault();
    const form = e.currentTarget;
    const username = (form.elements.namedItem('username') as HTMLInputElement).value;
    const body = (form.elements.namedItem('comment') as HTMLTextAreaElement).value;
    const honeypot = (form.elements.namedItem('website') as HTMLInputElement)?.value;

    if (honeypot) return;

    try {
      const response = await fetch(`${API_BASE}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          article_slug: postSlug,
          comment_body: body,
          parent_comment_id: parentId,
          username,
        }),
      });
      if (!response.ok) throw new Error('Failed to post comment');
      setShowReplyForm(false);
      onReply();
      form.reset();
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('Failed to post comment. Please try again.');
    }
  }

  return (
    <div className={styles.commentThread}>
      <div className={styles.comment}>
        <div className={styles.commentHeader}>
          <div>
            <span className={styles.commentAuthor}>{comment.username}</span>
            {comment.username === 'hannahwilloughby' && (
              <span className={styles.commentAuthorBadge}>Author</span>
            )}
          </div>
          <span className={styles.commentDate}>{formatDate(comment.timestamp)}</span>
        </div>
        <div className={styles.commentContent}>{comment.body}</div>
        <button
          className={styles.replyButton}
          onClick={() => {
            setShowReplyForm(!showReplyForm);
          }}
        >
          Reply
        </button>
        {showReplyForm && (
          <form
            className={styles.replyForm}
            onSubmit={(e) => handleReplySubmit(e, comment.id)}
          >
            <div className={styles.formGroup}>
              <label htmlFor={`username-${comment.id}`}>Name</label>
              <input type="text" id={`username-${comment.id}`} name="username" required placeholder="Your name" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor={`comment-${comment.id}`}>Reply</label>
              <textarea id={`comment-${comment.id}`} name="comment" required rows={3} placeholder="Write your reply..." />
            </div>
            <div className={styles.honeypotField}>
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </div>
            <div className={styles.formActions}>
              <button type="submit" className={styles.submitButton}>Post Reply</button>
              <button type="button" className={styles.cancelReply} onClick={() => setShowReplyForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        )}
        {comment.children && comment.children.length > 0 && (
          <div className={styles.nestedComments}>
            {comment.children.map((reply) => (
              <div key={reply.id} className={styles.comment}>
                <div className={styles.commentHeader}>
                  <div>
                    <span className={styles.commentAuthor}>{reply.username}</span>
                    {reply.username === 'hannahwilloughby' && (
                      <span className={styles.commentAuthorBadge}>Author</span>
                    )}
                  </div>
                  <span className={styles.commentDate}>{formatDate(reply.timestamp)}</span>
                </div>
                <div className={styles.commentContent}>{reply.body}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Comments({ postSlug }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchComments() {
    try {
      const response = await fetch(`${API_BASE}/articles/${postSlug}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments || []);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchComments();
  }, [postSlug]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const username = (form.elements.namedItem('username') as HTMLInputElement).value;
    const body = (form.elements.namedItem('comment') as HTMLTextAreaElement).value;
    const honeypot = (form.elements.namedItem('website') as HTMLInputElement)?.value;

    if (honeypot) return;

    try {
      const response = await fetch(`${API_BASE}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          article_slug: postSlug,
          comment_body: body,
          username,
        }),
      });
      if (!response.ok) throw new Error('Failed to post comment');
      fetchComments();
      form.reset();
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('Failed to post comment. Please try again.');
    }
  }

  const commentTree = buildCommentTree(comments);

  return (
    <section className={styles.commentsSection}>
      <h2>Comments</h2>
      <div className={styles.commentsList}>
        {loading ? (
          <div className={styles.loading}>Loading comments...</div>
        ) : commentTree.length > 0 ? (
          commentTree.map((comment) => (
            <CommentItem key={comment.id} comment={comment} postSlug={postSlug} onReply={fetchComments} />
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
      <form className={styles.commentForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Name</label>
          <input type="text" id="username" name="username" required placeholder="Your name" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="comment">Comment</label>
          <textarea id="comment" name="comment" required rows={4} placeholder="Share your thoughts..." />
        </div>
        <div className={styles.honeypotField}>
          <label htmlFor="website">Website</label>
          <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <button type="submit" className={styles.submitButton}>Post Comment</button>
      </form>
    </section>
  );
}
