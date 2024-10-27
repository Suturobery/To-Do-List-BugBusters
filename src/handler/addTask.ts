import { Task } from '../main';
import { renderAddedTask } from './render';

export const addTask = (form: HTMLFormElement, tasksArray: Array<Task>) => {
  const addTask = () => {
    let task = document.querySelector<HTMLInputElement>('#task')!.value;
    let dueDate = document.querySelector<HTMLInputElement>('#dueDate')!.value;
    let dueTime = document.querySelector<HTMLInputElement>('#dueTime')!.value;

    let newTask: Task = {
      content: task,
      date: new Date(),
      dueDate: dueDate + ' at ' + dueTime,
      checked: false,
      
    };

    if (task != '') {
      tasksArray.push(newTask);
      renderAddedTask(tasksArray);
      document.querySelector<HTMLInputElement>('#task')!.value = '';
      document.querySelector<HTMLInputElement>('#dueDate')!.value = '';
      document.querySelector<HTMLInputElement>('#dueTime')!.value = '';
    }
  };
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Task Added');
    addTask();

  });
};
