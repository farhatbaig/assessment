import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPosts,
  fetchFilteredPosts,
  deletePost,
  updatePost,
  addPost,
} from "../features/PostSlice";
import { RootState, AppDispatch } from "../store";
import DataTable from "../components/DataTable";
import { PAGINATION, TABLE_COLUMNS } from "../constants";
import { Post } from "../types";

const PostList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, total, status } = useSelector((state: RootState) => state.posts);

  const [limit, setLimit] = useState<number>(PAGINATION.DEFAULT_LIMIT);
  const [currentPage, setCurrentPage] = useState<number>(PAGINATION.DEFAULT_PAGE);

  const [newPost, setNewPost] = useState<Post>({
    id: 0,
    title: "",
    body: "",
    userId: 1,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch, limit, currentPage]);

  const fetchFilteredData = ({ key, value }: { key: string; value: string }) => {
    dispatch(fetchFilteredPosts({ key, value }));
    setCurrentPage(1);
  };

  const handleAddPost = () => {
    const trimmedTitle = newPost.title.trim();
    const trimmedBody = newPost.body.trim();

    if (!trimmedTitle) {
      setError("Title is required.");
      return;
    }
    if (!trimmedBody) {
      setError("Body is required.");
      return;
    }

    setError("");
    dispatch(addPost(newPost));
    setNewPost({ ...newPost, title: "", body: "" });
  };

  const handleDeletePost = (id: number) => {
    dispatch(deletePost(id));
  };

  const handleUpdatePost = (updatedPost: Partial<Post>) => {
    if (!updatedPost.id) return;
    dispatch(
      updatePost({
        id: updatedPost.id,
        postData: {
          id: updatedPost.id,
          title: updatedPost.title ?? "",
          body: updatedPost.body ?? "",
          userId: updatedPost.userId ?? 1,
        },
      })
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-3 mt-5">Posts</h1>

      <div className="mb-4 flex flex-row gap-2">

        <div>
          
          <input
            type="text"
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className="border p-2 mr-2 custom-input"
          />

        </div>
        <div>
          <input
            type="text"
            placeholder="Body"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
            className="border p-2 mr-2 custom-input"

          />
        </div>

        <button
          onClick={handleAddPost}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Add Post
        </button>
      </div>
      {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}

      <DataTable
        data={posts}
        columns={TABLE_COLUMNS.POST}
        status={status}
        total={total}
        limit={limit}
        currentPage={currentPage}
        setLimit={setLimit}
        setCurrentPage={setCurrentPage}
        fetchFilteredData={fetchFilteredData}
        onDelete={handleDeletePost}
        onUpdate={handleUpdatePost}
      />
    </div>
  );
};

export default PostList;
