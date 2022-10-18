import AccountIcon from './AccountIcon';

interface TableColumn {
  heading: string;
  key: string | ComboKey;
  type: ColumnType;
  linkHref?: string;
  color?: string;
}

interface TableProps {
  columns: TableColumn[];
  data?: any[];
  highlightVal?: string|number;
}

interface ComboKey {
  keys: string[];
  delimiter: string;
}

export enum ColumnType {
  TEXT,
  LINK,
  COMBO,
  IMAGE
}

const Table = (props: TableProps) => {
  const { columns, data } = props;
  const headings = columns.map((column) => column.heading);

  return (
    <div className='flex flex-col grow overflow-y-auto'>
      <div className='flex bg-dark text-center sticky top-0 z-50'>
        {headings.map((heading, i) => {
          return (
            <div key={`${i}-${heading}`} className='flex-1'>
              <h3 className='font-bold text-xl text-orange'>{heading}</h3>
            </div>
          );
        })}
      </div>
      {data?.map((row, i) => {
        const bg = i % 2 == 0 ? 'bg-light' : '';
        return (
          <div key={i} className={`${bg} hover:bg-highlight flex flex-1 text-center`}>
            {columns.map((column) => {
              const { type, color } = column;
              const key = column.key as string;
              const combo = column.key as ComboKey;
              let col = undefined;
              let highlight = row[key]?.toLowerCase() == props.highlightVal;
              const textColor = color ?? 'text-white';

              switch (type) {
              case ColumnType.LINK:
                col = <a className='text-lg' href={`${column.linkHref}/${row[key]}`}>{row[key]}</a>;
                break;
              case ColumnType.COMBO:
                const val = combo.keys.map((key) => row[key]).join(combo.delimiter);
                col = <h3 className={`text-lg ${textColor}`}>{val}</h3>;
                highlight = false;
                break;
              // TODO: Make this more generic
              case ColumnType.IMAGE:
                col = <AccountIcon accountType={row[key]} center={true} height='20px' />;
                break;
              default:
                col = <h3 className={`text-lg ${textColor}`}>{row[key]}</h3>;
                break;
              }

              return (
                <div key={`${key}-${row[key]}`} className={`flex flex-1 items-center justify-center ${highlight ? 'bg-highlight' : ''}`}>
                  {col}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Table;
