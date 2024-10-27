import { Task } from "../main";

// Function to sort tasks by name
export const sortTasksByName = (tasksArray: Array<Task>): Array<Task> => {
  return [...tasksArray].sort((a, b) => {
    const nameA = a.content.toLowerCase();
    const nameB = b.content.toLowerCase();
    return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
  });
};

// Function to sort tasks by due date
export const sortTasksByDueDate = (tasksArray: Array<Task>): Array<Task> => {
  return [...tasksArray].sort((a, b) => {
    const dateA = new Date(a.dueDate).getTime();
    const dateB = new Date(b.dueDate).getTime();
    return dateA - dateB;
  });
};
