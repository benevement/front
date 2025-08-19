import { ITasks } from "../interfaces/ITasks";

export const fakeTasks: ITasks[] = [
    {
        id: 1,
        name: "Billetterie Lorient",
        description: "s'occuper de la billeterie toute la journée",
        start_date: "2025-09-22",
        end_date: "2025-09-23",
        created_at: "2023-04-20",
        updated_at: "2024-05-21",
        event_id: 1,
        address_id: 1,
        created_by_id: 1
    },
    {
        id: 2,
        name: "Nett parking",
        description: "Nettoyer le parking à la fin du concert",
        start_date: "2025-09-22",
        end_date: "2025-09-23",
        created_at: "2025-04-20",
        updated_at: "2025-05-25",
        event_id: 2,
        address_id: 2,
        created_by_id: 1
    },
    {
        id: 3,
        name: "Sonorisation",
        description: "Installer le matériel et gérer la prestation dans l'après-midi.",
        start_date: "2025-10-12",
        end_date: "2025-10-12",
        created_at: "2025-08-18",
        updated_at: "2025-08-18",
        event_id: 3,
        address_id: 3,
        created_by_id: 2
    },
    
    {
        id: 4,
        name: "Buvette",
        description: "Servir des boissons : être majeur.",
        start_date: "2025-10-12",
        end_date: "2025-10-12",
        created_at: "2025-08-18",
        updated_at: "2025-08-18",
        event_id: 3,
        address_id: 3,
        created_by_id: 2
    },
    {
        id: 5,
        name: "Cathering",
        description: "Préparer les entrées pour 15 personnes",
        start_date: "2025-10-12",
        end_date: "2025-10-12",
        created_at: "2025-08-18",
        updated_at: "2025-08-18",
        event_id: 3,
        address_id: 3,
        created_by_id: 2
    }

]

/*
export interface ITasks  {
    id: number;
    name: string;
    description: string;
    start_date: DateString;
    end_date: DateString;
    created_at: DateString;
    updated_at?: DateString;
    address_id: number; 
    event_id?: number;
    created_by_id?: number;    
    // event?: IEvents;
    // user?: UserInterface;
}
*/