"use client";

import { useState, useEffect } from "react";
import { DropdownMenu } from "radix-ui";
// import ImageCard from "./ImageCard";
import { IconButton, Skeleton } from "@radix-ui/themes";
import clsx from "clsx";
import { GoDotFill } from "react-icons/go";
import { RiFilter2Fill } from "react-icons/ri";
import { VscSettings } from "react-icons/vsc";
import Icon from "./Icon";
import { emitServerErrorEvent, range } from "@/libs/helper";
import { getData } from "@/libs/fetchData";
import Link from "next/link";
import { SlOptionsVertical } from "react-icons/sl";
import { IconButtons } from "./Buttons";
import { route } from "@/libs/route";
// import { emitServerErrorEvent } from "@/app/libs/dd";
// COLUMS
export interface ColumnDefProf {
  accessorKey: string;
  header: string;
  colType: "text" | "badge" | "dropdown";
  meta?: {
    filterVariant?: "select" | "range";
  };
}
interface MyTableProps {
  route: string[];
  cols: ColumnDefProf[];
  tableTitle: string;
  perPage: number;
  apiUrl: string;
  actionsTable: [];
}
interface updateUrlParamsProps {
  query: string;
  value: string | number;
  reset?: boolean;
}
const updateBrowserUrlParams = (params: updateUrlParamsProps) => {
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set(params.query, String(params.value));
  window.history.pushState({}, "", currentUrl.toString());
};

const updateTableUrlParams = () => {};

const getParamsFromBrowserUrl = (param: string): string => {
  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param) ?? "";
  }
  return "";
};

const MyTable = ({
  route,
  apiUrl,
  cols,
  tableTitle,
  actionsTable,
}: MyTableProps) => {
  const [data, setdata] = useState<any[]>([]);
  const [paginates, setPaginates] = useState<PaginationProps>();
  const [loading, setLoading] = useState(true);

  const mergeBrowserParamsIntoApi = (apiPath: string) => {
    const apiUrl = new URL("http://dummy" + apiPath);
    if (typeof window !== "undefined") {
      const browserUrl = new URL(window.location.href);

      browserUrl.searchParams.forEach((value, key) => {
        if (!apiUrl.searchParams.has(key)) {
          if (value.trim() != "") {
            apiUrl.searchParams.set(key, value);
          }
        }
      });
    }
    return (
      apiUrl.pathname +
      (apiUrl.search ? "?" + apiUrl.searchParams.toString() : "")
    );
  };

  const [url, setUrl] = useState(mergeBrowserParamsIntoApi(apiUrl));

  const getDataForTable = async () => {
    setLoading(true);
    const response = await getData({
      endpoint: url,
    });
    console.log(response.data);
    if (response.status == 200) {
      const { data } = response;
      setdata(data.data.items);
      setPaginates(data.data.pagination);
    }
    if (response.status !== 200) {
      const { error } = response;
      emitServerErrorEvent(500);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDataForTable();
  }, [url]);

  const handleUpdateUrl = (newUrl: string): void => {
    setUrl(newUrl);
  };

  return (
    <div className="">
      {/* TABLE HEADER */}
      <div className="p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex  items-center gap-2">
            <Icon size="xs">
              <GoDotFill />
            </Icon>
            <span className="text-lg ">{tableTitle}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              {/* Class Filter element */}
              <div className=""></div>
              {/* Class Search element */}
              <div className="">
                <Searchbar url={url} handleUpdateUrl={handleUpdateUrl} />
              </div>
            </div>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="cursor-pointer outline-none">
                <Icon size="lg">
                  <RiFilter2Fill />
                </Icon>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className="bg-white w-[500px] space-y-2 text-sm shadow-lg rounded-lg p-1">
                <DropdownMenu.Arrow className="fill-white" />
              </DropdownMenu.Content>
            </DropdownMenu.Root>
            <div className="">
              <DropdownMenu.Root>
                <DropdownMenu.Trigger className="cursor-pointer outline-none">
                  <Icon size="lg">
                    <VscSettings />
                  </Icon>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content className="bg-white w-[250px] space-y-2 text-sm shadow-lg rounded-lg p-1">
                  <DropdownMenu.Arrow className="fill-white" />
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </div>
          </div>
        </div>
      </div>
      {/* TABLE CONTENT */}

      <div className="w-full overflow-x-auto">
        {/* TABLE */}
        <table className="w-full ">
          <TableHeader cols={cols} />
          <TableBody
            loading={loading}
            cols={cols}
            data={data}
            actionsTable={actionsTable}
          />
        </table>
        {/* PAGINATION */}
        <div>
          <PaginationUi
            url={url}
            handleUpdateUrl={handleUpdateUrl}
            paginates={paginates}
          />
        </div>
      </div>
    </div>
  );
};

const TableBody = ({ loading, cols, data, actionsTable }): React.ReactNode => {
  const getValuePathData = (obj, path) => {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
  };

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {loading &&
        range(10).map((element, index) => (
          <tr key={index}>
            <td colSpan={cols.length} className="py-3 px-6">
              <Skeleton className="rounded-xl" width={"100%"} height="20px" />
            </td>
          </tr>
        ))}
      {!loading &&
        data.map((daaaa, index) => (
          <tr
            key={index}
            className="odd:bg-gray-50 cursor-pointer hover:bg-gray-100 transition-all"
          >
            {cols
              .filter((col) => col.accessorKey !== "id")
              .map((col, index) => (
                <td className="py-3 px-6" key={index}>
                  {/* {JSON.stringify(daaaa)} */}
                  {col.colType == "text" && col.accessorFn?.(daaaa)}
                  {col.colType === "badge" && (
                    // <div>defpefpel</div>
                    <BadgeColumns
                      badgeValue={col.accessorFn?.(daaaa)}
                      badgeEnum={col.enum}
                    />
                  )}
                  {col.colType === "dropdown" && (
                    <DropDownActionTable
                      icon={null}
                      rowId={daaaa.id}
                      title={""}
                      actions={actionsTable}
                    />
                  )}
                </td>
              ))}
          </tr>
        ))}
      {!loading && data.length == 0 && (
        <tr>
          <td colSpan={cols.length} className="py-32 px-6 text-center text-2xl">
            Aucun élément trouvé
          </td>
        </tr>
      )}
    </tbody>
  );
};
const TableHeader = ({ cols }: { cols: ColumnDefProf[] }): React.ReactNode => {
  return (
    <thead className="bg-amber-50">
      <tr className="py-4 px-6 text-left text-black/60 ">
        {cols
          .filter((col) => col.accessorKey !== "id")
          .map((col, index) => [
            <th
              key={index}
              className={clsx(
                col.colType === "dropdown" && "w-1 whitespace-nowrap",
                "py-4 px-6 text-left text-black/60 "
              )}
            >
              {col.header}
            </th>,
          ])}
      </tr>
    </thead>
  );
};
const Searchbar = ({
  url,
  handleUpdateUrl,
}: {
  url: string;
  value: string;
}) => {
  const [globalSearch, setGlobalSearch] = useState(
    getParamsFromBrowserUrl("q")
  );
  const handleChange = (e) => {
    setGlobalSearch(e.target.value);
  };
  let typingTimeout: ReturnType<typeof setTimeout>;

  return (
    <input
      className="bg-black/5 px-3 py-2 ps-10 rounded-2xl"
      placeholder="Recherche..."
      value={globalSearch}
      onChange={(e) => {
        handleChange(e);
        // On annule le timer précédent
        clearTimeout(typingTimeout);
        // On recrée un nouveau timer
        typingTimeout = setTimeout(() => {
          const apiUrlObj = new URL("http://dummy" + url); // 'dummy' pour que URL() accepte un chemin relatif
          apiUrlObj.searchParams.set("q", String(e.target.value));
          apiUrlObj.searchParams.set("page", "1");
          const finalApiPath =
            apiUrlObj.pathname + (apiUrlObj.search ? apiUrlObj.search : "");
          handleUpdateUrl(finalApiPath);
          updateBrowserUrlParams({ query: "q", value: e.target.value });
          updateBrowserUrlParams({ query: "page", value: 1 });
        }, 1500);
      }}
    />
  );
};

interface PaginationUiProps {
  handleUpdateUrl: (params: string) => void;
  url: string;
  table: any[];
  paginates: PaginationProps;
}
interface PaginationProps {
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}
const PaginationUi = ({
  handleUpdateUrl,
  url,
  paginates = [],
}: PaginationUiProps) => {
  const currentPagePaginate = paginates ? paginates.current_page : 0;
  const maxRowDisplayPaginates = 10;
  const totalPagesPaginates = paginates ? paginates.last_page : 0;
  const totalRecord = paginates ? paginates.total : 0;

  // const [perPage, setPerPage] = useState(5)

  const generatePageNumbers = () => {
    const pages = [];

    // Cas ou - de 10 page pour ce table
    pages.push({
      label: 1,
      active: currentPagePaginate == 1 ? true : false,
    });

    if (totalPagesPaginates < 10) {
      for (let i = 2; i <= totalPagesPaginates; i++) {
        pages.push({
          label: i,
          active: false,
        });
      }
    } else {
      if (currentPagePaginate >= 3) {
        const dot = {
          label: "...",
          active: false,
        };
        pages.push(dot);
      }

      const start = Math.max(2, currentPagePaginate - 2);
      const end = Math.min(totalPagesPaginates - 1, currentPagePaginate + 2);

      for (let i = start; i <= end; i++) {
        pages.push({
          label: i,
          active: false,
        });
      }

      if (currentPagePaginate < totalPagesPaginates - 4) {
        const dot = {
          url: "#",
          label: "...",
          active: false,
        };
        pages.push(dot);
      }
      // pages.push({
      //   label: totalPagesPaginates,
      //   active: currentPagePaginate == totalPagesPaginates ? true : false,
      // });
    }
    return pages;
  };

  // Go to previons page
  const handleGotoPage = (page: number) => {
    // 1️⃣ Ajouter / remplacer le paramètre `page` dans l'URL du navigateur
    updateBrowserUrlParams({ query: "page", value: page });
    // 2️⃣ Construire l'URL API à partir de la prop `url` (ex: "/users" ou "/estimates")
    const apiUrlObj = new URL("http://dummy" + url); // 'dummy' pour que URL() accepte un chemin relatif
    apiUrlObj.searchParams.set("page", String(page));

    // On ne prend que le pathname + search, pas le domaine
    const finalApiPath =
      apiUrlObj.pathname + (apiUrlObj.search ? apiUrlObj.search : "");
    // 3️⃣ Mettre à jour l'état avec l'URL API
    handleUpdateUrl(finalApiPath);
  };

  // Modification du nombre de page
  const handleRowPerPage = (page: number) => {
    updateBrowserUrlParams({ query: "per_page", value: page });

    const apiUrlObj = new URL("http://dummy" + url); // 'dummy' pour que URL() accepte un chemin relatif
    apiUrlObj.searchParams.set("per_page", String(page));

    // On ne prend que le pathname + search, pas le domaine
    const finalApiPath =
      apiUrlObj.pathname + (apiUrlObj.search ? apiUrlObj.search : "");
    handleUpdateUrl(finalApiPath);
  };

  // Go to next page

  return (
    <div className="flex  items-center py-3 px-6 justify-between">
      {/* Page en cours */}
      <div className="text-sm text-gray-500 font-semibold">
        Affichage de {(currentPagePaginate - 1) * maxRowDisplayPaginates + 1} à{" "}
        {Math.min(currentPagePaginate * maxRowDisplayPaginates, totalRecord)}{" "}
        sur {totalRecord}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {/* Précédent */}
        <button
          onClick={() => handleGotoPage(currentPagePaginate - 1)}
          disabled={currentPagePaginate > 1 ? false : true}
          className={clsx(
            currentPagePaginate > 1 ? "bg-primary text-white" : "bg-gray-200",
            "px-3 cursor-pointer py-1  hover:bg-gray-300 rounded disabled:opacity-50 text-sm"
          )}
        >
          {"<"}
        </button>

        {/* Numéros de page */}
        {generatePageNumbers().map((page, index) =>
          page?.label === "..." ? (
            <span key={index} className="px-2 text-sm text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => handleGotoPage(Number(page?.label))}
              className={`px-2.5 py-1 text-sm rounded cursor-pointer ${
                currentPagePaginate === page.label
                  ? "bg-primary text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {Number(page?.label)}
            </button>
          )
        )}

        {/* Suivant */}
        <button
          onClick={() => handleGotoPage(currentPagePaginate + 1)}
          disabled={currentPagePaginate == totalPagesPaginates ? true : false}
          className={clsx(
            currentPagePaginate !== totalPagesPaginates
              ? "bg-primary text-white"
              : "bg-gray-200",
            "px-3 cursor-pointer py-1  hover:bg-gray-300 rounded disabled:opacity-50 text-sm"
          )}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default MyTable;

const BadgeColumns = ({ badgeValue, badgeEnum }) => {
  return (
    <span
      className={clsx(
        badgeEnum[badgeValue].color,
        "text-gray-900 bg-gray-200",
        "text-center  rounded-xl px-5 py-0.5 text-sm"
      )}
    >
      {badgeEnum[badgeValue].title}
    </span>
  );
};

const DropDownActionTable = ({ rowId, title, actions, icon }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="border-0 outline-none">
        <IconButtons
          iconbefore={true}
          size="md"
          onClick={(e) => e.stopPropagation()}
          type="primary"
          variant="outline"
          icon={icon || <SlOptionsVertical className="text-xl" />}
          title={title}
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        className={clsx(
          "bg-white w-[250px]  relative z-20 space-y-2 text-sm shadow-lg rounded-lg p-1"
        )}
      >
        {actions
          .filter((element) => element.visible)
          .map((action, index) => {
            return (
              <DropdownMenu.Item
                key={index}
                className="rounded-md  data-[disabled]:pointer-events-none data-[highlighted]:bg-primary data-[highlighted]:text-white data-[disabled]:text-blue-300 data-[highlighted]:text-violet1"
              >
                {/* <Link className=" block p-3" href={action.href}> */}
                {action.type == "url" && (
                  <Link
                    className=" block p-3"
                    href={route(action.url, action.params(rowId))}
                  >
                    {action.label}
                  </Link>
                )}
                {/* </Link> */}
              </DropdownMenu.Item>
            );
          })}
        <DropdownMenu.Arrow className="fill-white" />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
