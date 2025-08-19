// correspond à la table de liaison user_task
// qui fait le lien entre user et task

import { user_taskType } from "../interfaces/types";

export const fakeUser_task: user_taskType[] = [
    { task_id: 1, user_id: 1 },
    { task_id: 1, user_id: 2 },
    { task_id: 1, user_id: 89 },
    { task_id: 2, user_id: 1  },
    { task_id: 2, user_id: 4  },
    { task_id: 3, user_id: 89  },
    { task_id: 4, user_id: 89 },
    { task_id: 5, user_id: 2  }
]
