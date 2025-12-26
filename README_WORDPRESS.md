# Barangay Mapatag Senior Profiling System - WordPress Deployment Guide

Follow these steps to successfully "export" and run this system on your WordPress website.

## 1. Preparation
1. Create a new folder on your computer named `brgy-mapatag-system`.
2. Copy **all** project files into this folder (index.tsx, App.tsx, components/, services/, etc.).
3. Copy the `wordpress-plugin.php` file into this folder.

## 2. Installation
1. Log in to your WordPress server using FTP or your hosting's File Manager.
2. Navigate to `wp-content/plugins/`.
3. Upload the entire `brgy-mapatag-system` folder.
4. Go to your WordPress Admin Dashboard -> **Plugins**.
5. Find **Barangay Mapatag Senior Profiling System** and click **Activate**.

## 3. Configuration (API Key)
The system uses Gemini AI for health insights. To set your API Key safely:
1. Edit your `wp-config.php` file (found in the WordPress root directory).
2. Add the following line before `/* That's all, stop editing! Happy publishing. */`:
   ```php
   define('GEMINI_API_KEY', 'your-google-api-key-here');
   ```

## 4. Usage
1. Create a new Page or Post in WordPress.
2. Add a **Shortcode Block**.
3. Enter: `[brgy_mapatag_system]`
4. Publish and view the page!

## Troubleshooting
- **Module Issues**: The browser must support ES6 Modules and Import Maps (Chrome 89+, Safari 16.4+, Edge 89+).
- **Styling**: The plugin uses Tailwind via CDN for maximum compatibility.
- **Transpilation**: Since the browser does not natively support `.tsx`, you may need to use a plugin like "ReactPress" or pre-bundle the code if your server doesn't support automatic TSX transpilation.
