import httpClient from "../../axios/axios";

export const getData = async (link, emitFunction, fieldName="title", params, callbackFunction="") => {
   return await httpClient.get(link, {...params})
    .then((res) => {
      let responseArray = res.data.data ?? []
      if(emitFunction) {
      emitFunction(responseArray.map(item => ({...item, label: item[fieldName]})))
      }
      return res
    })
    .catch((err) => {
      console.log(err)
      return []
    });
};