import Users from '@/Models/UsersSchema'

export default async function generatingUsername(Name){


    while (true) {
        var val = Math.floor(1000 + Math.random() * 9000);
        const generatedUsername = `${Name.slice(0, 4)}${String(val).slice(0, 3)}`;
        const checkUsername = await Users.findOne({Username: generatedUsername});
        if(!checkUsername){
            return generatedUsername;         
        }
      
    }


}