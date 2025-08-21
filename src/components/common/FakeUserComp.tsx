// pour tests *********** à virer ensuite.

/*

import { useEffect, useState } from "react";
import { getAxiosUser } from "../../services/api/auth";

const FakeUserComp = () => {

const [showUser, setShowUser] = useState<any>({});

const recupUserList = async () => {
    const list = await getAxiosUser();
    setShowUser(list);
}

useEffect(() => {
    //recupUserList();
    console.log(showUser);
},[])

return (
        <>
        <h1>FakeUserComp</h1>
        
        </>
    )
}

export default FakeUserComp;

*/