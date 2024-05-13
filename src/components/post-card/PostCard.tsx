import { timeAgo } from "@/utils/timeago";
import Image from "next/image";
import BinIcon from "@/assets/bin-icon.svg";
import PenIcon from "@/assets/pen-icon.svg";
import { useRecoilState } from "recoil";
import { menuSelectState } from "@/states/menu-state";
import { useRouter } from "next/router";

const PostCard = ({
  maxLine,
  title,
  createdAt,
  category,
  content,
  comments,
  createdBy,
  createdImg,
  onDelete,
  onEdit,
  postId,
  hideDelete
}: {
  maxLine?: number;
  postId: number;
  title: string;
  createdAt: string;
  category: string;
  content: string;
  comments: number;
  createdBy: string;
  createdImg: string;
  onDelete?: (e: any) => void;
  onEdit?: (e: any) => void;
  hideDelete?: boolean;
}) => {
  const [menu] = useRecoilState(menuSelectState);
  const router = useRouter();

  return (
    <div
      className="flex flex-col gap-2 cursor-pointer"
      onClick={() => {
        router.push(`/post/${postId}`);
      }}
    >
      <div className="flex gap-2 items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={createdImg || "/assets/avatar.svg"}
            className=" inline-block  rounded-full ring-2 ring-white border"
            alt="Avatar Icon"
            width={35}
            height={35}
          />
          <div className="flex items-baseline gap-2">
            <div className="text-[14px] text-[#191919] font-medium">
              {createdBy}
            </div>
            <div className="text-[12px] text-[#939494]">
              {timeAgo(createdAt)}
            </div>
          </div>
        </div>
        {!hideDelete && menu === "blog" && (
          <div className="flex gap-2 z-100">
            <button onClick={onEdit} className="z-100">
              <PenIcon />
            </button>

            <button onClick={onDelete} className="z-100">
              <BinIcon />
            </button>
          </div>
        )}
      </div>
      <div className="flex">
        <div className="py-2 px-4 bg-[#F3F3F3] rounded-full">{category}</div>
      </div>
      <div>
        <h2 className="font-medium text-base">{title}</h2>
        <p className={`line-clamp-${maxLine ?? 0}`}>{content}</p>
      </div>
      <div className="flex gap-2">
        <Image src={"/assets/message-icon.svg"} alt="" width={16} height={16} />
        <h2 className="text-gray-300">{comments} Comments</h2>
      </div>
    </div>
  );
};
export default PostCard;
