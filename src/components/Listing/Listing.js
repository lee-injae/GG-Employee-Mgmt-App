import { useState, useEffect } from "react";
import EditModal from '../EditModal/EditModal';
import DeleteModal from '../DeleteModal/DeleteModal'

import { Table, Button } from 'reactstrap';
import './listing.css'


const Listing = () => {
    const [employeeList, setEmployeeList] = useState([]);

    const [editModal, setEditModal] = useState(false);
    const [employeeUnderEdit, setEmployeeUnderEdit] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [employeeUnderDelete, setEmployeeUnderDelete] = useState(null)

    
    useEffect(() => {
        const getEmployeeList = () => {
            fetch('http://localhost:5000/employees')
            .then(res => res.json())
            .then(data => {
                setEmployeeList(data.employees)
            })
        }
        getEmployeeList()
    }, []);

    const toggleModal = (employee) => { //used for both Add and Update(edit)
        if (!editModal) {
            setEditModal(true)
            setEmployeeUnderEdit(employee)
        } else {
            setEditModal(false)
            setEmployeeUnderEdit(null)
        }
    }
  
    const toggleDeleteModal = (employee) => {
        if (!deleteModal) {
            setDeleteModal(true)
            setEmployeeUnderDelete(employee)
        } else {
            setDeleteModal(false)
            setEmployeeUnderDelete(null)
        }
    }

    const numberWithCommas =(number) => { // for better readability of salary figures
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (

        <main className="page-container">
            <header>
                <h3>G&G Outfitters Employees Listing</h3>
                <Button onClick={() => toggleModal()} color="primary">Add new</Button>
            </header>
            <Table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Salary</th>
                        <th>Hire Date</th>
                        <th>Position</th>
                        <th>Manager</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {employeeList.length === 0 
                ?
                <tbody>
                </tbody>
                :                
                <tbody>
                    {employeeList.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.first_name}</td>
                            <td>{employee.last_name}</td>
                            <td>{numberWithCommas(employee.salary)}</td>
                            <td>{employee.hire_date}</td>
                            <td>{employee.position}</td>
                            <td>{employee.manager}</td>
                            <td>
                            <Button onClick={() => toggleModal(employee)} color="primary">Edit</Button>
                            {" "}
                            <Button onClick={() => toggleDeleteModal(employee)} color="danger">Delete</Button>
                            </td>
                        </tr>)
                    )}
                </tbody>
                }
            </Table>

            <EditModal
                modal={editModal}
                toggle={toggleModal}
                employee={employeeUnderEdit}
            />
            <DeleteModal
                modal={deleteModal}
                toggle={toggleDeleteModal}
                employee={employeeUnderDelete}
            />
        </main>
    )
}

export default Listing