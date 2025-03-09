const { tasks } = require('../../task.json');
const { generateTaskUUID } = require('../../utils/tasks.util');
const { updateTasksJsonData } = require('../dbController');

const startProcessor = async () => {
  try {
    console.log('Migration started!');
    const updatedTasksData = tasks.map(task => ({
      ...task,
      id: generateTaskUUID(),
    }));
    await updateTasksJsonData(updatedTasksData);
    console.log('Migration ran successfully!');
    process.exit(1);
  } catch (error) {
    console.error('Error in updateAllIdsToUniqueIds migration --- ', error);
    process.exit(0);
  }
}

startProcessor().then();