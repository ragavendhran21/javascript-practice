import { useState } from "react"

const dynamicTable = () => {

  const [sortfield,setSortField] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchTerm, setSearchTerm] = useState([]);

  const columns = Object.keys(data[0]);

    return(
        <table>
            <thead>
                <tr>
                 {columns.map(column => (
                    <th key={column} >
                       {column}
                    </th>
                 ))}
                </tr>
            </thead>
            <tbody>
              {data.map(row => (
                <tr key={row.id}>{columns.map(columns => (
                    <td key={`${row.id}-${column.key}`}>{row[column.key]}</td>
                ))}
                </tr>
              ))}
            </tbody>
        </table>
    );
};