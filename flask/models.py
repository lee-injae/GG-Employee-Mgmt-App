from api import db  

class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(20))
    last_name = db.Column(db.String(20))
    salary = db.Column(db.Integer) 
    hire_date = db.Column(db.String(30))
    position = db.Column(db.String(20))
    manager = db.Column(db.String(40))
