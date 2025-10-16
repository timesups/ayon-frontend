// add shortPath (description)
// add icons
// add thumbnailUrl

import type {
  GetKanbanResponse,
  KanbanNode,
  Status,
  TaskType,
  AttributeEnumItem,
} from '@shared/api'
import { $Any } from '@/types'

type ProjectsInfo = {
  [key: string]: $Any
}

type ExtraInfo = {
  taskInfo: TaskType
  statusInfo: Status
  priorityInfo: AttributeEnumItem | undefined
}

export interface TransformedKanbanTask extends KanbanNode, ExtraInfo {
  thumbnailUrl: string | null
}

const transformKanbanTasks = (
  tasks: GetKanbanResponse,
  {
    projectsInfo,
    priorities,
    isLoadingTasks,
  }: { projectsInfo: ProjectsInfo; priorities: AttributeEnumItem[]; isLoadingTasks: boolean },
): TransformedKanbanTask[] => {
  // if is loading return an empty array
  if (isLoadingTasks) return []

  return tasks.map((task) => {
    const projectInfo = projectsInfo[task.projectName]

    const taskInfo: TaskType = projectInfo?.taskTypes?.find(
      (type: $Any) => type.name === task.taskType,
    )

    const statusInfo: Status = projectInfo?.statuses?.find(
      (statusItem: $Any) => statusItem.name === task.status,
    )

    const priorityInfo: AttributeEnumItem | undefined = priorities.find(
      // TODO: fix this when real data is available
      (priorityItem) => priorityItem.value === task.priority,
    )

    return {
      ...task,
      thumbnailUrl: `/api/projects/${task.projectName}/tasks/${task.id}/thumbnail?updatedAt=${task.updatedAt}`,
      statusInfo,
      taskInfo,
      priorityInfo,
    }
  })
}

export default transformKanbanTasks
