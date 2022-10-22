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
  title: string;
  options: SelectOption[];
}

type SelectProps = HTMLSelectProps & OverrideProps;

const Select = (props: SelectProps) => {
  return (
    <div>
      <div>
        <span></span>
      </div>
    </div>
  );
};

export default Select;
