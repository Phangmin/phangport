# Web Video Export

Use these settings for project videos that need to play in the browser as section backgrounds.

## Recommended Export Settings

- Container: `MP4`
- Video codec: `H.264 / AVC`
- Profile: `High`
- Pixel format: `yuv420p`
- Frame rate: `24` or `30`
- Audio codec: `AAC`
- Audio bitrate: `128k`
- Fast start: `On`
- Resolution: `1920x1080` or `1280x720`

## ffmpeg Conversion

Convert an existing video to a browser-safe MP4:

```bash
ffmpeg -i input.mp4 -c:v libx264 -profile:v high -level 4.1 -pix_fmt yuv420p -movflags +faststart -preset medium -crf 23 -c:a aac -b:a 128k -ar 48000 -ac 2 output.web.mp4
```

If the video does not need audio:

```bash
ffmpeg -i input.mp4 -c:v libx264 -profile:v high -level 4.1 -pix_fmt yuv420p -movflags +faststart -preset medium -crf 23 -an output.web.mp4
```

## Current Fix For `namuh-video.mp4`

`src/assets/projects/videos/namuh-video.mp4` is currently HEVC/H.265 (`hev1`), which works in some local players but is unreliable in the browser.

Convert it like this:

```bash
ffmpeg -i src/assets/projects/videos/namuh-video.mp4 -c:v libx264 -profile:v high -level 4.1 -pix_fmt yuv420p -movflags +faststart -preset medium -crf 23 -an src/assets/projects/videos/namuh-video.web.mp4
```

After converting, update `src/content/projects.ts` so the `NAMUH` project's `backgroundUrl` points to `namuh-video.web.mp4`.
