import { storageKey, Task } from '../main';

export const saveStorage = (taskArray: Array<Task>) => {
  const taskArrayStringify = JSON.stringify(taskArray);
  localStorage.setItem(storageKey, taskArrayStringify);
};

