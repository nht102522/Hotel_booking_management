import { createContext, useContext } from "react";

const TableContext = createContext("");

function Table({ columns, className = "", children }) {
  return (
    <TableContext.Provider value={columns}>
      <div className={`overflow-hidden rounded-[7px] border border-grey-200 bg-grey-0 text-[1.4rem] ${className}`}>
        {children}
      </div>
    </TableContext.Provider>
  );
}

function TableRow({ className = "", ...props }) {
  const columns = useContext(TableContext);
  return (
    <div
      className={`grid items-center gap-x-[2.4rem] px-[2.4rem] py-[1.2rem] transition-none not-last:border-b not-last:border-grey-100 ${className}`}
      style={{ gridTemplateColumns: columns }}
      {...props}
    />
  );
}

function TableHeader({ className = "", ...props }) {
  const columns = useContext(TableContext);
  return (
    <header
      className={`grid items-center gap-x-[2.4rem] border-b border-grey-100 bg-grey-50 px-[2.4rem] py-[1.6rem] font-semibold uppercase tracking-[0.4px] text-grey-600 ${className}`}
      style={{ gridTemplateColumns: columns }}
      {...props}
    />
  );
}

function TableBody({ data = [], render }) {
  if (!data.length) return <p className="m-[2.4rem] text-center text-[1.6rem] font-medium">No data to show at the moment</p>;
  return <section className="my-[0.4rem]">{data.map(render)}</section>;
}

function TableFooter({ className = "", ...props }) {
  return <footer className={`flex justify-center bg-grey-50 p-[1.2rem] empty:hidden ${className}`} {...props} />;
}

Table.Header = TableHeader;
Table.Row = TableRow;
Table.Body = TableBody;
Table.Footer = TableFooter;

export default Table;
