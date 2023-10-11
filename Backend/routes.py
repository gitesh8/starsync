from app import app,db,bcrypt,jwt
from models import *
from flask import  request, jsonify
from flask_jwt_extended import (
    create_access_token, jwt_required, get_jwt_identity
)


@app.route("/start_server_for_deploy")
def start_server_for_deploy():
    return jsonify({"message":"Server Started"}),200

#------------------------------------ authentication section --------------------------------

@app.route("/role")
def get_role():
    current_user_id = get_jwt_identity()

    user = User.query.get(current_user_id) 
    return user.role



@app.route("/register",methods=['POST'])
def register_user():
    user_data = request.get_json()
    name = user_data.get("name")
    email= user_data.get("email")
    password = user_data.get("password")
    role=user_data.get("role")

    if role!="Admin" and role!="Project Manager" and role!="Team Member":
        return jsonify({"message": "Select the any one role either Admin, Project Manager and Team Member"})
    
    else:

        # checking user exist

        if User.query.filter_by(email=email).first():
            return jsonify({'message':'Email Already Exists'}),200
        
        # password hashing 
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        # creating new user
        new_user = User(name=name, email=email,password=hashed_password,role=role)
        
        try:
            db.session.add(new_user)
            db.session.commit()
            return jsonify({'message':"Registration Successfull"}),200
        except Exception as e:
            return jsonify({'message':"Error"}),500

@app.route("/login",methods=['POST'])
def user_login():
    user_data = request.get_json()

    email = user_data.get("email")
    password = user_data.get("password")

    # getting user from database
    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password,password):

        access_token = create_access_token(identity=user.id)

        return jsonify({"message":"Login Successfull","token":access_token,"role":user.role}),200
    else:
        return jsonify({"message":"Invalid Credientials"}),200
    
# dashboard routes    

#------------------------------------ authentication section ends --------------------------------

#------------------------------------ profile section --------------------------------
@app.route("/profile",methods=["POST"])
@jwt_required()
def profile():

    current_user_id = get_jwt_identity()

    user = User.query.get(current_user_id)

    return jsonify({
        "name":user.name,
        "email":user.email,
        "role":user.role
    })

#------------------------------------ profile section ends --------------------------------


#------------------------------------------------- admin section -------------------------------------------

@app.route("/admin/project/new",methods=["POST"])
@jwt_required()
def create_project():

    # checking role
    if get_role()!="Admin":
        return jsonify({"message":"Not have permission to access this url"})

    data = request.json()

    # userdetails

    name = data.get('name')
    description = data.get('description')
    start_date = data.get('start_date')
    end_date = data.get('end_date')
    project_manager_id = data.get('project_manager_id')

    #creating the project

    new_project= Project(name=name, description=description, start_date=start_date,end_date=end_date,project_manager_id=project_manager_id)


    try:
        db.session.add(new_project)
        db.session.commit()
        return jsonify({"message":"Project Created Successfully"}),201
    except Exception as e:
        return jsonify({"message":"An Error occurred, Please Try Again"}),500

# get all projects
@app.route('/admin/projects', methods=['GET'])
def get_projects():

    # checking role
    if get_role()!="Admin":
        return jsonify({"message":"Not have permission to access this url"})
    
    projects = Project.query.all()

    project_list = []

    for project in projects:
        project_manager = User.query.get(project.project_manager_id)

        project_info = {
            'id': project.id,
            'name': project.name,
            'description': project.description,
            'start_date': project.start_date,
            'end_date': project.end_date,
            'project_manager_name': project_manager.name,
            'project_manager_id':project.project_manager_id
        }

        project_list.append(project_info)

    return jsonify({'projects': project_list}), 200

# updating project
@app.route('/admin/projects/update/<int:id>', methods=['PUT'])
def update_project():

    # checking role
    if get_role()!="Admin":
        return jsonify({"message":"Not have permission to access this url"})
    

    project = Project.query.get(id)

    if not project:
        return jsonify({"message":"Invalid Project Id"}),404

    data = request.get_json()

    project.name = data.get('name', project.name)
    project.description = data.get('description', project.description)
    project.start_date = data.get('start_date', project.start_date)
    project.end_date = data.get('end_date', project.end_date)
    project.project_manager_id = data.get('project_manager_id', project.project_manager_id)
 

    try:
        db.session.commit()
        return jsonify({'message': 'Project updated successfully'}), 200
    except Exception as e:
        return jsonify({'message': 'Error updating project'}), 500


    
@app.route("/admin/projects/delete/<int:id>",methods=["DELETE"])
def delete_project(id):
    
    # checking role
    if get_role()!="Admin":
        return jsonify({"message":"Not have permission to access this url"})
    
    project = Project.query.get(id)
    if not project:
        return jsonify({'message': 'Project not found'}), 404

    db.session.delete(project)
    db.session.commit()
    return jsonify({'message': 'Project deleted successfully'}), 200


#------------------------------------------------- admin section -------------------------------------------
