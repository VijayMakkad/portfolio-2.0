import type { IconType } from 'react-icons';
import {
  FaChevronRight,
  FaGithub,
  FaInstagram,
  FaLinkedin,
} from 'react-icons/fa6';
import {
  HiArrowRight,
  HiArrowTopRightOnSquare,
  HiArrowUpRight,
  HiClipboard,
  HiEnvelope,
  HiOutlineDocument,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineGlobeAsiaAustralia,
  HiOutlineLink,
  HiOutlineRocketLaunch,
} from 'react-icons/hi2';
import {
  PiBookBookmarkDuotone,
  PiGridFourDuotone,
  PiHouseDuotone,
  PiImageDuotone,
  PiLinkDuotone,
  PiMoonStarsDuotone,
  PiUserCircleDuotone,
} from 'react-icons/pi';
import { SiJavascript } from 'react-icons/si';
import { GgNpm } from './customIcons';

export const iconLibrary: Record<string, IconType> = {
  npm: GgNpm,
  moon: PiMoonStarsDuotone,
  arrowUpRight: HiArrowUpRight,
  arrowRight: HiArrowRight,
  chevronRight: FaChevronRight,
  linkOut: PiLinkDuotone,
  email: HiEnvelope,
  globe: HiOutlineGlobeAsiaAustralia,
  person: PiUserCircleDuotone,
  grid: PiGridFourDuotone,
  book: PiBookBookmarkDuotone,
  openLink: HiOutlineLink,
  home: PiHouseDuotone,
  gallery: PiImageDuotone,
  eye: HiOutlineEye,
  eyeOff: HiOutlineEyeSlash,
  github: FaGithub,
  linkedin: FaLinkedin,
  clipboard: HiClipboard,
  arrowUpRightFromSquare: HiArrowTopRightOnSquare,
  document: HiOutlineDocument,
  rocket: HiOutlineRocketLaunch,
  instagram: FaInstagram,
  javascript: SiJavascript,
};

export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;
