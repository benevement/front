import { IEvents } from "../interfaces/IEvents";

export const fakeEvents: IEvents[] = [
    {
        id: 1,
        name: "concert Lorient",
        description: "suite du festival interceltique",
        event_date: "2025-09-22",
        max_participants: 3200,
        end_invitation_date: "2025-08-27",
        status: 'created',
        created_at: "2023-04-20",
        updated_at: "2024-05-21",
        address_id: 1,
        created_by_id: 1
    },
    {
        id: 2,
        name: "concert Madrid",
        description: "le second concert",
        event_date: "2025-09-23",
        max_participants: 1100,
        end_invitation_date: "2025-08-28",
        status: 'created',
        created_at: "2025-04-20",
        updated_at: "2025-05-21",
        address_id: 2,
        created_by_id: 2
    },
    {
        id: 3,
        name: "concert Lyon",
        description: "le concert lyonnais",
        event_date: "2025-09-26",
        max_participants: 5100,
        end_invitation_date: "2025-09-10",
        status: 'published',
        created_at: "2025-06-11",
        updated_at: "2025-07-21",
        address_id: 4,
        created_by_id: 3
    }
]