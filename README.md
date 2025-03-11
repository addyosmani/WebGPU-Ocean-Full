# WebGPU Ocean (Full-width Edition)

This is an optimized fork of the excellent [WebGPU Ocean](https://github.com/matsuoka-601/WebGPU-Ocean) project, modified for an immersive full-width experience. This version adds:

- Full-width zoom by default
- Dynamic wave splashing on window resize
- Procedurally generated ocean sounds using Web Audio API
- Adaptive audio intensity based on wave motion

For a deep dive into the underlying concepts and techniques, check out the detailed walkthrough on [Codrops](https://tympanus.net/codrops/2025/02/26/webgpu-fluid-simulations-high-performance-real-time-rendering/).

This real-time 3D fluid simulation is implemented in WebGPU and works on browsers that support the WebGPU API.

[Try demo here!](https://ocean.addy.ie)

## How to run
```
npm install
npm run serve
