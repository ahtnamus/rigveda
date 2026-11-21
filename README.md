# Rigveda for Young Explorers — Android app

Kid-friendly Rigveda learning app: story chapters, all 1,028 suktas, every mantra in Devanagari or Kannada script, with Listen / Slow / Repeat-after-me using the tablet's own voice. Works offline.

## Get the APK (no Android tools needed) — on your PC

1. Sign in to https://github.com and click **New repository**.
   Name it e.g. `rigveda-app` (Private is fine). Create it.
2. On the new repo page click **uploading an existing file**.
   Drag in **everything inside this folder** (including the hidden `.github` folder —
   if your file browser hides it, upload it separately or use GitHub Desktop).
   Click **Commit changes**.
3. Open the **Actions** tab. The "Build Rigveda APK" job starts by itself (about 5–8 minutes).
   If GitHub asks, click "I understand my workflows, enable them" and then **Run workflow**.
4. When it shows a green tick, open **Releases → Rigveda app (latest build)** and download **Rigveda.apk**.
   (It is also under Actions → the run → Artifacts.)

## Install on the Android tablet

1. Copy `Rigveda.apk` to the tablet (USB, Google Drive, email) — or open the Releases page on the tablet.
2. Tap the file. Android will ask to allow installing from this source: allow it once.
3. Open **Rigveda** from the app drawer.

**For the voice:** the app uses the tablet's text-to-speech engine. In Android Settings → search "Text-to-speech",
pick **Speech Services by Google**, and download the **Hindi** and **Kannada** voices.

## Building it yourself instead (Android Studio)

    npm install
    npx cap sync android
    npx cap open android        # then Build → Build APK(s)

Needs Node 20+, JDK 21 and Android Studio.

## Changing the content

The whole app is `www/index.html` plus the mantra data in `www/data/`. Edit, then push to GitHub — a new APK is built automatically.

## Credits

Sanskrit text: DharmicData by Bhavy Khatri (https://github.com/bhavykhatri/DharmicData), Open Database License (ODbL).
Fonts: Baloo 2, Nunito, Tiro Devanagari Sanskrit, Noto Serif Kannada (SIL Open Font License), via Fontsource.
