import React, { useState } from 'react'
import { useTable, useAsyncDebounce, useSortBy, useGlobalFilter } from 'react-table'
import dayjs from 'dayjs'
import './modal.css'
import { Modal, useFetch, Error, Loading, NoRecord } from '../components'

/**
 * https://github.com/public-apis/public-apis
 * CORS policy: No 'Access-Control-Allow-Origin' header
 */

function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value1 => {
    setGlobalFilter(value1 || undefined)
  }, 200)

  return (
    <div>
      <input
        type="search"
        value={value || ''}
        onChange={e => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
        placeholder={`Search type, date, location in ${count} records...`}
        style={{
          fontSize: '1.1rem',
          border: '0',
          width: '500px',
          margin: '10px',
        }}
      />
    </div>
  )
}

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy)

  return (
    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
      <thead>
        <tr>
          <th
            colSpan={visibleColumns.length}
            style={{
              textAlign: 'left',
            }}
          >
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </th>
        </tr>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                style={{
                  borderBottom: 'solid 3px red',
                  background: 'aliceblue',
                  color: 'black',
                  fontWeight: 'bold',
                }}
              >
                {column.render('Header')}
                <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td
                  {...cell.getCellProps()}
                  style={{
                    padding: '10px',
                    border: 'solid 1px gray',
                    background: 'papayawhip',
                  }}
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

/**
 * query: input display (trailing input)
 * search: debounce
 * detailItem: modal detail
 */
export default function () {
  const [query, setQuery] = useState('node')
  const [search, setSearch] = useState(query)
  const [isOpen, setIsOpen] = useState(false)
  const [detailItem, setDetailItem] = useState(null)

  const { loading, error, data } = useFetch(search ? `/api/github/${search}` : '')

  function toggleModal(event) {
    if (!isOpen) {
      const selected = data?.find(item => item.id.toString() === event.target.id.toString())
      setDetailItem(selected)
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }

  const columns = [
    {
      Header: '#',
      id: 'row',
      maxWidth: 50,
      filterable: false,
      Cell: row => <div>{parseInt(row.row.id, 10) + 1}</div>,
    },
    {
      Header: 'Type',
      accessor: 'type',
    },
    {
      Header: 'Date',
      accessor: d => dayjs(d.created_at).format('YYYY-MMM-DD'),
    },
    {
      Header: 'Company',
      accessor: d => (
        <a href={d.company_url} target="__blank">
          {d.company}
        </a>
      ),
    },
    {
      Header: 'Location',
      accessor: 'location',
    },
    {
      Header: 'Title',
      accessor: d => (
        <>
          <button type="button" onClick={toggleModal} id={d.id}>
            👉 {d.title}
          </button>
        </>
      ),
    },
  ]

  const debounceSearch = useAsyncDebounce(() => {
    if (query) {
      setSearch(query.toLowerCase().trim())
    }
  }, 500)

  const handleChange = event => {
    const query1 = event.target.value
    setQuery(query1)
    debounceSearch()
  }

  const handleSubmit = event => {
    debounceSearch()
    event.preventDefault()
  }

  return (
    <div className="github">
      <div className="search-header">
        <h4>Dialog, Sortable, Filterable, Debounce</h4>
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            value={query || ''}
            onChange={handleChange}
            placeholder="search github"
            className="search"
          />
          <button type="submit">🔎</button>
        </form>
        <h5 style={{ marginLeft: '1rem' }}>current search: {search}</h5>
      </div>
      {loading && <Loading />}
      {error && <Error />}
      {data?.length === 0 && <NoRecord />}
      {data?.length > 0 && <Table columns={columns} data={data} />}
      {isOpen && detailItem && <Modal isOpen={isOpen} toggleModal={toggleModal} item={detailItem} />}
    </div>
  )
}
