type HTMLButtonProps = DetailedHTMLElementProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface OverrideProps {
  title: string;
  icon?: string;
  externalLink?: string;
}

type ButtonProps = HTMLButtonProps & OverrideProps;

const Button = (props: ButtonProps) => {
  let buttonDom = (
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

  // Wrap the button in an anchor if we should be redirecting outwards
  if (props.externalLink) {
    buttonDom = (
      <a href={props.externalLink}>
        {buttonDom}
      </a>
    );
  }

  return buttonDom;
};

export default Button;
