const { difference } = require("lodash")

const requiredKeysWithType = {
  title: 'string',
  description: 'string',
  completed: 'boolean',
  priority: 'string',
}
const requiredKeys = Object.keys(requiredKeysWithType);
const validKeys = [...requiredKeys];

const validateTaskBody = (taskBody, partial = false) => {
  const availableKeys = Object.keys(taskBody);
  const invalidKeys = difference(availableKeys, validKeys);
  if (invalidKeys.length > 0) {
    return { isValid: false, reason: `Invalid payload: unsupported "${invalidKeys.join(', ')}" key(s)!` }
  }
  const missingKeys = difference(requiredKeys, availableKeys);
  if (!partial && missingKeys.length > 0) {
    return { isValid: false, reason: `Invalid payload: missing "${missingKeys.join(', ')}" key(s)!` }
  }
  for (key of availableKeys) {
    const type = requiredKeysWithType[key];
    if (typeof taskBody[key] !== type) {
      return { isValid: false, reason: `Invalid payload: "${key}" must be ${type}!` };
    }
    if (type === 'string' && taskBody[key] === '') {
      return { isValid: false, reason: `Invalid payload: "${key}" must not be empty!` };
    }
    if (key === 'priority' && !['low', 'medium', 'high'].includes(taskBody[key])) {
      return { isValid: false, reason: `Invalid payload: "${key}" must be in (low, medium, high)!` };
    }
  }
  return { isValid: true };
}

module.exports = {
  validateTaskBody,
}