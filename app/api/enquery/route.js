import connectMongo from "@/utils/connectMongo";
import enqueryModel from "@/models/enqueryModel";

export async function POST(req) {
    // console.log(await req.json());
    try {
        const {name, email, message} = await req.json();
        const enquery = {name, email, message}
        await connectMongo();
        await enqueryModel.create(enquery);
        return Response.json({message:'Enquery has been send!'});
    } catch (error) {
        return Response.json({message:error._message});
    }

}