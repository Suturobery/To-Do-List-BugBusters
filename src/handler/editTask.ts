import { Task } from '../main';
import { saveStorage } from './localStorage';
export const editTask = (
    taskTab: HTMLElement,
    tasksArray: Array<Task>,
    itemIndex: number,
    taskText: HTMLElement,
    taskDueDate: HTMLElement
  ) => {
    // Create input fields for editing
    const taskInput = document.createElement('input');
    taskInput.value = tasksArray[itemIndex].content;
    taskInput.style.color = 'black';

    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.value = tasksArray[itemIndex].dueDate.split('T')[0];
    dateInput.style.color = 'black';

    // Clear the taskTab for editing
    taskTab.innerHTML = '';
    taskTab.appendChild(taskInput);
    taskTab.appendChild(dateInput);

    // Create the update button
    const updateButton = document.createElement('button');
    updateButton.innerHTML = 'Update';
    updateButton.style.color = 'white';
    updateButton.style.backgroundColor = 'transparent';

    updateButton.addEventListener('click', () => {
      // Update the task content and due date
      tasksArray[itemIndex].content = taskInput.value;
      tasksArray[
        itemIndex].dueDate = dateInput.value;

      // Update the display text
      taskText.innerHTML = taskInput.value;
      taskDueDate.innerHTML = dateInput.value
        ? 'Due Date: ' + dateInput.value
        : '';

      // Check if the new due date is in the past
      const newDueDate = new Date(dateInput.value);
      const currentDate = new Date();

      if (newDueDate < currentDate) {
        console.log('The due date is in the past.');
        taskTab.classList.remove('bg-slate-800', 'bg-green-500');
        taskTab.classList.add('bg-red-700'); // Change to red if past
      } else {
        console.log('The due date is valid.');
        taskTab.classList.remove('bg-red-700');
        taskTab.classList.add('bg-slate-800'); // Change back to default if valid
      }

      // Finalize the task display
      taskTab.innerHTML = ''; // Clear the inner HTML
      taskTab.appendChild(taskText);
      taskTab.appendChild(taskDueDate);

      // Create the remove button
      const remove = document.createElement('span');
      remove.className = 'absolute right-5';
      remove.innerHTML = '✖';
      remove.style.color = 'white';
      taskTab.appendChild(remove);

      // Create the edit button
      const editButton = document.createElement('button');
      editButton.innerHTML = 'Edit';
      editButton.className = 'edit-button';
      editButton.style.color = 'white';
      editButton.style.backgroundColor = 'transparent';

      // Add event listener to the edit button
      editButton.addEventListener('click', () => {
        editTask(taskTab, tasksArray, itemIndex, taskText, taskDueDate);
      });

      taskTab.appendChild(editButton);
      taskText.style.color = 'white';
      taskDueDate.style.color = 'white';

      // Save the updated tasks array to local storage
      saveStorage(tasksArray);
    });

    // Append the update button to the taskTab
    taskTab.appendChild(updateButton);
  };
