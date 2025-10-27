import api from "./api";

export default class NotificationService {


    static getLastNotif = async () => {
      try {
        console.log("[NotificationService], getLastNotif() - T1")
        const response = await api.get('/notifications', {params: {limit: 2}});
        console.log("[NotificationService], getLastNotif() - T2")
        return response.data;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch last notification");
      }
    }

      static fetchDataInMsDb = async () => {
          try {
              const { data } = await api.get('nftype',
                  { params: { limit: 5 } }
              )
              data && console.log("data issues du Get Axios vers MS => @Get('mstest') : ", data)
              return data;
          } catch (err) {
              console.log("erreur Axios in fetchDataInMsDb : ", err)
          }
      }
  
      static putDataInMsDb = async (newNT: string)  => {
          try {
              const response= await api.post('nftype',
                  { newNT }
              )
              response.data && console.log("data issues du Get Axios vers MS => @Get('mstest') : ", response.data)
              return response.data;
          } catch (err) {
              console.log("erreur Axios in putDataInMsDb : ", err)
          }
      }

  }

  // WORK IN PROGRESS
  