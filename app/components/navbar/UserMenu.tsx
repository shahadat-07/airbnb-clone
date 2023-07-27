"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import { signOut } from "next-auth/react";
import MenuItem from "./MenuItem";
import userRegisterModal from "@/app/hooks/useRegisterModal";
import userLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/app/types";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerModal = userRegisterModal();
  const loginModal = userLoginModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>

        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          {currentUser ? (
            <>
              <div className="flex flex-col cursor-pointer">
                <MenuItem
                  onClick={() => router.push("/trips")}
                  label="My trips"
                />
              </div>
              <div className="flex flex-col cursor-pointer">
                <MenuItem
                  onClick={() => router.push("/favorites")}
                  label="My favorites"
                />
              </div>
              <div className="flex flex-col cursor-pointer">
                <MenuItem
                  onClick={() => router.push("/reservations")}
                  label="My reservation"
                />
              </div>
              <div className="flex flex-col cursor-pointer">
                <MenuItem
                  onClick={() => router.push("/properties")}
                  label="My properties "
                />
              </div>
              <div className="flex flex-col cursor-pointer">
                <MenuItem onClick={rentModal.onOpen} label="Aribnb my home " />
              </div>
              <hr />
              <div className="flex flex-col cursor-pointer">
                <MenuItem onClick={() => signOut()} label="Logout " />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col cursor-pointer">
                <MenuItem onClick={loginModal.onOpen} label="Login" />
              </div>
              <div className="flex flex-col cursor-pointer">
                <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
