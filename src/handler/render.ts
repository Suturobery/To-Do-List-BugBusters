import { Task } from '../main';
import { saveStorage } from './localStorage';
import { removeTask } from './removeTask';
import { sortTasksByName, sortTasksByDueDate } from './sortTask'; // Import the sorting functions
// import { editTask } from './editTask';

const makeTask = (tasksArray: Array<Task>, itemIndex: number) => {
  // the tasks list
  const tasks = document.querySelector<HTMLUListElement>('#tasksList');

  // the content of the task
  const currentItemValue = tasksArray[itemIndex].content;
  const currentDate = tasksArray[itemIndex].date;
  const currentItemDueDate = tasksArray[itemIndex].dueDate;
  const currentChecked = tasksArray[itemIndex].checked;

  // the making of tags and where the task will be placed
  let taskTab = document.createElement('li');
  const taskBGColor = 'bg-fifth';
  const taskDesign =
    'flex flex-row justify-evenly items-center relative w-full text-gray-50 list-none m-0 rounded p-2 ';
  taskTab.className = taskDesign;
  taskTab.classList.add(taskBGColor);

  // when a task is done
  taskTab.addEventListener('click', () => {
    taskTab.classList.toggle('line-through'); // text strikethrough
    taskTab.classList.toggle('text-[rgba(5,22,53,0.564)]');

    if (taskTab.classList.contains('line-through')) {
      editButton.disabled = true;
      editButton.classList.add('opacity-10', 'cursor-not-allowed'); // Add visual feedback
    } else {
      editButton.disabled = false;
      editButton.classList.remove('opacity-50', 'cursor-not-allowed'); // Remove visual feedback
    }
  });


  // this is for the due date checking
  let dateText = '';
  if (currentItemDueDate !== '') {
    dateText = 'Due Date: ' + currentItemDueDate.replace('T', ' ');
    console.log(dateText);
    if (new Date(currentItemDueDate) < currentDate!) {
      // ADD A DESIGN WHEN THE TASK IS ALREADY PASS ITS DUE DATE
      // change this to change the bg color when due
      const dueBGColor = 'bg-red-700';
      taskTab.classList.remove(taskBGColor);
      taskTab.classList.add(dueBGColor);
    }
  }

  

  // this is for the finished checking
  if (currentChecked === true) {
    // change this to change the bg color when checked
    const checkedBGColor = 'bg-green-500';
    taskTab.classList.remove(taskBGColor);
    taskTab.classList.add(checkedBGColor);
  }

  // Finalizing of Data
  const taskText = document.createElement('p');
  taskText.innerHTML = currentItemValue;
  const taskDueDate = document.createElement('p');
  taskDueDate.innerHTML = dateText;

  const remove = document.createElement('span'); // Remove Button
  remove.className = 'absolute right-5 cursor-pointer';
  remove.innerHTML = '✖';

  const editButton = document.createElement('button');
  editButton.innerHTML = 'Edit';
  editButton.className = 'edit-button';
  editButton.style.color = 'white';
  editButton.style.backgroundColor = 'transparent';

  //edit
  const editTask = (
    taskTab: HTMLElement,
    tasksArray: Array<Task>,
    itemIndex: number,
    taskText: HTMLElement,
    taskDueDate: HTMLElement
  ) => {
    // Create input fields for editing
    const taskInput = document.createElement('input');
    taskInput.value = tasksArray[itemIndex].content;
    taskInput.style.color = 'white';
    taskInput.style.backgroundColor = 'transparent';

    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.value = tasksArray[itemIndex].dueDate.split('T')[0];
    dateInput.style.color = 'white';
    dateInput.style.backgroundColor = 'transparent';

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
      tasksArray[itemIndex].dueDate = dateInput.value;

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
        taskTab.classList.remove('bg-', 'bg-green-500');
        taskTab.classList.add('bg-red-700'); // Change to red if past
      } else {
        console.log('The due date is valid.');
        taskTab.classList.remove('bg-red-700');
        taskTab.classList.add('bg-first'); // Change back to default if valid
      }

      // Finalize the task display
      taskTab.innerHTML = ''; // Clear the inner HTML
      taskTab.appendChild(taskText);
      taskTab.appendChild(taskDueDate);

      // Create the remove button
      const remove = document.createElement('span');
      remove.className = 'absolute right-5 cursor-pointer';
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
      remove.addEventListener('click', () => {
        removeTask(remove, tasksArray);
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

  // Then in your makeTask function, replace the editButton event listener with:
  editButton.addEventListener('click', () => {
    editTask(taskTab, tasksArray, itemIndex, taskText, taskDueDate);
  });

  remove.addEventListener('click', () => {
    removeTask(remove, tasksArray);
  });
  taskTab.appendChild(taskText);
  taskTab.appendChild(taskDueDate);
  taskTab.appendChild(remove);
  taskTab.appendChild(editButton);
  tasks?.appendChild(taskTab);
};

export const renderTasks = (tasksArray: Array<Task>) => {
  const taskList = document.getElementById('tasksList') as HTMLElement;

  // Helper function to render all tasks
  const renderAllTasks = (tasksArray1: Array<Task>) => {
    taskList.innerHTML = ''; // Clear existing tasks

    tasksArray1.forEach((_task, index) => {
      makeTask(tasksArray, index); // Re-render tasks
    });
  };
  // Create sorting buttons
  const sortButtonContainer = document.createElement('div');
  sortButtonContainer.id = 'sortButtonContainer';
  sortButtonContainer.className = 'my-4';

  sortButtonContainer.innerHTML = `
    <div class = text-center items-left <h3 class = "text-sm text-first rounded-md"> Sort by: </h3>
    <button id="sortByName" class="px-2 py-1 text-sm text-first rounded-md hover:text-fifth">Name</button> |
    <button id="sortByDate" class="px-2 py-1 text-sm text-first rounded-md hover:text-fifth">Due Date</button>
    </div>
`;

  // Insert the buttons at the top of the task list
  const tasksListParent = taskList.parentElement;
  if (tasksListParent) {
    if (!document.getElementById('sortButtonContainer')) {
      tasksListParent.insertBefore(sortButtonContainer, taskList);
    }
  }

  // Add event listeners for sorting buttons
  document.getElementById('sortByName')?.addEventListener('click', () => {
    tasksArray = sortTasksByName(tasksArray);
    renderAllTasks(tasksArray); // Re-render sorted tasks
  });

  document.getElementById('sortByDate')?.addEventListener('click', () => {
    tasksArray = sortTasksByDueDate(tasksArray);
    renderAllTasks(tasksArray); // Re-render sorted tasks
  });

  renderAllTasks(tasksArray); // Initial rendering of tasks
};

export const renderAddedTask = (tasksArray: Array<Task>) => {
  makeTask(tasksArray, tasksArray.length - 1);
  saveStorage(tasksArray);
  renderTasks(tasksArray);
};
