this is the new error after deployment


00:18:56.734 Running build in Washington, D.C., USA (East) – iad1
00:18:56.735 Build machine configuration: 2 cores, 8 GB
00:18:56.903 Cloning github.com/Mktg94/Noreina-Studio (Branch: main, Commit: a05d10f)
00:18:56.905 Previous build caches not available.
00:18:57.237 Cloning completed: 333.000ms
00:18:57.651 Running "vercel build"
00:18:57.786 Vercel CLI 53.3.2
00:18:58.110 Installing dependencies...
00:19:08.692 npm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
00:19:29.604 
00:19:29.605 added 769 packages in 31s
00:19:29.606 
00:19:29.606 241 packages are looking for funding
00:19:29.607   run `npm fund` for details
00:19:29.714 Detected Next.js version: 16.2.6
00:19:29.725 Running "npm run build"
00:19:29.879 
00:19:29.879 > portfolio@0.1.0 build
00:19:29.879 > next build
00:19:29.880 
00:19:30.609   Applying modifyConfig from Vercel
00:19:30.616 Attention: Next.js now collects completely anonymous telemetry regarding usage.
00:19:30.617 This information is used to shape Next.js' roadmap and prioritize features.
00:19:30.617 You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
00:19:30.618 https://nextjs.org/telemetry
00:19:30.618 
00:19:30.647 ▲ Next.js 16.2.6 (Turbopack)
00:19:30.648 
00:19:30.692   Creating an optimized production build ...
00:19:42.080 ✓ Compiled successfully in 10.9s
00:19:42.083   Running TypeScript ...
00:19:50.505   Finished TypeScript in 8.4s ...
00:19:50.509   Collecting page data using 1 worker ...
00:19:51.074 Error: Missing API key. Pass it to the constructor `new Resend("re_123")`
00:19:51.074     at instantiateModule (.next/server/chunks/[turbopack]_runtime.js:853:9)
00:19:51.074     at instantiateRuntimeModule (.next/server/chunks/[turbopack]_runtime.js:882:12)
00:19:51.074     at getOrInstantiateRuntimeModule (.next/server/chunks/[turbopack]_runtime.js:895:12)
00:19:51.075     at Object.m (.next/server/chunks/[turbopack]_runtime.js:898:18)
00:19:51.076     at Object.<anonymous> (.next/server/app/api/contact/route.js:6:3)
00:19:51.582 
00:19:51.583 > Build error occurred
00:19:51.586 Error: Failed to collect page data for /api/contact
00:19:51.587     at ignore-listed frames {
00:19:51.587   type: 'Error'
00:19:51.587 }
00:19:51.669 Error: Command "npm run build" exited with 1