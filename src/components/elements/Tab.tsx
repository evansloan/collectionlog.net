interface TabProps {
  activeTab: string;
  label: string;
  obtainedUniques: number | undefined;
  totalUniques: number | undefined;
  onTabClick: (tabName: string) => void;
}

const Tab = (props: TabProps) => {
  const { activeTab, label, obtainedUniques, totalUniques, onTabClick } = props;

  let className = 'bg-dark';
  if (activeTab == label) {
    className = 'bg-tabHighlight';
  }

  // Eventually this setting will be a toggle-able user setting, until then it'll be feature flagged by this
  const shouldShowTabProgress = true && obtainedUniques != null && totalUniques != null; // Not all tabs are collection log tabs

  let progressColor = obtainedUniques == totalUniques ? 'text-green' : 'text-yellow';
  if (obtainedUniques == 0) {
    progressColor = 'text-red';
  }

  return (
    <div className={`flex justify-center items-center grow px-[5px] py-0 max-w-[18%] min-w-full sm:min-w-[120px] hover:bg-highlight border-2 border-light border-b-0 md:rounded-tl-[10px] md:rounded-tr-[10px] cursor-pointer ${className}`} onClick={() => onTabClick(label)}>
      <span className='text-orange text-center text-lg font-bold'>{label} {shouldShowTabProgress && <span className={progressColor}>{`(${obtainedUniques}/${totalUniques})`}</span>}</span>
    </div>
  );
};

export default Tab;