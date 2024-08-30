// Task model
// This is the model for the Task entity
// It defines the structure of a task object
// A task has an id, title, description, and status
// The id is a unique identifier for the task
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

// TaskStatus enum
// This is an enum that defines the possible status values for a task
// A task can be OPEN, IN_PROGRESS, or DONE
// The status field of a task can only have one of these values
export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
