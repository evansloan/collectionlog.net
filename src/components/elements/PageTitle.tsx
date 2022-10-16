interface PageTitleProps {
  title: string;
  description?: string;
  icon?: string;
}

const PageTitle = (props: PageTitleProps) => {
  return (
    <div className='p-1 text-center'>
      <div className='flex justify-center'>
        {props.icon &&
          <img className='self-center h-[20px]' src={props.icon} />
        }
        <h1>{props.title}</h1>
      </div>
      <p>{props.description}</p>
    </div>
  );
};

export default PageTitle;
