import {
  ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { FormProvider, useForm } from "react-hook-form";

//import { LoadingDefault } from "components/Loading";

import { PaginationItem } from "./PaginationItem";

export type PaginationData = {
  currentPage?: number;
  pageSize?: 10;
  paginate?: true;
};

export type RefPaginationProps = {
  reload: () => void;
};

interface PaginationProps {
  nPages: number;
  loadColumnsData: (paginationData: PaginationData) => void;
  asSiblingsCountFixed?: boolean;
  isLoading?: boolean;
  renderTableRows?: ReactNode;
  canResetOrderColumnWhenLoad?: boolean;
  w?: string | string[];
  isBorderWidth?: boolean;
}

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter((page) => page > 0);
}

const siblingsCount = 1;

export const Pagination = forwardRef<RefPaginationProps, PaginationProps>(
  (
    {
      nPages,
      isBorderWidth = true,
      loadColumnsData,
      asSiblingsCountFixed,
      renderTableRows,
    },
    ref
  ) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationData, setPaginationData] = useState<PaginationData>({
      currentPage,
      pageSize: 10,
      paginate: true,
    });

    const formMethods = useForm<FormData>();

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
      console.log("oi");
      loadColumnsData(paginationData);
    }, [loadColumnsData, paginationData]);

    useImperativeHandle(ref, () => ({
      reload,
    }));

    useEffect(() => {
      loadColumnsData(paginationData);
    }, [loadColumnsData, paginationData]);

    return (
      <div
        className={`bg-red-400 w-full ${
          isBorderWidth ? "border-[0.7px]" : "border-0"
        } rounded-[8px] ${isBorderWidth ? "border-gray-100" : ""}`}
      >
        <FormProvider {...formMethods}>
          {/*  {(isLoading || loadingPagination) && <LoadingDefault />} */}
          <div className="overflow-auto rounded-t-4px w-full">
            {renderTableRows}
          </div>

          <div
            className={`flex pt-[15px] pb-[15px] ${
              isBorderWidth ? "border-t-[1px]" : "border-t-0"
            } border-gray-100 justify-between items-center flex-row md:flex-col`}
          >
            <div className="flex justify-center items-center">
              <p
                className="text-md transition-duration hover:bg-slate-500 text-black cursor-pointer 
              border-[2px] rounded-tl-[8px] rounded-bs-[8px] border-white p-[5px] h-[32px]"
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
                  color="secondary.800"
                  onClick={() => handleRefreshPage(currentPage - 1)}
                >
                  &laquo;
                </PaginationItem>

                {previousPages.length > 0 &&
                  previousPages.map((page) => (
                    <PaginationItem
                      key={page}
                      color="secondary.500"
                      id="previousPage"
                      onClick={() => handleRefreshPage(page)}
                    >
                      {page}
                    </PaginationItem>
                  ))}

                <PaginationItem bgColor="secondary.500" color="white" isCurrent>
                  {currentPage}
                </PaginationItem>

                {nextPages.length > 0 &&
                  nextPages.map((page) => (
                    <PaginationItem
                      key={page}
                      color="secondary.500"
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
                  color="secondary.800"
                  onClick={() => handleRefreshPage(currentPage + 1)}
                >
                  &raquo;
                </PaginationItem>
              </div>

              <p
                className="text-md transition-duration hover:bg-slate-500 text-black cursor-pointer 
              border-[2px] rounded-tr-[8px] rounded-be-[8px] border-white p-[5px] h-[32px]"
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
        </FormProvider>
      </div>
    );
  }
);
