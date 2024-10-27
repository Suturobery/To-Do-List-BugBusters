import { addTask } from './handler/addTask';
// import { saveStorage } from './handler/localStorage'; 
import { renderTasks } from './handler/render';

export const storageKey = 'tasks';
export type Task = {
  content: string;
  date: Date | null;
  dueDate: string;
  checked: boolean;
};

// saveStorage([]); // To keep the storage clean while testing

const storage = JSON.parse(localStorage.getItem(storageKey)!);

const tasksArray = storage == null ? [] : storage;
if (tasksArray.length !== 0) {
  renderTasks(tasksArray);
}

addTask(document.querySelector<HTMLFormElement>('#inputTab')!, tasksArray);
