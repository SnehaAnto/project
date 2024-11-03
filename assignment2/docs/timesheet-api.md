# Timesheet API Documentation

## Base URL
`http://localhost:3001/timesheet`

## Endpoints

### Create Timesheet
- **URL**: `/`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "date": "string",
    "hours": "number",
    "description": "string",
    "project": "string"
  }
  ```
- **Success Response**:
  - **Code**: 201
  - **Content**:
    ```json
    {
      "id": "string",
      "date": "string",
      "hours": "number",
      "description": "string",
      "project": "string",
    }
    ```

### Get All Timesheets
- **URL**: `/`
- **Method**: `GET`
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    [
      {
        "id": "string",
        "date": "string",
        "hours": "number",
        "description": "string",
        "project": "string",
      }
    ]
    ```

### Delete Timesheet
- **URL**: `/:id`
- **Method**: `DELETE`
- **URL Parameters**:
  - `id`: Timesheet ID
- **Success Response**:
  - **Code**: 200
  - **Content**: 
    ```json
    {
        "id": "string",
        "date": "string",
        "hours": "number",
        "description": "string",
        "project": "string",
      }
    ```

### Update Timesheet
- **URL**: `/:id`
- **Method**: `PUT`
- **URL Parameters**:
  - `id`: Timesheet ID
- **Body**:
  ```json
  {
    "date": "string",
    "hours": "number",
    "description": "string",
    "project": "string"
  }
  ```
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "id": "string",
      "date": "string",
      "hours": "number",
      "description": "string",
      "project": "string",
    }
    ```