import { useState } from 'react';

interface DropDownProps {
  title: string;
  children: React.ReactNode;
}

const DropDown = (props: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const className = isOpen ? 'flex' : 'hidden';

  return (
    <button className='block mx-auto mb-2 px-3 text-shadow border-2 border-black' onClick={() => setIsOpen(!isOpen)}>
      <p className='text-[20px] text-white'>{props.title}</p>
      <div className={`${className} flex-col absolute top-[18%] left-[50%] -translate-x-[50%] -translate-y-[50%] p-2 text-left bg-primary border-2 border-black z-10`}>
        {props.children}
      </div>
    </button>
  );
};

export default DropDown;