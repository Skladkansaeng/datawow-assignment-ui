import {
  Menu,
  MenuButton,
  Transition,
  MenuItems,
  MenuItem
} from "@headlessui/react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

const Dropdown = ({
  options,
  label,
  value,
  onChange,
  labelStyles
}: {
  options: Array<{ label: string; value: string }>;
  label: string;
  value: string;
  onChange: (value: string) => void;
  labelStyles?: string;
}) => {
  const [selectedValue, setSelectedValue] = useState(value ?? "");
  useEffect(() => {
    onChange(selectedValue);
  }, [selectedValue, onChange]);

  useEffect(() => {
    onChange(value);
  }, [value, onChange]);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/* <div className="backdrop-blur-sm hover:backdrop-blur-lg w-screen h-screen"></div> */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      )}

      <Menu>
        <MenuButton
          onClick={() => {
            setIsOpen(true);
          }}
          className={
            labelStyles ||
            "inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 hover:opacity-50 font-semibold text-black "
          }
        >
          {label}
          <ChevronDownIcon className="size-4 fill-black" />
        </MenuButton>
        <Transition
          enter="transition ease-out duration-75"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
          afterLeave={() => setIsOpen(false)}
        >
          <MenuItems
            anchor="bottom end"
            className="w-52 origin-top-right rounded-lg border border-white/5 bg-white p-1 text-sm/6 text-black"
          >
            {options?.map(({ label, value: _value }) =>
              _value === selectedValue ? (
                <MenuItem key={`selected_${_value}`}>
                  <button
                    onClick={() => {
                      setSelectedValue(_value);
                      setIsOpen(false);
                    }}
                    className="group flex justify-between w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-[#D8E9E4] bg-[#D8E9E4] "
                  >
                    {label}
                    <CheckIcon className="size-6 fill-black opacity-100" />
                  </button>
                </MenuItem>
              ) : (
                <MenuItem key={_value}>
                  <button
                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-[#D8E9E4] "
                    onClick={() => {
                      setSelectedValue(_value);
                      setIsOpen(false);
                    }}
                  >
                    {label}
                  </button>
                </MenuItem>
              )
            )}
          </MenuItems>
        </Transition>
      </Menu>
    </>
  );
};

export default Dropdown;
