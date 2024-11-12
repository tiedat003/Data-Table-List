import TableForm from '../components/TableForm'
import { dataSource } from '../components/data';
const TablePage = () => {
    return (
        <TableForm rows={dataSource} />
    )
}

export default TablePage;

