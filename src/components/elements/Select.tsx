import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

export interface SelectOption {
  title: string;
  value: string;
  selected?: boolean;
}

type HTMLSelectProps = DetailedHTMLElementProps<
  React.ButtonHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

interface OverrideProps {
  options: SelectOption[];
  onChange: (value: string) => void;
}

type SelectProps = HTMLSelectProps & OverrideProps;

const Select = (props: SelectProps) => {
  const { options, onChange } = props;
  const selectedOption = options.filter((option) => option.selected)[0];

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(selectedOption?.title ?? options[0].title);
  const [selected, setSelected] = useState(selectedOption?.value);

  const onOptionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value;
    const title = e.currentTarget.innerHTML;
    onChange(value);
    setIsOpen(false);
    setTitle(title);
    setSelected(value);
  };

  let selectTitle = title;
  if (!selectTitle) {
    selectTitle = selectedOption?.title ?? options[0].title;
  }

  return (
    <div className='p-2 bg-primary text-orange cursor-pointer'>
      <div onClick={() => setIsOpen(!isOpen)}>
        <span>{title}</span><span className='float-right'><FontAwesomeIcon icon={faChevronDown} className='icon-shadow' /></span>
      </div>
      {isOpen &&
        <div className='border-t-2 border-light'>
          {options.map((option, i) => {
            const isSelected = option.value == selected;
            const bgColor = isSelected ? 'bg-highlight' : '';
            return (
              <button
                className={`block w-full ${bgColor} text-shadow text-left hover:bg-highlight hover:text-white`}
                key={`${i}-${option.value}`}
                value={option.value}
                onClick={onOptionClick}
              >
                {option.title}
              </button>
            );
          })}
        </div>
      }
    </div>
  );
};

export default Select;
