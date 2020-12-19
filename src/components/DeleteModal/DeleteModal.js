import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

const DeleteModal = ({ modal, toggle, employee }) => {
    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                Delete employee
            </ModalHeader>

            <ModalBody>
                {employee && 
                <p>Are you sure you want to permanently delete {" "}
                    {employee.first_name} {employee.last_name}'s record?'
                </p>
                }
            </ModalBody>

            <ModalFooter>
                <Button
                    outline
                    color="outline"
                    onClick={() => toggle()}
                >Cancel</Button>
                {" "}
                <Button 
                    color="danger"
                    onClick={() => {
                        fetch("http://localhost:5000/delete_employee", {
                            method: 'DELETE',
                            headers: {
                                "Content-Type": "application/json",
                                "Accepts": "application/json"
                            },
                            body: JSON.stringify({
                                id: employee.id
                            })
                        })
                        .then(
                            alert("Deleted successfully")
                        )
                        toggle()
                        window.location.reload(true)
                    }}
                >Delete</Button>
            </ModalFooter>
        </Modal>
    )
}

export default DeleteModal