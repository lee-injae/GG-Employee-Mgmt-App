from flask import Blueprint, jsonify, request
from api import db
from models import Employee
from flask_cors import cross_origin


main = Blueprint('main', __name__)

@main.route('/add_employee', methods=['POST'])

def add_employee():
    employee_data = request.get_json()

    new_employee = Employee(first_name=employee_data['first_name'],
                            last_name=employee_data['last_name'],
                            salary=employee_data['salary'],
                            hire_date=employee_data['hire_date'],
                            position=employee_data['position'],
                            manager=employee_data['manager'])

    db.session.add(new_employee)
    db.session.commit()

    return 'Added successfully', 201 

@main.route('/employees', methods=['GET'])
def employees():
    employees_list = Employee.query.all()
    employees = []

    for employee in employees_list:
        employees.append({'id': employee.id,
                        'first_name': employee.first_name, 
                        'last_name': employee.last_name, 
                        'salary': employee.salary, 
                        'hire_date': employee.hire_date, 
                        'position': employee.position, 
                        'manager': employee.manager})

    return jsonify({'employees': employees})


@main.route('/delete_employee', methods=['DELETE'])
@cross_origin(origin="*", headers=['Content-Type'])
def delete_employee():
    employee_data = request.get_json()
    Employee.query.filter_by(id=employee_data['id']).delete()
    db.session.commit()

    return 'Deleted successfully', 204 

@main.route('/update_employee', methods=['PUT'])
@cross_origin(origin="*", headers=['Content-Type'])
def update_employee():
    employee_data = request.get_json()
    Employee.query.filter_by(id=employee_data['id']).update(dict(first_name=employee_data['first_name'], last_name=employee_data['last_name'], salary=employee_data['salary'], hire_date=employee_data['hire_date'], position=employee_data['position'], manager=employee_data['manager']))
    db.session.commit()

    return 'Updated successfully', 200