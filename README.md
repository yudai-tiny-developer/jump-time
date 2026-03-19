# Seek to Timecode Control for YouTube

A lightweight Chrome extension that lets you jump to a specific point in a YouTube video by clicking the current playback time and typing a timecode.

## Features

- Click the current time display in the YouTube player to edit it directly.
- Jump to an absolute timestamp with inputs like `90`, `1:30`, or `1:02:45`.
- Jump relative to the end of the video with inputs like `-30` or `-1:15`.
- Pauses playback while editing and resumes if the video was already playing.

## How It Works

When the extension loads on a YouTube watch page, it makes the player's current time label editable.

1. Click the current playback time.
2. Enter a timecode.
3. Press `Enter` to seek, or `Escape` to cancel.

Supported formats:

- `SS`
- `MM:SS`
- `HH:MM:SS`
- `-SS`
- `-MM:SS`
- `-HH:MM:SS`

Negative values seek from the end of the video.

## License

This project is licensed under dual licenses:
*   [Apache License 2.0](LICENSE-APACHE)
*   [MIT License](LICENSE-MIT)
