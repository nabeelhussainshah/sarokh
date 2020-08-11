import React from 'react';
import { useState } from 'react';
import {
	useTable,
	usePagination,
	useGlobalFilter,
	useSortBy,
} from 'react-table';
import GlobalFilter from './globalfilter';
import Pagination from './pagination';
import { toast } from 'react-toastify';

function GenericTable({
	columns,
	data,
	filter,
	pagination,
	form,
	style,
	hiddenColumns = [],
	updateMyData,
	skipPageReset,
	editablecolumn,
	pagesize = 6,
	tableclass = '',
}) {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		rows,
		prepareRow,
		canPreviousPage,
		canNextPage,
		nextPage,
		previousPage,
		setPageSize,
		pageOptions,
		state,
		preGlobalFilteredRows,
		setGlobalFilter,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
			initialState: {
				pageIndex: 0,
				pageSize: pagesize,
				hiddenColumns: hiddenColumns,
			},
			autoResetPage: !skipPageReset,
			updateMyData,
		},
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	const count = preGlobalFilteredRows.length;
	return (
		<>
			{filter === true ? (
				<GlobalFilter
					preGlobalFilteredRows={preGlobalFilteredRows}
					setGlobalFilter={setGlobalFilter}
					state={state}
				/>
			) : null}
			{/* //table section */}

			<div className={tableclass} style={null}>
				<table {...getTableProps()}>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th
										style={column.style}
										{...column.getHeaderProps(column.getSortByToggleProps())}
									>
										{column.render('Header')}
										<span>
											{column.isSorted ? (
												column.isSortedDesc ? (
													<>
														&nbsp;
														<i className="fa fa-arrow-down" />
													</>
												) : (
													<>
														&nbsp;
														<i className="fa fa-arrow-up" />
													</>
												)
											) : (
												''
											)}
										</span>
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{page.map((row) => {
							prepareRow(row);
							return (
								<tr key={123} {...row.getRowProps()}>
									{row.cells.map((cell) => {
										return (
											<td {...cell.getCellProps()} onClick={() => {}}>
												{cell.render('Cell')}
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>


			{/* //pagination section */}

			{pagination === true ? (
				<Pagination
					pageOptions={pageOptions}
					pageIndex={pageIndex}
					canPreviousPage={canPreviousPage}
					canNextPage={canNextPage}
					previousPage={previousPage}
					nextPage={nextPage}
					pageSize={pageSize}
					state={state}
					setPageSize={setPageSize}
				/>
			) : null}
		</>
	);
}

export default GenericTable;
