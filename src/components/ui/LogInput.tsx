interface LogInputProps {
  changeHandler: ((...args: any) => void);
  className?: string;
  name: string;
  placeholder?: string;
  type: string;
}

const LogInput = (props: LogInputProps) => {
  let className = 'pl-[10px] bg-light text-[20px] text-white border-0 shadow-log focus:outline-none';
  if (props.className) {
    className = `${className} ${props.className}`;
  }

  return (
    <input
      className={className}
      type={props.type}
      name={props.name}
      placeholder={props.placeholder ?? ''}
      onChange={(e) => props.changeHandler(e)}>
    </input>
  );
};

export default LogInput;
