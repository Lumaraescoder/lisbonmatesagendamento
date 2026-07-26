import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Avatar from "@/shared/Avatar";
import SwitchDarkMode2 from "@/shared/SwitchDarkMode2";
import Link from "next/link";
interface Props {
  className?: string;
}

export default function AvatarDropdown({ className = "" }: Props) {
  // Avatar dropdown removed per user request: render nothing
  return null;
}
