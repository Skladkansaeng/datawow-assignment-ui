import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild
} from "@headlessui/react";
import HomepageIcon from "@/assets/homepage-icon.svg";
import BlogIcon from "@/assets/blog-icon.svg";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { menuSelectState } from "@/states/menu-state";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";

export default function Drawer({
  isOpen,
  setIsOpen
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) {
  const [_, setMenu] = useRecoilState(menuSelectState);
  const router = useRouter();

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog className="relative z-10" onClose={setIsOpen}>
        <TransitionChild
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto relative w-screen max-w-md">
                  <TransitionChild
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="absolute -inset-2.5" />
                      </button>
                    </div>
                  </TransitionChild>
                  <div className="flex h-full flex-col overflow-y-scroll py-6 shadow-xl rounded-lg bg-[#243831]">
                    <div className="px-4 sm:px-6">
                      <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                        <button
                          className="rounded-full hover:opacity-80 p-2"
                          onClick={() => setIsOpen(false)}
                        >
                          <ArrowRightIcon className="size-4 fill-white" />
                        </button>
                      </DialogTitle>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6 flex flex-col text-white">
                      <button
                        className="hover:opacity-50 text-left items-center flex gap-2 h-10"
                        onClick={() => {
                          setMenu("home");
                          setIsOpen(false);
                          router.push("/homepage");
                        }}
                      >
                        <HomepageIcon className="stroke-white stroke-2" />
                        Home
                      </button>
                      <button
                        className="hover:opacity-50 text-left items-center flex gap-2 h-10"
                        onClick={() => {
                          setMenu("blog");
                          setIsOpen(false);
                          router.push("/homepage");
                        }}
                      >
                        <BlogIcon className="stroke-white stroke-2" />
                        Our Blog
                      </button>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
