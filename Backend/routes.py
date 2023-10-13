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

        return jsonify({"message":"Login Successfull","token":access_token,"role":user.role,"name":user.name}),200
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

@app.route('/admin/dashboard', methods=['GET'])
@jwt_required()
def get_project_details():

     # checking role
    if get_role()!="Admin":
        return jsonify({"message":"Not have permission to access this url"})
    
    # Count the number of projects
    num_projects = Project.query.count()

    # Count the number of team members (assuming role 'team_member')
    num_team_members = User.query.filter_by(role='Team Member').count()

    # Count the number of project managers (assuming role 'project_manager')
    num_project_managers = User.query.filter_by(role='Project Manager').count()

    # Count the number of project managers (assuming role 'project_manager')
    num_new_projects = Project.query.filter_by(project_status='New').count()


    return jsonify({
        'projects': num_projects,
        'team_members': num_team_members,
        'project_managers': num_project_managers,
        'new_projects':num_new_projects
    })
@app.route("/admin/project/new",methods=["POST"])
@jwt_required()
def create_project():

    # checking role
    if get_role()!="Admin":
        return jsonify({"message":"Not have permission to access this url"})

    data = request.get_json()
    print(data)
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
@jwt_required()
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
            'start_date': project.start_date.strftime('%Y-%m-%d'),
            'end_date': project.end_date.strftime('%Y-%m-%d'),
            'project_manager_name': project_manager.name,
            'project_manager_id':project.project_manager_id,
            'project_status':project.project_status
        }

        project_list.append(project_info)

    return jsonify({'projects': project_list}), 200

# updating project
@app.route('/admin/projects/update/<int:id>', methods=['PUT'])
@jwt_required()
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
    project.project_status = data.get('project_manager_status', project.project_status)
 

    try:
        db.session.commit()
        return jsonify({'message': 'Project updated successfully'}), 200
    except Exception as e:
        return jsonify({'message': 'Error updating project'}), 500


    
@app.route("/admin/projects/delete/<int:id>",methods=["DELETE"])
@jwt_required()
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

# list of project managers
@app.route("/admin/get-all-project-managers",methods=["GET"])
@jwt_required()
def getAllProjectManagers():
     # checking role
    if get_role()!="Admin":
        return jsonify({"message":"Not have permission to access this url"})
    
    project_managers=[]

    manager_data= User.query.filter_by(role="Project Manager").all()

    for i in manager_data:
        data={
            "id":i.id,
            "name":i.name,
        }
        project_managers.append(data)

    return jsonify({"projectManagers":project_managers})    


#------------------------------------------------- admin section -------------------------------------------
#------------------------------- Project Manager section --------------------------------------------------
# list of team members
@app.route("/manager/team-members",methods=["GET"])
@jwt_required()
def getAllTeamMembers():

      # checking role
    if get_role()!="Project Manager":
        return jsonify({"message":"Not have permission to access this url"})
    
    project_managers=[]

    manager_data= User.query.filter_by(role="Team Member").all()

    for i in manager_data:
        data={
            "id":i.id,
            "name":i.name,
            "email":i.email
        }
        project_managers.append(data)

    return jsonify({"projectManagers":project_managers})   

@app.route('/manager/projects', methods=['GET'])
@jwt_required()
def get_projects_assigned_to_user():

     # checking role
    if get_role()!="Project Manager":
        return jsonify({"message":"Not have permission to access this url"})
    
    #current users id
    current_user_id = get_jwt_identity()
    
    projects = Project.query.filter_by(project_manager_id=current_user_id).all()
    project_list = []

    for project in projects:
        project_data = {
            'id': project.id,
            'name': project.name,
            'description': project.description,
            'start_date': project.start_date.strftime('%Y-%m-%d'),
            'end_date': project.end_date.strftime('%Y-%m-%d'),
            'project_status': project.project_status
        }
        project_list.append(project_data)

    return jsonify(project_list)

#adding tasks to projects
@app.route('/manager/project/add_tasks', methods=['POST'])
@jwt_required()
def add_tasks():

         # checking role
    if get_role()!="Project Manager":
        return jsonify({"message":"Not have permission to access this url"})
    
    #current users id
    user_id = get_jwt_identity()

    try:
        data = request.get_json()
        project_id = data.get('project_id')
        tasks = data.get.get('tasks', [])
        
        # Check if the project exists
        project = Project.query.get(project_id)
        if not project:
            return jsonify({'message': 'Project not found'}), 404

        for task_data in tasks:
            user_id = task_data.get('user_id')
            status = task_data.get('status', 'New')
            due_date = task_data.get('due_date', None)
            priority = task_data.get('priority', None)

            # Check if the user exists
            user = User.query.get(user_id)
            if not user:
                return jsonify({'message': 'User not found'}), 404

            task = Task(project_id=project_id, user_id=user_id, status=status, due_date=due_date, priority=priority)
            db.session.add(task)

        db.session.commit()

        return jsonify({'message': 'Tasks added successfully'}), 201
    except Exception as e:
        return jsonify({'message': 'Error: ' + str(e)}), 500