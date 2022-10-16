type PageHeaderProps = HTMLElementProps<unknown>;

const PageHeader = (props: PageHeaderProps) => {
  const className = props.className ?? '';

  return (
    <div className={`flex justify-center border-b-4 border-b-black ${className}`}>
      {props.children}
    </div>
  );
};

export default PageHeader;
