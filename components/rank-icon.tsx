import React from 'react';
import Image, { StaticImageData } from 'next/image';

import { cn } from '@/lib/utils';

import groupIronman from '@/assets/images/group_ironman.png';
import hardcoreGroupIronman from '@/assets/images/hardcore_group_ironman.png';
import hardcoreIronman from '@/assets/images/hardcore_ironman.png';
import ironman from '@/assets/images/ironman.png';
import normal from '@/assets/images/normal.png';
import statsIcon from '@/assets/images/stats.png';
import ultimateIronman from '@/assets/images/ultimate_ironman.png';
import unrankedGroupIronman from '@/assets/images/unranked_group_ironman.png';

const ICON_MAP: { [key in RankType]: StaticImageData } = {
  ALL: statsIcon,
  GROUP_IRONMAN: groupIronman,
  HARDCORE_GROUP_IRONMAN: hardcoreGroupIronman,
  HARDCORE_IRONMAN: hardcoreIronman,
  IRONMAN: ironman,
  NORMAL: normal,
  ULTIMATE_IRONMAN: ultimateIronman,
  UNRANKED_GROUP_IRONMAN: unrankedGroupIronman,
};

const HEIGHT_DEFAULT = 15;
const WIDTH_DEFAULT = 15;

interface RankIconProps {
  rankType: RankType;
  height?: number;
  width?: number;
  className?: string;
}

const RankIcon = React.forwardRef<HTMLImageElement, RankIconProps>(
  ({ rankType, className, height, width }, ref) => {
    const rankTypeIcon = ICON_MAP[rankType];

    return (
      <Image
        className={cn('icon-shadow', className)}
        width={width ?? WIDTH_DEFAULT}
        height={height ?? HEIGHT_DEFAULT}
        src={rankTypeIcon}
        alt={`${rankType} icon`}
        ref={ref}
      />
    );
  }
);
RankIcon.displayName = 'RankIcon';

export default RankIcon;
