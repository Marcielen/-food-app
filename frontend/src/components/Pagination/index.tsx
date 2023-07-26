import {
  ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import { PaginationItem } from "./PaginationItem";

export type PaginationData = {
  currentPage?: number;
  pageSize?: 10;
  paginate?: true;
};

export type RefPaginationProps = {
  reload: () => void;
};

const paginationDefault = {
  currentPage: 1,
  pageSize: 10,
  paginate: true,
} as PaginationData;

interface PaginationProps {
  nPages: number;
  loadColumnsData: (paginationData: PaginationData) => void;
  asSiblingsCountFixed?: boolean;
  isLoading?: boolean;
  renderTableRows?: ReactNode;
}

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter((page) => page > 0);
}

const siblingsCount = 1;

export const Pagination = forwardRef<RefPaginationProps, PaginationProps>(
  ({ nPages, loadColumnsData, asSiblingsCountFixed, renderTableRows }, ref) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationData, setPaginationData] =
      useState<PaginationData>(paginationDefault);

    const lastPage = Math.ceil(nPages / 10);

    let previousPagesFromSiblings = currentPage - 1 - siblingsCount;
    let nextPagesToSiblings = currentPage + siblingsCount;

    if (lastPage < currentPage + siblingsCount && asSiblingsCountFixed) {
      previousPagesFromSiblings -= currentPage + siblingsCount - lastPage;
    }

    if (currentPage <= siblingsCount && asSiblingsCountFixed) {
      nextPagesToSiblings += siblingsCount + 1 - currentPage;
    }

    const previousPages =
      currentPage > 1
        ? generatePagesArray(
            Math.max(previousPagesFromSiblings, 0),
            currentPage - 1
          )
        : [];

    const nextPages =
      currentPage < lastPage
        ? generatePagesArray(
            currentPage,
            Math.min(nextPagesToSiblings, lastPage)
          )
        : [];

    const handleRefreshPage = (valuePage: number) => {
      setCurrentPage(valuePage);
      setPaginationData((prev) => ({ ...prev, currentPage: valuePage }));
    };

    const reload = useCallback(() => {
      loadColumnsData(paginationDefault);
    }, [loadColumnsData]);

    useImperativeHandle(ref, () => ({
      reload,
    }));

    useEffect(() => {
      loadColumnsData(paginationData);
    }, [loadColumnsData, paginationData]);

    return (
      <div>
        {/*  {(isLoading || loadingPagination) && <LoadingDefault />} */}
        <div className="mb-8">{renderTableRows}</div>

        <div
          className={`flex pt-[15px] pb-[15px]  justify-between items-center flex-row md:flex-col`}
        >
          <div className="flex justify-center items-center">
            <p
              className="text-md hover:text-white transition-duration hover:bg-primary text-black cursor-pointer 
              border-[2px] rounded-tl-[8px] rounded-bs-[8px] border-gray-200 p-[5px] h-[32px]"
              onClick={() => {
                if (currentPage !== 1) {
                  setCurrentPage(1);
                  handleRefreshPage(1);
                }
              }}
            >
              Início
            </p>
            <div className="flex justify-center items-center">
              <PaginationItem
                disabled={currentPage === 1}
                onClick={() => handleRefreshPage(currentPage - 1)}
              >
                &laquo;
              </PaginationItem>

              {previousPages.length > 0 &&
                previousPages.map((page) => (
                  <PaginationItem
                    key={page}
                    id="previousPage"
                    onClick={() => handleRefreshPage(page)}
                  >
                    {page}
                  </PaginationItem>
                ))}

              <PaginationItem isCurrent>{currentPage}</PaginationItem>

              {nextPages.length > 0 &&
                nextPages.map((page) => (
                  <PaginationItem
                    key={page}
                    id="nextPage"
                    onClick={() => handleRefreshPage(page)}
                  >
                    {page}
                  </PaginationItem>
                ))}

              <PaginationItem
                disabled={
                  currentPage === lastPage ||
                  nPages < (paginationData?.pageSize || 10)
                }
                onClick={() => handleRefreshPage(currentPage + 1)}
              >
                &raquo;
              </PaginationItem>
            </div>

            <p
              className="text-md transition-duration hover:text-white hover:bg-primary text-black cursor-pointer 
              border-[2px] rounded-tr-[8px] rounded-be-[8px] border-gray-200 p-[5px] h-[32px]"
              onClick={() => {
                if (currentPage !== lastPage && nPages !== 0) {
                  setCurrentPage(lastPage);
                  handleRefreshPage(lastPage);
                }
              }}
            >
              Última
            </p>
          </div>
        </div>
      </div>
    );
  }
);
