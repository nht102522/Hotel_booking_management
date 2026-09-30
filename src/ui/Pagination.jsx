import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";
const buttonClass =
  "flex items-center justify-center gap-[0.4rem] rounded-[var(--border-radius-sm)] border-0 bg-grey-50 px-[1.2rem] py-[0.6rem] text-[1.4rem] font-medium transition-colors hover:not-disabled:bg-brand-600 hover:not-disabled:text-brand-50 [&_svg]:h-[1.8rem] [&_svg]:w-[1.8rem]";

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const pageCount = Math.ceil(count / PAGE_SIZE);

  function changePage(page) {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("page", String(page));
    setSearchParams(nextSearchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <div className="flex w-full items-center justify-between">
      <p className="ml-[0.8rem] text-[1.4rem]">
        Showing{" "}
        <span className="font-semibold">
          {(currentPage - 1) * PAGE_SIZE + 1}
        </span>{" "}
        to{" "}
        <span className="font-semibold">
          {Math.min(currentPage * PAGE_SIZE, count)}
        </span>{" "}
        of <span className="font-semibold">{count}</span> results
      </p>
      <div className="flex gap-[0.6rem]">
        <button
          className={`${buttonClass} pl-[0.4rem]`}
          disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
        >
          <HiChevronLeft />
          <span>Previous</span>
        </button>

        <button
          className={`${buttonClass} pr-[0.4rem]`}
          disabled={currentPage === pageCount}
          onClick={() => changePage(currentPage + 1)}
        >
          <span>Next</span>
          <HiChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
