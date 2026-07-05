#!/bin/bash
set -e

echo "Applying temporary file watch limit..."
sudo sysctl fs.inotify.max_user_watches=524288

echo "Applying permanent file watch limit..."
if ! grep -q "fs.inotify.max_user_watches" /etc/sysctl.conf; then
  echo "fs.inotify.max_user_watches=524288" | sudo tee -a /etc/sysctl.conf
  echo "Added fs.inotify.max_user_watches=524288 to /etc/sysctl.conf"
else
  # Update existing entry
  sudo sed -i 's/fs.inotify.max_user_watches=.*/fs.inotify.max_user_watches=524288/g' /etc/sysctl.conf
  echo "Updated existing fs.inotify.max_user_watches to 524288 in /etc/sysctl.conf"
fi

echo "Successfully updated OS file watch limits!"
