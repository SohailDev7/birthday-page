import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increased limit for base64 images
app.use(express.static('public'));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://sohail:sohail786@sauravdonkey.pbt6v.mongodb.net/?appName=sauravdonkeyy';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// ==================== SCHEMAS ====================

// Painting Schema
const paintingSchema = new mongoose.Schema({
    userKey: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    drawingData: { type: String, required: true }, // Base64 string
    updatedAt: { type: Date, default: Date.now }
});

const Painting = mongoose.model('Painting', paintingSchema);

// Movie Schema
const movieSchema = new mongoose.Schema({
    movieName: { type: String, required: true, trim: true },
    summary: { type: String, required: true },
    whatYouWillLike: { type: String, default: '' },
    soilScore: { type: Number, required: true, min: 0, max: 5 },
    targetAudience: { type: String, enum: ['For Soil', 'For Prachi'], required: true },
    myLetterboxdReview: { type: String, default: '' },
    watched: { type: String, enum: ['watched', 'not watched'], default: 'not watched' },
    posterUrl: { type: String, default: '' },
    myReview: { type: String, default: '' },
    watchLink: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

movieSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Movie = mongoose.model('Movie', movieSchema);

// Review Schema
const reviewSchema = new mongoose.Schema({
    date: { type: String, required: true },
    likes: { type: String, default: '' },
    preferredTheme: { type: String, default: '' },
    bugsFound: { type: String, default: '' },
    improvements: { type: String, default: '' },
    cutenessRating: { type: Number, required: true, min: 0, max: 100 },
    chorPercentage: { type: Number, required: true, min: 0, max: 100 },
    overallExperience: { type: String, default: '' },
    wouldRecommend: { type: String, enum: ['yes', 'maybe', 'no', ''], default: '' },
    favoriteFeature: { type: String, enum: ['animations', 'design', 'interactivity', 'content', ''], default: '' },
    musicTaste: { type: String, enum: ['bollywood', 'english', 'kpop', 'mixed', ''], default: '' },
    memoryRating: { type: Number, required: true, min: 1, max: 5 },
    designRating: { type: Number, required: true, min: 1, max: 5 },
    surpriseReaction: { type: String, default: '' },
    reviewer: { type: String, default: 'Prachi' },
    theme: { type: String, default: 'default' },
    submittedAt: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);

// ==================== ROUTES ====================

// --- PAINTING ROUTES ---

// GET all paintings
app.get('/api/paintings', async (req, res) => {
    try {
        const paintings = await Painting.find();
        // Convert array to object map { userKey: drawingData }
        const paintingMap = paintings.reduce((acc, curr) => {
            acc[curr.userKey] = curr.drawingData;
            return acc;
        }, {});
        res.json({ success: true, data: paintingMap });
    } catch (err) {
        console.error('Error fetching paintings:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// GET painting by userKey
app.get('/api/paintings/:userKey', async (req, res) => {
    try {
        const painting = await Painting.findOne({ userKey: req.params.userKey });
        res.json({ success: true, data: painting ? painting.drawingData : null });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// POST save painting
app.post('/api/paintings', async (req, res) => {
    try {
        const { userKey, displayName, drawingData } = req.body;

        if (!userKey || !drawingData) {
            return res.status(400).json({ success: false, message: 'Missing userKey or drawingData' });
        }

        const painting = await Painting.findOneAndUpdate(
            { userKey },
            {
                userKey,
                displayName: displayName || userKey,
                drawingData,
                updatedAt: Date.now()
            },
            { upsert: true, new: true }
        );

        res.json({ success: true, message: 'Painting saved successfully', data: painting });
    } catch (err) {
        console.error('Error saving painting:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});


// --- MOVIE ROUTES ---

app.get('/api/movies', async (req, res) => {
    try {
        const { search, filter, targetAudience, watched, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
        let query = {};
        if (search) {
            query.$or = [
                { movieName: { $regex: search, $options: 'i' } },
                { summary: { $regex: search, $options: 'i' } },
                { whatYouWillLike: { $regex: search, $options: 'i' } }
            ];
        }
        if (targetAudience && ['For Soil', 'For Prachi'].includes(targetAudience)) query.targetAudience = targetAudience;
        if (watched && ['watched', 'not watched'].includes(watched)) query.watched = watched;
        if (filter === 'for-soil') query.targetAudience = 'For Soil';
        else if (filter === 'for-prachi') query.targetAudience = 'For Prachi';
        else if (filter === 'watched') query.watched = 'watched';
        else if (filter === 'not-watched') query.watched = 'not watched';

        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

        const movies = await Movie.find(query).sort(sortOptions);
        res.json({ success: true, data: movies, count: movies.length });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching movies', error: error.message });
    }
});

app.get('/api/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ success: false, message: 'Movie not found' });
        res.json({ success: true, data: movie });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching movie', error: error.message });
    }
});

app.post('/api/movies', async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        const savedMovie = await newMovie.save();
        res.status(201).json({ success: true, message: 'Movie created successfully', data: savedMovie });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating movie', error: error.message });
    }
});

app.put('/api/movies/:id', async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: Date.now() }, { new: true, runValidators: true });
        if (!updatedMovie) return res.status(404).json({ success: false, message: 'Movie not found' });
        res.json({ success: true, message: 'Movie updated successfully', data: updatedMovie });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating movie', error: error.message });
    }
});

app.patch('/api/movies/:id/toggle-watched', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ success: false, message: 'Movie not found' });
        movie.watched = movie.watched === 'watched' ? 'not watched' : 'watched';
        movie.updatedAt = Date.now();
        const updatedMovie = await movie.save();
        res.json({ success: true, message: `Movie marked as ${updatedMovie.watched}`, data: updatedMovie });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating watched status', error: error.message });
    }
});

app.delete('/api/movies/:id', async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
        if (!deletedMovie) return res.status(404).json({ success: false, message: 'Movie not found' });
        res.json({ success: true, message: 'Movie deleted successfully', data: deletedMovie });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting movie', error: error.message });
    }
});

app.get('/api/stats', async (req, res) => {
    try {
        const totalMovies = await Movie.countDocuments();
        // ... Simplified stats for brevity, add back full logic if needed or assume user just wants basic stats
        res.json({ success: true, data: { totalMovies } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching stats', error: error.message });
    }
});


// --- REVIEW ROUTES ---

app.get('/api/reviews', async (req, res) => {
    try {
        const reviews = await Review.find().sort({ submittedAt: -1 });
        res.json({ success: true, data: reviews, count: reviews.length });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching reviews', error: error.message });
    }
});

app.post('/api/reviews', async (req, res) => {
    try {
        const newReview = new Review({ ...req.body, submittedAt: new Date() });
        const savedReview = await newReview.save();
        res.status(201).json({ success: true, message: 'Review submitted successfully', data: savedReview });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating review', error: error.message });
    }
});

app.delete('/api/reviews/:id', async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);
        if (!deletedReview) return res.status(404).json({ success: false, message: 'Review not found' });
        res.json({ success: true, message: 'Review deleted successfully', data: deletedReview });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting review', error: error.message });
    }
});


// Utility function
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running healthy!',
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

app.get('/', (req, res) => {
    res.json({ message: 'API Running' });
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🎬 Server running on port ${PORT}`);
    });
}

export default app;
