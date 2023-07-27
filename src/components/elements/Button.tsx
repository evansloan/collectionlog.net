import React from 'react';

type HTMLButtonProps = DetailedHTMLElementProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export enum ButtonType {
  STANDARD,
  CUTOUT
}

interface OverrideProps {
  title: string;
  icon?: string;
  iconAlt?: string;
  externalLink?: string;
  buttonType?: ButtonType;
}

type ButtonProps = HTMLButtonProps & OverrideProps;

const Button = (props: ButtonProps) => {
  let buttonClass = 'btn-standard border-black';
  if (props.buttonType == ButtonType.CUTOUT) {
    buttonClass = 'btn-cutout bg-grey hover:bg-dark-red border-accent hover:border-darker-red';
  }

  let buttonDom = (
    <button
      {...props}
      className={`p-2 ${buttonClass} border-2 text-white text-shadow ${props.className ?? ''}`}
    >
      <div className='flex justify-around items-center'>
        {props.icon &&
          <img src={props.icon} alt={props.iconAlt} className='w-[50px]'/>
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
