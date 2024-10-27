import { Task } from '../main';
import { saveStorage } from './localStorage';
import { renderTasks } from './render';


export const removeTask = (button: HTMLSpanElement, taskArray: Array<Task>) => {
  let taskTab = button.parentElement!;
  let uListChildren = Array.from(taskTab.parentElement?.children!);
  let targetIndex = uListChildren.indexOf(taskTab);

  taskArray.splice(targetIndex, 1);
  saveStorage(taskArray);
  renderTasks(taskArray);
};
