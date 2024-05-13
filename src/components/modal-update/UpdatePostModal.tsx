import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild
} from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import Dropdown from "../dropdown";

const UpdatePostModal = ({
  isOpen,
  setIsOpen,
  value,
  onOk
}: {
  isOpen: boolean;
  value?: {
    category: string;
    title: string;
    content: string;
  };
  setIsOpen: (val: boolean) => void;
  onOk: (value: {
    category: string;
    title: string;
    content: string;
  }) => Promise<void>;
}) => {
  const cancelButtonRef = useRef(null);
  const [dropdownValue, setDropdownValue] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    setTitle(value?.title ?? "");
    setContent(value?.content ?? "");
    if (value?.category) {
      setDropdownValue(value?.category);
      console.log("🚀 ~ useEffect ~ value?.category:", value.category);
    }
  }, [value]);


  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setIsOpen}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 w-screen overflow-y-auto">
          <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all my-8 w-full max-w-lg ">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Edit Post
                      </DialogTitle>
                      <div className="mt-2 flex flex-col gap-2 w-full">
                        <div className="w-[500]">
                          <div>
                            <div className="w-max flex justify-center rounded-md bg-[#49A569]  px-4 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                              {dropdownValue}
                            </div>
                          </div>
                        </div>

                        <input
                          type="text"
                          name="title"
                          id="title"
                          className="bg-transparent block w-full rounded-md border-0 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                          placeholder="Title"
                          onChange={(e) => setTitle(e.target?.value || "")}
                          value={title}
                        />
                        <textarea
                          id="message"
                          rows={5}
                          className="g-transparent block w-full rounded-md border-0 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                          placeholder="What’s on your mind..."
                          onChange={(e) => setContent(e.target?.value || "")}
                          value={content}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-3 flex flex-col-reverse  sm:flex-row-reverse gap-2">
                  <button
                    type="button"
                    className="w-35 flex justify-center rounded-md bg-[#49A569]  px-4 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => {
                      onOk({ category: dropdownValue, title, content });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="w-35 outline outline-[#49A569] text-[#49A569] px-4 py-2.5 rounded-lg hover:bg-slate-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UpdatePostModal;
