export class SendFile {

    static async sendFile(data){

        const response = await fetch ('http://localhost:3333', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        })
    
        return response.json()
    };
};