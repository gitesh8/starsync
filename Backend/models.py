from app import db

# User Model
class User(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120),unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(70),nullable = False)

    def __repr__(self):
        return f"User('{self.name}','{self.email}')"
    
# Project Model
class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    project_manager_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    project_status=db.Column(db.String(255), nullable=True, default='New')

# Task Model
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    status = db.Column(db.String(20), nullable=False, default='New')
    due_date = db.Column(db.Date, nullable=True)
    priority = db.Column(db.String(20), nullable=True)
