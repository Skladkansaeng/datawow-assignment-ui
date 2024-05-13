import { useRouter } from "next/router";
import Header from "./Header";
import "./main.css";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { menuSelectState } from "@/states/menu-state";

const MainLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { pathname } = useRouter();
  const [menu, setMenu] = useRecoilState(menuSelectState);
  const router = useRouter();

  return (
    <>
      <Header />
      <div
        className={`grid grid-cols-7 gap-2 h-[calc(100vh-88px)] md:h-[calc(100vh-84px)] ${
          pathname === "/post/[uuid]" && "bg-white"
        }`}
      >
        <div
          className={`hidden md:flex col-span-1 flex-col gap-2 p-6  ${
            pathname === "/post/[uuid]" && "bg-[#BBC2C0]"
          }`}
        >
          <button
            className={`hover:opacity-50 text-left items-center flex gap-2 h-10 ${
              menu == "home" && "font-bold"
            }`}
            onClick={() => {
              setMenu("home");
              router.push("/homepage");
            }}
          >
            <Image
              src="/assets/homepage-icon.svg"
              className="inline-block"
              alt="Avatar Icon"
              width={25}
              height={25}
            />
            Home
          </button>
          <button
            className={`hover:opacity-50 text-left items-center flex gap-2 h-10 ${
              menu == "blog" && "font-bold"
            }`}
            onClick={() => {
              setMenu("blog");
              router.push("/homepage");
            }}
          >
            <Image
              src="/assets/blog-icon.svg"
              className="inline-block"
              alt="Avatar Icon"
              width={25}
              height={25}
            />
            Our Blog
          </button>
        </div>
        <div className={`col-span-7 md:col-span-5  p-6 overflow-scroll `}>
          {children}
        </div>
      </div>
    </>
    // <html lang="en">
    //   <body className={inter.className}>
    // {children}
    //   </body>
    // </html>
  );
};

export default MainLayout;
