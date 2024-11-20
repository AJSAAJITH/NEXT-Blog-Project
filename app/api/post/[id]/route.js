import connectMongo from "../../../../utils/connectMongo";
import postModel from "../../../../models/postModel";

export async function GET(req, { params }) {
    try {
        console.log('Received params:', params); 
        await connectMongo();
        
        const postData = await postModel.findById(params.id); 
        console.log('Fetched post data:', postData); 

        // return new Response(JSON.stringify(postData), { status: 200, headers: { 'Content-Type': 'application/json' } }); 
        return Response.json(postData)
    } catch (error) {
        console.error('Error fetching post data:', error); 
        // return new Response(JSON.stringify({ message: error.message }), { status: 500 });
        return Response.json({message: error.messge})
    }
}
