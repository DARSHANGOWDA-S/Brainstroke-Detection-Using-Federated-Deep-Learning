# BrainStroke Detect - Frontend Mock

This is a small React + Vite frontend scaffold implementing UI pages for:

- Home
- Login / Sign-Up (mock)
- MRI Upload (drag-and-drop, preview)
- Detection Result (mocked predictions, download PDF)
- Performance Analysis
- Federated Learning Visualization
- About & Contact

This is a UI prototype — backend/model inference is mocked for demonstration. The project is intentionally lightweight so you can integrate your federated learning backend later.

## Quick start (Windows PowerShell)

1. Install dependencies:

```powershell
cd c:\Users\darsh\Desktop\StrokeDetection
npm install
```

2. Run dev server:

```powershell
npm run dev
```

3. Open the URL printed by Vite (typically http://localhost:5173)

## Notes / Next steps

- Integrate real authentication and secure storage.
- Hook Upload -> Local inference or secure node using your federated learning orchestration.
- Replace mocked charts with real metrics from training logs.
- Add dark-mode toggle and animations (optional).

Contact:darshangowda4618@gmail.com
