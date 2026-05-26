'use client';

import { useEffect, useState, FormEvent } from 'react';

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
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-[rgba(var(--primary-main-rgb),0.1)] bg-[rgba(var(--primary-main-rgb),0.4)] p-6 dark:border-white/20 dark:bg-white/10">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <span className="font-semibold text-primary-dark dark:text-white">{comment.username}</span>
            {comment.username === 'hannahwilloughby' && (
              <span className="mx-2 rounded-lg border border-warning-main px-2 py-0.5 text-warning-main">
                Author
              </span>
            )}
          </div>
          <span className="text-[0.9em] text-gray-custom">{formatDate(comment.timestamp)}</span>
        </div>
        <div className="mb-4 leading-normal text-gray-dark-custom dark:text-white/90">{comment.body}</div>
        <button
          className="cursor-pointer rounded-lg border-none bg-primary-main px-4 py-2 text-[0.9em] text-white transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-primary-dark"
          onClick={() => {
            setShowReplyForm(!showReplyForm);
          }}
        >
          Reply
        </button>
        {showReplyForm && (
          <form
            className="mt-4 rounded-xl bg-[rgba(var(--primary-main-rgb),0.4)] p-6 dark:bg-white/10"
            onSubmit={(e) => handleReplySubmit(e, comment.id)}
          >
            <div className="mb-4">
              <label htmlFor={`username-${comment.id}`} className="mb-2 block font-medium text-primary-dark dark:text-white">
                Name
              </label>
              <input
                type="text"
                id={`username-${comment.id}`}
                name="username"
                required
                placeholder="Your name"
                className="w-full rounded-lg border-2 border-[rgba(var(--primary-main-rgb),0.2)] bg-white px-3 py-3 text-base transition-[border-color] duration-300 focus:border-primary-main focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label htmlFor={`comment-${comment.id}`} className="mb-2 block font-medium text-primary-dark dark:text-white">
                Reply
              </label>
              <textarea
                id={`comment-${comment.id}`}
                name="comment"
                required
                rows={3}
                placeholder="Write your reply..."
                className="w-full rounded-lg border-2 border-[rgba(var(--primary-main-rgb),0.2)] bg-white px-3 py-3 text-base transition-[border-color] duration-300 focus:border-primary-main focus:outline-none"
              />
            </div>
            <div className="absolute -left-[9999px] hidden">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </div>
            <div className="flex gap-4 max-[640px]:flex-col max-[640px]:[&_button]:w-full">
              <button
                type="submit"
                className="cursor-pointer rounded-lg border-none bg-primary-main px-6 py-3 text-base text-white transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-primary-dark"
              >
                Post Reply
              </button>
              <button
                type="button"
                className="cursor-pointer rounded-lg border-2 border-primary-main bg-transparent px-6 py-3 text-base text-primary-main transition-all duration-200 hover:bg-primary-main hover:text-white"
                onClick={() => setShowReplyForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
        {comment.children && comment.children.length > 0 && (
          <div className="mt-4 ml-8 flex flex-col gap-4 max-[640px]:ml-4">
            {comment.children.map((reply) => (
              <div key={reply.id} className="rounded-xl border border-[rgba(var(--primary-main-rgb),0.1)] bg-[rgba(var(--primary-main-rgb),0.4)] p-6 dark:border-white/20 dark:bg-white/10">
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-primary-dark dark:text-white">{reply.username}</span>
                    {reply.username === 'hannahwilloughby' && (
                      <span className="mx-2 rounded-lg border border-warning-main px-2 py-0.5 text-warning-main">
                        Author
                      </span>
                    )}
                  </div>
                  <span className="text-[0.9em] text-gray-custom">{formatDate(reply.timestamp)}</span>
                </div>
                <div className="leading-normal text-gray-dark-custom dark:text-white/90">{reply.body}</div>
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
    <section className="mx-auto mt-16 max-w-[800px] border-t border-primary-dark pt-8">
      <h2 className="text-primary-dark dark:text-white">Comments</h2>
      <div className="flex flex-col gap-8">
        {loading ? (
          <div className="text-center text-primary-main italic">Loading comments...</div>
        ) : commentTree.length > 0 ? (
          commentTree.map((comment) => (
            <CommentItem key={comment.id} comment={comment} postSlug={postSlug} onReply={fetchComments} />
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
      <form
        className="my-8 rounded-xl bg-[rgba(var(--primary-main-rgb),0.4)] p-8 dark:bg-white/10 max-[640px]:p-6"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label htmlFor="username" className="mb-2 block font-medium text-primary-dark dark:text-white">
            Name
          </label>
          <input
            type="text"
            id="username"
            name="username"
            required
            placeholder="Your name"
            className="w-full rounded-lg border-2 border-[rgba(var(--primary-main-rgb),0.2)] bg-white px-3 py-3 text-base transition-[border-color] duration-300 focus:border-primary-main focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="comment" className="mb-2 block font-medium text-primary-dark dark:text-white">
            Comment
          </label>
          <textarea
            id="comment"
            name="comment"
            required
            rows={4}
            placeholder="Share your thoughts..."
            className="w-full rounded-lg border-2 border-[rgba(var(--primary-main-rgb),0.2)] bg-white px-3 py-3 text-base transition-[border-color] duration-300 focus:border-primary-main focus:outline-none"
          />
        </div>
        <div className="absolute -left-[9999px] hidden">
          <label htmlFor="website">Website</label>
          <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <button
          type="submit"
          className="cursor-pointer rounded-lg border-none bg-primary-main px-6 py-3 text-base text-white transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-primary-dark"
        >
          Post Comment
        </button>
      </form>
    </section>
  );
}
