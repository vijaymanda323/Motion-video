# Cloudinary Setup Guide

This application uses Cloudinary for video storage and streaming instead of GridFS.

## Prerequisites

1. Create a free account at [Cloudinary](https://cloudinary.com/)
2. Get your Cloudinary credentials from the dashboard

## Environment Variables

Add the following environment variables to your `.env` file:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Getting Your Cloudinary Credentials

1. Log in to your [Cloudinary Dashboard](https://console.cloudinary.com/)
2. On the dashboard, you'll see your credentials:
   - **Cloud Name**: Found at the top of the dashboard
   - **API Key**: Displayed in the dashboard
   - **API Secret**: Click "Reveal" to see your API secret

## Installation

After adding the environment variables, install the dependencies:

```bash
npm install
```

## Video Upload

Videos are uploaded to Cloudinary in the `motion-videos` folder, organized by user ID.

### Upload Endpoints

- **POST** `/api/videos/upload-file` - Upload video using multipart/form-data
- **POST** `/api/videos/upload` - Upload video using base64 encoded data

### Video Response Format

All video responses now include:
- `videoUrl`: Direct Cloudinary URL to the video
- `thumbnailUrl`: Direct Cloudinary URL to the thumbnail (auto-generated if not provided)

## Video Streaming

Instead of streaming from the server, videos are served directly from Cloudinary:
- **GET** `/api/videos/:videoId/stream` - Returns the Cloudinary video URL
- **GET** `/api/videos/:videoId/thumbnail` - Returns the Cloudinary thumbnail URL

Cloudinary automatically handles:
- Video streaming with range requests
- Adaptive bitrate streaming
- CDN delivery for fast global access
- Automatic video optimization

## Benefits of Cloudinary

1. **CDN Delivery**: Videos are served from Cloudinary's global CDN
2. **Automatic Optimization**: Videos are automatically optimized for different devices
3. **Transformation**: Easy video transformations (resize, crop, etc.)
4. **Thumbnail Generation**: Automatic thumbnail generation from videos
5. **Scalability**: No server storage limitations
6. **Bandwidth**: Reduced server bandwidth usage

## Migration from GridFS

The schema supports both Cloudinary and legacy GridFS:
- New videos use Cloudinary (`cloudinaryVideoUrl`, `cloudinaryVideoId`)
- Old videos with GridFS IDs are still supported for backward compatibility

## Free Tier Limits

Cloudinary's free tier includes:
- 25 GB storage
- 25 GB monthly bandwidth
- 25,000 monthly transformations

For production use, consider upgrading to a paid plan.

