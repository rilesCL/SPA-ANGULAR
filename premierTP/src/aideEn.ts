export const aideEN = `{
    "application": {
      "name": "Time Capture Application",
      "description": "A web application developed with Angular to capture and manage time spent on projects, featuring functionalities such as time entry, a quick capture widget, time category management, and custom reports.",
      "views": [
        {
          "name": "Time Entry View",
          "functionality": "Allows the user to log time spent on a specific project or task.",
          "components": {
            "projectSelection": "Dropdown menu to select the project or task.",
            "startTime": "Field to enter the start time of the work.",
            "endTime": "Field to enter the end time of the work.",
            "totalDuration": "Automatic calculation of total duration or manual entry.",
            "notes": "Optional field to add comments on the activity."
          },
          "operation": [
            "Select a project or task from the dropdown menu.",
            "Enter start and end times, or let the duration calculate automatically.",
            "Add notes if needed.",
            "Click the 'Save' button to record the information."
          ]
        },
        {
          "name": "Widget View",
          "functionality": "A small floating window to capture time in real-time, convenient for timed tasks.",
          "components": {
            "startStopButton": "Button to start and stop the time recording.",
            "timeCounter": "Displays the elapsed time since the session started in real-time.",
            "projectSelector": "Quick selector to indicate the project or task being worked on."
          },
          "operation": [
            "Open the Widget from the corner of the application.",
            "Click 'Start' to begin timing.",
            "Use the selector to indicate the project or task you are working on.",
            "Click 'Stop' when done. The time is saved automatically."
          ]
        },
        {
          "name": "Time Category Management",
          "functionality": "Allows the user to define and manage time categories.",
          "components": {
            "categoryList": "Displays current categories with options to edit and delete.",
            "addCategory": "Field to create a new category.",
            "categoryActions": "Buttons to edit or delete existing categories."
          },
          "operation": [
            "Enter the name of the new category and click 'Add'.",
            "Use the edit or delete buttons next to each category to manage entries.",
            "Categories can be associated with time logs."
          ]
        },
        {
          "name": "Reports Pages",
          "functionality": "Provides detailed reports of captured time, organized by project, task, or category.",
          "reportTypes": [
            "Project Report",
            "Task Report",
            "Time Category Report"
          ],
          "components": {
            "dateFilters": "Allows selecting a date range to filter the reports.",
            "projectCategoryFilters": "Refine results by project or category.",
            "export": "Reports can be exported in PDF or Excel format."
          },
          "operation": [
            "Access the reports page through the main menu.",
            "Select the desired report type.",
            "Use the filters to narrow down the data.",
            "Review the report and export if needed."
          ]
        }
      ]
    }
  }
  `;
  