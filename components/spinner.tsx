interface SpinnerProps {
  wrap?: boolean;
}

const Spinner = ({ wrap }: SpinnerProps) => {
  const Comp = <div className='bit-spinner icon-shadow text-shadow'></div>;
  return wrap ? (
    <div className='flex h-[200px] items-center justify-center'>{Comp}</div>
  ) : (
    Comp
  );
};
export default Spinner;
