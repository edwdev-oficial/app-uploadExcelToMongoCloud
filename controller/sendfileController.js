import { SendFile } from "../model/sendfile.js";

export class SendFileController {

    static async sendFile(data, nameSheet) {

        const _data = {
            file: data,
            sheet: nameSheet
          };
        
          const dataSheet = await SendFile.sendFile(_data);
          console.log(dataSheet);
    };

};