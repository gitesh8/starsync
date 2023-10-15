export interface ProjectEdit {
    project: {
        description: string,
        end_date: string,
        id: number,
        name: string,
        project_status: string,
        start_date: string
    },
    tasks: [
        {
            due_date: string,
            member_name: string,
            priority:string,
            status: string,
            task_id: number,
            user_email: string,
            name:string
        }
    ]
}
