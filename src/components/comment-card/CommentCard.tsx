import { timeAgo } from "@/utils/timeago";
import Image from "next/image";

const CommentCard = ({
  content,
  createdAt,
  createdBy,
  createdImg
}: {
  content: string;
  createdAt: string;
  createdBy: string;
  createdImg: string;
}) => {
  return (
    <div className="flex flex-col  gap-2">
      <div className="flex gap-2 items-center">
        <Image
          src={createdImg || "/assets/avatar.svg"}
          className=" inline-block  rounded-full ring-2 ring-white"
          alt="Avatar Icon"
          width={35}
          height={35}
        />
        <div className="flex items-baseline gap-2">
          <div className="text-[14px] text-[#191919] font-medium">
            {createdBy}
          </div>
          <div className="text-[12px] text-[#939494]">{timeAgo(createdAt)}</div>
        </div>
      </div>
      <div>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default CommentCard;
