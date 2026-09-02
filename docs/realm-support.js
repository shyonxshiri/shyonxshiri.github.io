/* ─────────────────────────────────────────────────────────────────────────
   CAN THIS DEVICE RUN MY LEGO REALM?

   ONE rule, in ONE file, read by BOTH the React site (which decides whether to
   offer the way in) and lego.html itself (which redirects away rather than
   loading 38MB onto a device that cannot hold it). Loaded as a plain script by
   index.html and by lego.html, so there is no build coupling between them and
   no chance of the two drifting apart.

   WHY THERE IS A GATE AT ALL, measured in the running Realm rather than
   assumed (scratchpad/realm_cost.cjs): one frame is 15,894,880 triangles across
   689 draw calls, and the scene holds 197MB of geometry buffers plus 86MB of
   texture data, about 283MB of GPU-side memory, after a 38.4MB download of 35
   .glb files. That is a desktop workload. iOS Safari reclaims a tab well below
   that ceiling, so on a phone this does not run slowly, it reloads.

   WHAT IS TESTED, in the order it is cheapest to fail:
     · webgl  — a real context must actually initialise. Hard requirement, and
                the only test here that is about capability rather than budget.
     · gpu    — MAX_TEXTURE_SIZE under 4096 is a GPU that will not hold the
                Realm's 2048 atlases alongside everything else.
     · memory — navigator.deviceMemory under 4GB. Chrome and Android only;
                Safari and Firefox do not expose it, where the test is skipped
                rather than guessed at.
     · touch  — a device whose PRIMARY pointer is a finger. This is the memory
                test for the browsers that will not answer one, and it is a
                proxy, deliberately: there is no way to ask a phone how much GPU
                memory a tab may have before it is killed. It catches phones and
                tablets and leaves touchscreen laptops alone, because a laptop
                with a trackpad reports `pointer: fine` and only `any-pointer:
                coarse`.

   WHAT IS DELIBERATELY *NOT* TESTED: the window's width. The old gate in
   src/App.tsx was `window.innerWidth <= 640`, which is the wrong question twice
   over. It hid the Realm from a desktop browser dragged narrow, where it runs
   perfectly, and it decided an iPad Pro was fine on the strength of its screen
   being wide. Capability is a property of the device, not of how big the window
   happens to be right now, so nothing here reads innerWidth and the answer does
   not change when you resize.

   TO OPEN IT UP LATER: the touch test is the one to relax, and the honest way
   to relax it is to cut the scene to a phone budget first (dropping the
   Corvette alone is 1.71M triangles). Flip TOUCH_IS_TOO_SMALL to false to try a
   device without doing that work; expect a reloaded tab on most phones.
   ───────────────────────────────────────────────────────────────────────── */
(function () {
  var TOUCH_IS_TOO_SMALL = true;   // see the note above before changing this
  var MIN_TEXTURE = 4096;
  var MIN_MEMORY_GB = 4;

  var cached = null;

  function probe() {
    // 1. WebGL has to exist at all.
    var gl = null, canvas = document.createElement('canvas');
    try {
      gl = canvas.getContext('webgl2') ||
           canvas.getContext('webgl') ||
           canvas.getContext('experimental-webgl');
    } catch (e) { gl = null; }
    if (!gl) return { ok: false, why: 'webgl' };

    var maxTex = 0;
    try { maxTex = gl.getParameter(gl.MAX_TEXTURE_SIZE) || 0; } catch (e) {}

    // Hand the context straight back. A browser allows only a handful of live
    // WebGL contexts (commonly 16) and drops the oldest when it runs out, so a
    // probe that keeps one open costs the Realm the context it is about to ask
    // for. This has to happen before any early return below.
    try {
      var lose = gl.getExtension('WEBGL_lose_context');
      if (lose) lose.loseContext();
    } catch (e) {}

    if (maxTex < MIN_TEXTURE) return { ok: false, why: 'gpu' };

    // 2. Memory, where the browser will say. Undefined is not a failure.
    var mem = navigator.deviceMemory;
    if (typeof mem === 'number' && mem > 0 && mem < MIN_MEMORY_GB) {
      return { ok: false, why: 'memory' };
    }

    // 3. Is the primary pointer a finger?
    var coarse = false;
    try {
      coarse = !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
    } catch (e) {}
    if (TOUCH_IS_TOO_SMALL && coarse) return { ok: false, why: 'touch' };

    return { ok: true, why: '' };
  }

  // Cached, because both the React site and lego.html may ask more than once and
  // the answer cannot change within a page: none of the inputs are live.
  window.__realmSupported = function () {
    if (!cached) cached = probe();
    return cached;
  };

  // The one line to show someone who cannot get in. Kept here beside the test so
  // the reason and its wording can never disagree.
  window.__realmSupportMessage = function () {
    var r = window.__realmSupported();
    if (r.ok) return '';
    if (r.why === 'webgl') return 'My Lego Realm needs WebGL, which this browser has turned off or does not support.';
    if (r.why === 'gpu') return 'My Lego Realm needs more graphics memory than this device makes available to a browser.';
    if (r.why === 'memory') return 'My Lego Realm needs more memory than this device makes available to a browser.';
    return 'My Lego Realm is built for a desktop or laptop. It holds about 283MB of 3D data and draws close to 16 million triangles a frame, which is more than a phone or tablet browser will carry.';
  };
})();
