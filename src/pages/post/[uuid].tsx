import CommentCard from "@/components/comment-card";
import CommentPostModal from "@/components/modal-comment";
import PostCard from "@/components/post-card";
import MainLayout from "@/layouts/main";
import { authState } from "@/states/auth-state";
import axiosInstance from "@/utils/axios";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

PostDetail.getLayout = (page: React.ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

export default function PostDetail() {
  const router = useRouter();
  const { uuid } = router.query;
  const [post, setPost] = useState<any | null>(null);
  const [isCommentVisible, setIsCommentVisible] = useState(false);

  const [isAuth] = useRecoilState(authState);
  
  const fetchPostById = async () => {
    const { data } = await axiosInstance.get(`/post/${uuid}`);
    setPost(data);
  };

  useEffect(() => {
    if (router.isReady) {
      fetchPostById();
    }
  }, [router.isReady]);

  return (
    <div className="flex gap-5 flex-col">
      <div>
        <button
          className="rounded-full bg-[#D8E9E4] hover:opacity-80 p-2"
          onClick={() => {
            router.push("/homepage");
          }}
        >
          <ArrowLeftIcon className="size-4 fill-black" />
        </button>
      </div>
      <PostCard
        title={post?.title}
        createdAt={post?.createdAt}
        category={post?.category}
        content={post?.content}
        comments={post?.comments?.length}
        createdBy={post?.createdBy?.username}
        createdImg={post?.createdBy?.image}
        postId={post?.id}
        hideDelete={true}
      />
      <div>
        {isAuth && (
          <button
            className="outline outline-[#49A569] text-[#49A569] px-4 py-2.5 rounded-lg hover:bg-slate-50"
            onClick={() => {
              setIsCommentVisible(true);
            }}
          >
            Add Comment
          </button>
        )}
      </div>
      <div className="gap-4 flex flex-col">
        {post?.comments?.map((comment: any, idx: number) => (
          <CommentCard
            key={`comment_${idx}`}
            content={comment.text}
            createdAt={comment.createdAt}
            createdBy={comment.createdBy.username}
            createdImg={comment.createdBy.image}
          />
        ))}
      </div>
      <CommentPostModal
        isOpen={isCommentVisible}
        setIsOpen={setIsCommentVisible}
        onOk={async (value: { content: string }) => {
          try {
            await axiosInstance.post("/comment", {
              text: value.content,
              postId: Number(uuid)
            });
            fetchPostById();
            setIsCommentVisible(false);
          } catch (e: any) {
            alert("Comment Failed!\n");
          }
        }}
      />
    </div>
  );
}
