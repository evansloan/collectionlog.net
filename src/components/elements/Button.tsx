type HTMLButtonProps = DetailedHTMLElementProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface OverrideProps {
  title: string;
  icon?: string;
}

type ButtonProps = HTMLButtonProps & OverrideProps;

const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className={`p-2 bg-primary hover:bg-highlight border border-light text-white text-shadow ${props.className ?? ''}`}
    >
      <div className='flex justify-around items-center'>
        {props.icon &&
          <img src={props.icon} className='w-[50px]'/>
        }
        {props.title}
      </div>
    </button>
  );
};

export default Button;
