# Project Management System

### Setup
- Create tables to database.

```
$ psql <db_name> <db_user> -f backend/query/schema.sql
```

- Populate tables with initial data.

```
$ psql <db_name> <db_user> -f backend/query/seed.sql
```

### Endpoints

1. users ```/api/users/```
   - login ```/api/users/login```
   - register ```/api/users/register```

2. projects ```/api/projects/```
3. tasks ```/api/projects/{project_id}/tasks/```
4. comments ```/api/projects/{project_id}/tasks/{task_id}/comments```