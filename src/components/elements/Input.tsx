export type HTMLInputProps = DetailedHTMLElementProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input = (props: HTMLInputProps) => {
  const { className } = props;
  return (
    <input
      {...props}
      placeholder={props.placeholder}
      className={`p-2 bg-primary focus:bg-highlight text-white placeholder:text-orange text-shadow border-2 border-light shadow-log outline-none ${className ? className : ''}`}
    />
  );
};

export default Input;
