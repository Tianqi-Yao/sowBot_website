import { useState } from "react";

export function usePagination(initialPage = 1, initialPageSize = 30) {
    const [page, setPage] = useState(initialPage);
    const [pageSize, setPageSize] = useState(initialPageSize);

    const paginate = (data: any[]) => {
        return data.slice((page - 1) * pageSize, page * pageSize);
    };

    return {
        page,
        setPage,
        pageSize,
        setPageSize,
        paginate,
    };
}
