interface SpinnerProps {
  wrap?: boolean;
}

const Spinner = ({ wrap }: SpinnerProps) => {
  const spinner = <div className='bit-spinner icon-shadow text-shadow'></div>;
  return wrap ? (
    <div className='flex h-[200px] items-center justify-center'>{spinner}</div>
  ) : (
    spinner
  );
};
export default Spinner;
