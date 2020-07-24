import React from 'react';


function Pagination(
    {
        pageOptions,
        pageIndex,
        canPreviousPage,
        canNextPage,
        previousPage,
        nextPage,
        pageSize,
        state,
        setPageSize

    }
) {
    return (

        <div className="pagination">
            <span>
                Page{' '}
                <strong>
                    {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
            </span>
            <button className="btn btn-info" onClick={() => previousPage()} disabled={!canPreviousPage}>
                {'<'}
            </button>{" "}&nbsp;
            <button className="btn btn-info" onClick={() => nextPage()} disabled={!canNextPage}>
                {'>'}
            </button>{" "}
            <select className="btn btn-info"
                value={pageSize}
                onChange={e => {
                    setPageSize(Number(e.target.value));
                }}
            >
                {[5, 10, 20, 30].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                ))}
            </select>
        </div>
        );

}

export default Pagination;