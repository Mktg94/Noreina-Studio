this is from vercel deployment log

21:31:01.644 Running build in Washington, D.C., USA (East) – iad1
21:31:01.645 Build machine configuration: 2 cores, 8 GB
21:31:01.835 Cloning github.com/Mktg94/Noreina-Studio (Branch: main, Commit: 0636169)
21:31:01.836 Previous build caches not available.
21:31:02.165 Cloning completed: 329.000ms
21:31:02.472 Running "vercel build"
21:31:02.494 Vercel CLI 53.3.2
21:31:02.684 Installing dependencies...
21:31:09.341 npm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
21:31:22.450 
21:31:22.450 added 769 packages in 20s
21:31:22.451 
21:31:22.451 241 packages are looking for funding
21:31:22.451   run `npm fund` for details
21:31:22.754 Detected Next.js version: 16.2.6
21:31:22.763 Running "npm run build"
21:31:22.969 
21:31:22.970 > portfolio@0.1.0 build
21:31:22.970 > next build
21:31:22.970 
21:31:23.530 ⚠ turbopack.root should be absolute, using: /vercel/path0
21:31:23.716   Applying modifyConfig from Vercel
21:31:23.721 Attention: Next.js now collects completely anonymous telemetry regarding usage.
21:31:23.722 This information is used to shape Next.js' roadmap and prioritize features.
21:31:23.722 You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
21:31:23.722 https://nextjs.org/telemetry
21:31:23.722 
21:31:23.743 ▲ Next.js 16.2.6 (Turbopack)
21:31:23.744 
21:31:23.779   Creating an optimized production build ...
21:31:33.210 ✓ Compiled successfully in 9.1s
21:31:33.213   Running TypeScript ...
21:31:39.207 Failed to type check.
21:31:39.208 
21:31:39.208 ./src/components/shared/AnimatedText.tsx:11:14
21:31:39.208 Type error: Cannot find namespace 'JSX'.
21:31:39.208 
21:31:39.208    9 |   delay?: number;
21:31:39.208   10 |   once?: boolean;
21:31:39.208 > 11 |   as?: keyof JSX.IntrinsicElements;
21:31:39.208      |              ^
21:31:39.208   12 |   type?: "words" | "chars" | "lines";
21:31:39.208   13 | }
21:31:39.208   14 |
21:31:39.245 Next.js build worker exited with code: 1 and signal: null
21:31:39.291 Error: Command "npm run build" exited with 1
