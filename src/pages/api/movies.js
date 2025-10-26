import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  const { method } = req;
  const { db } = await connectToDatabase();

  try {
    switch (method) {
      case 'GET':
        const movies = await db.collection('movies').find({}).sort({ createdAt: -1 }).toArray();
        res.status(200).json({ success: true, data: movies });
        break;

      case 'POST':
        const movieData = {
          ...req.body,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        const result = await db.collection('movies').insertOne(movieData);
        res.status(201).json({ success: true, data: { ...movieData, _id: result.insertedId } });
        break;

      case 'PUT':
        const { id, ...updateData } = req.body;
        await db.collection('movies').updateOne(
          { _id: new require('mongodb').ObjectId(id) },
          { $set: { ...updateData, updatedAt: new Date() } }
        );
        res.status(200).json({ success: true });
        break;

      case 'DELETE':
        await db.collection('movies').deleteOne({ 
          _id: new require('mongodb').ObjectId(req.body.id) 
        });
        res.status(200).json({ success: true });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}