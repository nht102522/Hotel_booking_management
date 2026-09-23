import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const buttonClass =
  "flex items-center justify-center gap-[0.4rem] rounded-[var(--border-radius-sm)] border-0 bg-grey-50 px-[1.2rem] py-[0.6rem] text-[1.4rem] font-medium transition-colors hover:not-disabled:bg-brand-600 hover:not-disabled:text-brand-50 [&_svg]:h-[1.8rem] [&_svg]:w-[1.8rem]";

function Pagination({ count, page = 1, pageSize = 10, onPageChange }) {
  const pageCount = Math.ceil(count / pageSize);
  if (pageCount <= 1) return null;

  return (
    <div className="flex w-full items-center justify-between">
      <p className="ml-[0.8rem] text-[1.4rem]">
        Showing <span className="font-semibold">{(page - 1) * pageSize + 1}</span> to{" "}
        <span className="font-semibold">{Math.min(page * pageSize, count)}</span> of{" "}
        <span className="font-semibold">{count}</span> results
      </p>
      <div className="flex gap-[0.6rem]">
        <button className={`${buttonClass} pl-[0.4rem]`} disabled={page === 1} onClick={() => onPageChange?.(page - 1)}>
          <HiChevronLeft /> <span>Previous</span>
        </button>
        <button className={`${buttonClass} pr-[0.4rem]`} disabled={page === pageCount} onClick={() => onPageChange?.(page + 1)}>
          <span>Next</span> <HiChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
