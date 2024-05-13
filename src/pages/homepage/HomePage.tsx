import Dropdown from "@/components/dropdown";
import ConfirmModal from "@/components/modal-confirm";
import CreatePostModal from "@/components/modal-create";
import UpdatePostModal from "@/components/modal-update/UpdatePostModal";
import PostCard from "@/components/post-card";
import MainLayout from "@/layouts/main/MainLayout";
import { authState } from "@/states/auth-state";
import { menuSelectState } from "@/states/menu-state";
import axiosInstance from "@/utils/axios";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

HomePage.getLayout = (page: React.ReactElement) => (
  <MainLayout>{page}</MainLayout>
);
export default function HomePage() {
  const [dropdownValue, setDropdownValue] = useState("");
  const [isCreatePostVisible, setIsCreatePostVisible] = useState(false);
  const [isEditPostVisible, setIsEditPostVisible] = useState(false);
  const [isDeletePostVisible, setIsDeletePostVisible] = useState(false);
  const [posts, setPosts] = useState<any>([]);
  const [menu] = useRecoilState(menuSelectState);
  const [postSelect, setPostSelect] = useState<any | null>(null);
  const [isAuth] = useRecoilState(authState);
  const route = useRouter();

  const fetchPost = async () => {
    const { data } = await axiosInstance.get(
      menu === "home" ? "/post" : "/post/me"
    );
    setPosts(data);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token && menu === "blog") {
      route.replace("/login");
    } else {
      fetchPost();
    }
  }, [menu]);

  const onDelete = async (id?: number) => {
    await axiosInstance.delete(`/post/${id}`);
    fetchPost();
  };
  return (
    <>
      <Head>
        <title>Homepage</title>
      </Head>
      <div className="w-full gap-2 ">
        <div className="flex gap-2">
          <div className="relative rounded-md shadow-sm w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {/* <span className="text-gray-500 sm:text-sm">$</span> */}
              <Image
                src="/assets/search-icon.svg"
                alt="search icon"
                width={20}
                height={20}
              />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              className="bg-transparent block w-full rounded-md border-0 py-1.5 pl-10 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
              placeholder="Search"
            />
          </div>
          <Dropdown
            onChange={(e: string) => {
              setDropdownValue(e);
            }}
            label="Community"
            options={[
              { label: "History", value: "history" },
              { label: "Food", value: "food" },
              { label: "Pets", value: "pets" },
              { label: "Health", value: "health" },
              { label: "Fashion", value: "fashion" },
              { label: "Exercise", value: "exercise" },
              { label: "Others", value: "others" }
            ]}
            value={dropdownValue}
          />
          <button
            className="flex w-40 justify-center rounded-md bg-[#49A569] py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => {
              if (!isAuth) {
                route.replace("/login");
              } else {
                setIsCreatePostVisible(true);
                setPostSelect(null);
              }
            }}
          >
            Create +
          </button>
        </div>
        <div className="flex mt-2 flex-col  rounded-lg bg-white divide-y">
          {posts.map((post: any, idx: number) => (
            <div
              key={`post_${idx}`}
              className="hover:bg-slate-50 hover:rounded-lg p-4"
            >
              <PostCard
                maxLine={2}
                title={post?.title}
                createdAt={post?.createdAt}
                category={post?.category}
                content={post?.content}
                comments={post?.comments?.length}
                createdBy={post?.createdBy?.username}
                createdImg={post?.createdBy?.image}
                onDelete={(e) => {
                  e.stopPropagation();
                  setPostSelect(post);
                  setIsDeletePostVisible(true);
                }}
                onEdit={(e) => {
                  e.stopPropagation();
                  setPostSelect(post);
                  setIsEditPostVisible(true);
                }}
                postId={post?.id}
              />
            </div>
          ))}
        </div>
      </div>
      <UpdatePostModal
        isOpen={isEditPostVisible}
        setIsOpen={setIsEditPostVisible}
        value={postSelect}
        onOk={async (value: {
          category: string;
          title: string;
          content: string;
        }) => {
          try {
            await axiosInstance.patch("/post/" + postSelect.id, value);
            fetchPost();
            setIsEditPostVisible(false);
          } catch (e: any) {
            alert("Edit Failed!\n" + e?.message?.join("\n"));
          }
        }}
      />
      <CreatePostModal
        isOpen={isCreatePostVisible}
        setIsOpen={setIsCreatePostVisible}
        onOk={async (value: {
          category: string;
          title: string;
          content: string;
        }) => {
          try {
            await axiosInstance.post("/post", value);
            fetchPost();
            setIsCreatePostVisible(false);
          } catch (e: any) {
            alert("Create Failed!\n" + e?.message?.join("\n"));
          }
        }}
      />
      <ConfirmModal
        isOpen={isDeletePostVisible}
        setIsOpen={setIsDeletePostVisible}
        onOk={async () => {
          onDelete(postSelect?.id);
          setIsDeletePostVisible(false);
        }}
      />
    </>
  );
}
