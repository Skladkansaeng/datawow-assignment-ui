import Drawer from "@/components/drawer";
import { authState } from "@/states/auth-state";
import axiosInstance from "@/utils/axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function Header() {
  const [isAuth, setIsAuth] = useRecoilState(authState);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isPopOver, setIsPopOver] = useState(false);
  const [user, setUser] = useState<{ username: string; image: string } | null>(
    null
  );
  const route = useRouter();

  const fetchUser = async () => {
    const { data } = await axiosInstance.get("user");
    setUser(data);
  };
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuth(true);
      fetchUser();
    }
  }, [setIsAuth]);

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-[#243831] p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Image
            src="/a-board-logo.svg"
            alt="Aboard Logo"
            width={100}
            height={24}
          />
        </div>

        <button
          type="button"
          onClick={() => setIsOpenDrawer(true)}
          className="md:hidden hover:opacity-60 rounded-lg"
        >
          <Image
            src="/assets/nav-icon.svg"
            alt="Nav Icon"
            width={40}
            height={40}
          />
        </button>
        <div className="hidden  md:block ">
          <div>
            {isAuth ? (
              <>
                <button
                  className="flex gap-6 items-center"
                  onMouseEnter={() => setIsPopOver(true)}
                  onMouseLeave={() => setIsPopOver(false)}
                >
                  {isPopOver ? (
                    <>
                      <button
                        className="bg-[#49A569] inline-block  rounded-full p-1 ring-white h-[35px]"
                        onClick={() => {
                          localStorage.removeItem("authToken");
                          route.push("/login");
                        }}
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <h2 className="text-white">{user?.username}</h2>
                      <Image
                        src={user?.image || "/assets/avatar.svg"}
                        className=" inline-block  rounded-full ring-2 ring-white"
                        alt="Avatar Icon"
                        width={35}
                        height={35}
                      />
                    </>
                  )}
                </button>
              </>
            ) : (
              <Link href="/login">
                <button className="flex w-full justify-center rounded-md bg-[#49A569] px-6 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Sign in
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>
      <Drawer isOpen={isOpenDrawer} setIsOpen={setIsOpenDrawer} />
    </>
  );
}
