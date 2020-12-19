import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input
} from 'reactstrap';

const EditModal = ({ modal, toggle, employee }) => {
    if (modal) {
        return (
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    {employee
                    ?
                    `Update ${employee.first_name}'s details`
                    :
                    "Add a new employee"
                    }
                </ModalHeader>

                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="first_name">First Name</Label>
                            <Input defaultValue={employee ? employee.first_name : null}
                                type="text" 
                                name="first_name"
                                id="first_name"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="last_name">Last Name</Label>
                            <Input defaultValue={employee ? employee.last_name : null}
                                type="text" 
                                name="last_name"
                                id="last_name"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="salary">Salary</Label>
                            <Input defaultValue={employee ? employee.salary : null}
                                type="text" 
                                name="salary"
                                id="salary"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="hire_date">Hire Date</Label>
                            <Input defaultValue={employee ? employee.hire_date : null}
                                type="text" 
                                name="hire_date"
                                id="hire_date"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="position">Position</Label>
                            <Input defaultValue={employee ? employee.position : null}
                                type="text" 
                                name="position"
                                id="position"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="manager">Manager</Label>
                            <Input defaultValue={employee ? employee.manager : null}
                                type="text" 
                                name="manager"
                                id="manager"
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>

                <ModalFooter>
                    {employee 
                    ? 
                    <Button
                        color="primary"
                        onClick={() => {
                            fetch("http://localhost:5000/update_employee", {
                                method: 'PUT',
                                headers: {
                                    "Content-Type": "application/json",
                                    "Accepts": "application/json"
                                },
                                body: JSON.stringify({
                                    id: employee.id,
                                    first_name: document.getElementById("first_name").value,
                                    last_name: document.getElementById("last_name").value,
                                    salary: document.getElementById("salary").value,
                                    hire_date: document.getElementById("hire_date").value,
                                    position: document.getElementById("position").value,
                                    manager: document.getElementById("manager").value
                                })
                            })
                            .then(alert("Successfully updated"))

                            toggle()
                            window.location.reload(true)
                        }}
                    >Update</Button>
                    :
                    <Button
                        color="primary"
                        onClick={() => {
                            fetch("http://localhost:5000/add_employee", {
                                method: 'POST',
                                headers: {
                                    "Content-Type": "application/json",
                                    "Accepts": "application/json"
                                },
                                body: JSON.stringify({
                                    first_name: document.getElementById("first_name").value,
                                    last_name: document.getElementById("last_name").value,
                                    salary: document.getElementById("salary").value,
                                    hire_date: document.getElementById("hire_date").value,
                                    position: document.getElementById("position").value,
                                    manager: document.getElementById("manager").value
                                })
                            })
                            .then(res => res.json())
                            .then(
                                alert("Successfully added an employee")
                            )
                            toggle()
                            window.location.reload(true)
                        }}
                    >Add</Button>}
                    {" "}
                    <Button
                        color="secondary"
                        outline
                        onClick={toggle}
                    >Close</Button>
                </ModalFooter>
            </Modal>
        )
    } else {
        return (<div></div>)
    }
}

export default EditModal


