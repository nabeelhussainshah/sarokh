import React from 'react';
import { useEffect, useRef } from 'react';

function GlobalFilter({
    preGlobalFilteredRows,
    setGlobalFilter,
    state
}) {
    const count = preGlobalFilteredRows.length;
    // const textInput = useRef(null);

    // useEffect(() => {
    //     textInput.current.focus();
    // }, []);


    return (
        <div className="row" style={{ 'zoom': '94%' }}>
            <div className="col">
                <div className="student-search-field">
                    <h4>Search: &nbsp;<input
                        // ref={textInput}
                        value={state.globalFilter || ""}
                        onChange={e => {
                            setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
                        }}
                        placeholder={`  Total ${count} Students..`}
                        style={{
                            fontSize: "1.1rem",
                            border: "1",

                        }}
                    /></h4>

                </div>


            </div>

        </div>
    )
}

export default GlobalFilter;