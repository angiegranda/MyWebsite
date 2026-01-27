#!/usr/bin/env bash

set -e

if [ $# -ne 1 ]; then
  echo "Usage: $0 <video.mov>"
  exit 1
fi

INPUT="$1"

if [[ "${INPUT##*.}" != "mov" ]]; then
  echo "Error: input file must end with .mov"
  exit 1
fi

OUTPUT="${INPUT%.mov}.mp4"

ffmpeg -i "$INPUT" \
  -c:v libx264 -pix_fmt yuv420p -profile:v high -level 4.2 \
  -movflags +faststart \
  -c:a aac -b:a 192k \
  "$OUTPUT"


