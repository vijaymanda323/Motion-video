const express = require('express');
const router = express.Router();
const { 
    createUser, 
    loginUser, 
    updateProfile, 
    getUserProfile,
    uploadVideo,
    getUserVideos,
    getVideoById,
    streamVideo,
    getVideoThumbnail,
    updateVideo,
    deleteVideo
} = require('../Controller/Controller');

// User routes
router.post('/users/register', createUser);
router.post('/users/login', loginUser);
router.put('/users/profile', updateProfile);
router.get('/users/profile/:email', getUserProfile);

// Video routes
router.post('/videos/upload', uploadVideo);
router.get('/videos/user/:email', getUserVideos);
router.get('/videos/:videoId', getVideoById); // Get video metadata (use ?includeData=true for video data)
router.get('/videos/:videoId/stream', streamVideo); // Stream video file for playback
router.get('/videos/:videoId/thumbnail', getVideoThumbnail); // Get thumbnail image
router.put('/videos/:videoId', updateVideo);
router.delete('/videos/:videoId', deleteVideo);

module.exports = router;

