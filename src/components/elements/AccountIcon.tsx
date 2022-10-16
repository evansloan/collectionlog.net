
import groupIronman from '../../assets/images/group_ironman.png';
import hardcoreIronman from '../../assets/images/hardcore_ironman.png';
import hardcoreGroupIronman from '../../assets/images/hardcore_group_ironman.png';
import ironman from '../../assets/images/ironman.png';
import normal from '../../assets/images/normal.png';
import ultimateIronman from '../../assets/images/ultimate_ironman.png';

enum AccountType {
  NORMAL = 'NORMAL',
  IRONMAN = 'IRONMAN',
  HARDCORE_IRONMAN = 'HARDCORE_IRONMAN',
  ULTIMATE_IRONMAN = 'ULTIMATE_IRONMAN',
  GROUP_IRONMAN = 'GROUP_IRONMAN',
  HARDCORE_GROUP_IRONMAN = 'HARDCORE_GROUP_IRONMAN'
}

const ICON_MAP: { [key in AccountType]: string } = {
  [AccountType.NORMAL]: normal,
  [AccountType.IRONMAN]: ironman,
  [AccountType.ULTIMATE_IRONMAN]: ultimateIronman,
  [AccountType.HARDCORE_IRONMAN]: hardcoreIronman,
  [AccountType.GROUP_IRONMAN]: groupIronman,
  [AccountType.HARDCORE_GROUP_IRONMAN]: hardcoreGroupIronman,
};

interface AccountIconProps {
  accountType: AccountType;
  height?: string;
  center?: boolean;
}

const AccountIcon = (props: AccountIconProps) => {
  const { accountType, center, height } = props;

  const imgHeight = height ?? '';
  const margins = center ? 'm-auto' : '';

  return (
    <img src={ICON_MAP[accountType]} className={`h-[${imgHeight}] ${margins} icon-shadow`} />
  );
};

export default AccountIcon;
