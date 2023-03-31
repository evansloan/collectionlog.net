import { AccountType } from '../../app/constants';
import stats from '../../assets/images/stats.png';
import groupIronman from '../../assets/images/group_ironman.png';
import hardcoreIronman from '../../assets/images/hardcore_ironman.png';
import hardcoreGroupIronman from '../../assets/images/hardcore_group_ironman.png';
import ironman from '../../assets/images/ironman.png';
import normal from '../../assets/images/normal.png';
import ultimateIronman from '../../assets/images/ultimate_ironman.png';

const ICON_MAP = {
  'ALL': stats,
  [AccountType.NORMAL]: normal,
  [AccountType.IRONMAN]: ironman,
  [AccountType.ULTIMATE_IRONMAN]: ultimateIronman,
  [AccountType.HARDCORE_IRONMAN]: hardcoreIronman,
  [AccountType.GROUP_IRONMAN]: groupIronman,
  [AccountType.HARDCORE_GROUP_IRONMAN]: hardcoreGroupIronman,
};

interface RankIconProps {
  rankType: RankType;
  height?: string;
  center?: boolean;
}

const RankIcon = (props: RankIconProps) => {
  const { rankType, center, height } = props;

  const imgHeight = height ?? '';
  const margins = center ? 'm-auto' : '';

  return (
    <img src={ICON_MAP[rankType]} className={`h-[${imgHeight}] ${margins} icon-shadow`} />
  );
};

export default RankIcon;
