const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    height:{
        type: String,
        required: false
    },
    weight:{
        type: String,
        required: false
    },
    age:{
        type: String,
        required: false
    },
    gender:{
        type: String,
        required: false
    },
    activityLevel:{
        type: String,
        required: false
    },
    goal:{
        type: String,
        required: false
    },
    healthConditions:{
        type: String,
        required: false
    },
    medications:{
        type: String,
        required: false
    },
    allergies:{
        type: String,
        required: false
    },
    birthDate:{
        type: Date,
        required: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    bioData:{
        type: String,
        required: false
    },
    location: {
        longitude: {
            type: Number,
            required: false
        },
        latitude: {
            type: Number,
            required: false
        }
    },
    id: {
        type: String,
        required: false  
    },
    firstName: {
        type: String,
        required: false
    },
    surname: {
        type: String,
        required: false
    },
    // Medical history fields
    heartSurgery: {
        type: Boolean,
        required: false
    },
    withinSixMonths: {
        type: Boolean,
        required: false
    },
    heartSurgeryComment: {
        type: String,
        required: false
    },
    fractures: {
        type: Boolean,
        required: false
    },
    withinSixMonthsFracture: {
        type: Boolean,
        required: false
    },
    fracturesComment: {
        type: String,
        required: false
    },
    // Streak tracking
    streakCount: {
        type: Number,
        default: 0
    },
    lastLoginDate: {
        type: Date,
        required: false
    },
    loginDates: [{
        type: Date
    }],
    video:{
        data:Buffer,
        ContentType:String
    },
    uploadedVideoAt:{
        type: Date,
        default: Date.now
    }
})

// Video Schema for storing MP4 videos using GridFS
const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    fileName: {
        type: String,
        required: true
    },
    // GridFS file ID for the video file
    gridFSVideoId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    contentType: {
        type: String,
        default: 'video/mp4',
        required: true
    },
    fileSize: {
        type: Number, // Size in bytes
        required: true
    },
    duration: {
        type: Number, // Duration in seconds
        required: false
    },
    // GridFS file ID for thumbnail (optional)
    gridFSThumbnailId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    thumbnailContentType: {
        type: String,
        required: false,
        default: 'image/jpeg'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userEmail: {
        type: String,
        required: true,
        index: true // For faster queries
    },
    category: {
        type: String,
        required: false,
        enum: ['exercise', 'tutorial', 'workout', 'other'],
        default: 'other'
    },
    tags: [{
        type: String
    }],
    isPublic: {
        type: Boolean,
        default: false
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['uploading', 'processing', 'ready', 'failed'],
        default: 'uploading'
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

// Index for faster queries
videoSchema.index({ userEmail: 1, uploadedAt: -1 });
videoSchema.index({ status: 1 });

const User = mongoose.model('User', userSchema);
const Video = mongoose.model('Video', videoSchema);

module.exports = User;
module.exports.Video = Video;