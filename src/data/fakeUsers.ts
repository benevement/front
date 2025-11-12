import UserInterface from "../interfaces/IUser"

const fakeUsers: UserInterface[]  = [

    {
        id: 1,
        first_name: "Michel",
        last_name: "Gondry",
        birthdate: new Date("1963-05-08"),
        email: "mgondry@gameover.com",
        password: "Toto12345",
        phone_number: "0294234757",
        role: "volunteer",
    },
        {
        id: 2,
        first_name: "Paul",
        last_name: "Presboit",
        birthdate: new Date("1927-02-21"),
        email: "pb@gameover.com",
        password: "Toto12345",
        phone_number: "0394234758",
        role: "volunteer",
    },
        {
        id: 3,
        first_name: "Sylvie",
        last_name: "Joly",
        birthdate: new Date("1934-10-18"),
        email: "sjojo@gameover.com",
        password: "Toto12345",
        phone_number: "0194234757",
        role: "admin",
    },
        {
        id: 4,
        first_name: "Leonard",
        last_name: "Cohen",
        birthdate: new Date("1934-09-21"),
        email: "lcoco@gameover.com",
        password: "Toto12345",
        phone_number: "0594234667",
        role: "connected_user",
    },
     {
        id: 89,
        first_name: "Simone",
        last_name: "Durand",
        birthdate: new Date("2007-10-03"),
        email: "sdur@gameover.com",
        password: "Toto12345",
        phone_number: "0324234661",
        role: "connected_user",
    },

] 

export default fakeUsers;