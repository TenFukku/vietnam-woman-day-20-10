/* ============================================================
   SCENE MANAGEMENT
   ============================================================ */
function flash(cb) {
  const f = document.getElementById("flashOverlay");
  f.style.opacity = "1";
  setTimeout(() => {
    f.style.opacity = "0";
    if (cb) cb();
  }, 160);
}
function switchScene(fromId, toId, immediate) {
  const fa = document.getElementById(fromId);
  const fb = document.getElementById(toId);
  if (immediate) {
    fa.classList.remove("active");
    fb.classList.add("active");
    return;
  }
  flash(() => {
    fa.classList.remove("active");
    fb.classList.add("active");
  });
}

/* ============================================================
   SCENE 1 — CAMERA SCANNER
   ============================================================ */
const SCAN_LOGS = [
  { text: "> Khởi tạo hệ thống nhận diện AI...", delay: 0, pct: 10 },
  { text: "> Kết nối camera thành công [OK]", delay: 720, pct: 25 },
  { text: "> Đang quét đặc trưng khuôn mặt...", delay: 1520, pct: 50 },
  { text: "> Phân tích sinh trắc học... 78%", delay: 2320, pct: 72 },
  { text: "> Đối chiếu cơ sở dữ liệu...", delay: 3020, pct: 88 },
  { text: "> Độ khớp: 99.8% [CONFIRMED]", delay: 3720, pct: 97 },
  { text: "> [OK] XÁC THỰC THÀNH CÔNG!", delay: 4220, pct: 100 },
];

async function initScanner() {
  const logEl = document.getElementById("terminalLog");
  const barEl = document.getElementById("progressBar");
  const statEl = document.getElementById("scanStatus");
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
      audio: false,
    });
    document.getElementById("cameraVideo").srcObject = stream;
  } catch (e) {
    document.getElementById("cameraVideo").style.display = "none";
    document.getElementById("noCamBg").style.display = "block";
    document.getElementById("noCamWave").style.display = "flex";
    SCAN_LOGS[1].text = "> Chuyển sang quét tần số sóng não... [OK]";
  }
  SCAN_LOGS.forEach(({ text, delay, pct }) => {
    setTimeout(() => {
      const ln = document.createElement("span");
      ln.className = "log-line";
      ln.textContent = text;
      logEl.appendChild(ln);
      logEl.scrollTop = logEl.scrollHeight;
      barEl.style.width = pct + "%";
      if (pct === 100) {
        statEl.textContent = "[OK] NHẬN DIỆN THÀNH CÔNG";
        statEl.style.color = "#00ff88";
        statEl.style.textShadow = "0 0 10px #00ff88";
      }
    }, delay);
  });
  setTimeout(() => {
    try {
      const v = document.getElementById("cameraVideo");
      if (v.srcObject) v.srcObject.getTracks().forEach((t) => t.stop());
    } catch (e) {}
    goToScene2();
  }, 5500);
}

/* ============================================================
   SCENE 2 — BOUQUET & NHẤN GIỮ
   ============================================================ */
function goToScene2() {
  switchScene("scene1", "scene2");

  setTimeout(() => {
    document.getElementById("av2").classList.add("show");
  }, 400);
  setTimeout(() => {
    document.getElementById("av1").classList.add("show");
  }, 600);
  setTimeout(() => {
    document.getElementById("av3").classList.add("show");
  }, 800);
  setTimeout(() => {
    document.getElementById("av4").classList.add("show");
  }, 1000);
  setTimeout(() => {
    document.getElementById("av5").classList.add("show");
  }, 1200);
  setTimeout(() => {
    document.getElementById("av6").classList.add("show");
  }, 1400);
  setTimeout(() => {
    document.getElementById("av7").classList.add("show");
    document.getElementById("holdInstruction").classList.add("show");
  }, 1600);

  startFloaters();
  setTimeout(launchHearts, 2000);
  setupBouquetHold();
}

function setupBouquetHold() {
  const bouquet = document.getElementById("bouquetContainer");
  const ringSvg = document.querySelector(".hold-ring-svg");
  const ringProgress = document.getElementById("holdRingProgress");

  let holdInterval = null;
  const HOLD_DURATION = 900;
  const CIRCLE_CIRCUMFERENCE = 238;

  function startHold(e) {
    if (e.type === "touchstart") e.preventDefault();
    bouquet.classList.add("is-holding");
    ringSvg.classList.add("active");
    ringProgress.style.strokeDashoffset = CIRCLE_CIRCUMFERENCE;

    const startTime = Date.now();
    holdInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progressRatio = Math.min(elapsed / HOLD_DURATION, 1);
      ringProgress.style.strokeDashoffset =
        CIRCLE_CIRCUMFERENCE * (1 - progressRatio);

      if (progressRatio >= 1) {
        clearInterval(holdInterval);
        endHoldSuccess();
      }
    }, 20);
  }

  function cancelHold() {
    bouquet.classList.remove("is-holding");
    ringSvg.classList.remove("active");
    if (holdInterval) {
      clearInterval(holdInterval);
      holdInterval = null;
    }
    ringProgress.style.strokeDashoffset = CIRCLE_CIRCUMFERENCE;
  }

  function endHoldSuccess() {
    bouquet.classList.remove("is-holding");
    ringSvg.classList.remove("active");

    if (navigator.vibrate) {
      navigator.vibrate([40, 60, 40]);
    }

    launchHearts();
    setTimeout(() => {
      goToScene3();
    }, 250);
  }

  bouquet.addEventListener("mousedown", startHold);
  window.addEventListener("mouseup", cancelHold);
  bouquet.addEventListener("touchstart", startHold, { passive: false });
  bouquet.addEventListener("touchend", cancelHold);
  bouquet.addEventListener("touchcancel", cancelHold);
}

function startFloaters() {
  const sc = document.getElementById("scene2");
  const emojis = ["🦋", "💕", "🌸", "💗", "🦋", "💖", "🌺", "💓", "✨", "🌹"];
  emojis.forEach((em) => {
    for (let j = 0; j < 2; j++) {
      const el = document.createElement("div");
      el.className = "floater";
      el.textContent = em;
      el.style.left = Math.random() * 100 + "%";
      el.style.fontSize = 13 + Math.random() * 14 + "px";
      el.style.animationDuration = 5 + Math.random() * 7 + "s";
      el.style.animationDelay = Math.random() * 5 + "s";
      sc.appendChild(el);
    }
  });
}

/* ============================================================
   SCENE 3 — 3D UNIVERSE (HỖ TRỢ ZOOM 2 NGÓN & TỐI ƯU MOBILE)
   ============================================================ */
function playBackgroundMusic() {
  const audio = document.getElementById("bgAudio");
  if (audio && audio.paused) {
    audio.play().catch((e) => {
      console.log("Audio play prevented or file not found yet:", e);
    });
  }
}

function goToScene3(fromScene4) {
  if (fromScene4) {
    switchScene("scene4", "scene3", true);
    return;
  }
  playBackgroundMusic();
  switchScene("scene2", "scene3");
  initUniverse();
}

function getCenterBiasedX() {
  const r1 = Math.random();
  const r2 = Math.random();
  const bell = (r1 + r2) / 2;
  // Dải hiển thị tập trung giữa màn hình (16% -> 84%) để không bị sát mép điện thoại
  const x = 16 + bell * 68;
  return x.toFixed(1);
}

let universeInited = false;
function initUniverse() {
  if (universeInited) return;
  universeInited = true;

  const canvas = document.getElementById("starCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < 90; i++) {
    const x = Math.random() * canvas.width,
      y = Math.random() * canvas.height;
    const r = Math.random() * 1.3;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255," + (0.3 + Math.random() * 0.7) + ")";
    ctx.fill();
  }

  const inner = document.getElementById("universeInner");
  inner.innerHTML = "";
  inner.appendChild(canvas);

  const frag = document.createDocumentFragment();

  const phrases = CONFIG.wishPhrases || [
    { text: "Mãi yêu em 🌸" },
    { text: "20 / 10" },
    { text: "Chúc mừng ngày Phụ nữ Việt Nam 💐" },
    { text: "Hạnh phúc mãi mãi 💕" },
  ];

  // Số lượng chữ cân đối tối ưu cho cả mobile & desktop
  const isMobile = window.innerWidth <= 600;
  const TOTAL_TEXT_ITEMS = isMobile ? 48 : 62;

  for (let i = 0; i < TOTAL_TEXT_ITEMS; i++) {
    const phrase = phrases[i % phrases.length];
    const el = document.createElement("div");
    el.className = "u-text";
    el.textContent = phrase.text;

    const leftX = getCenterBiasedX();

    const tz = Math.round(-150 + Math.random() * 300);
    const depthRate = (tz + 150) / 300;

    // Font size: chuẩn hóa vừa vặn, lưu vào biến --fs để CSS responsive tự co nhỏ trên mobile
    const fontSize = (11.5 + depthRate * 12.5).toFixed(1);
    const animDuration = (12.5 - depthRate * 4.8).toFixed(2);
    const opacity = (0.7 + depthRate * 0.3).toFixed(2);
    const animDelay = (-Math.random() * 12).toFixed(2);

    el.style.cssText = `
      left: ${leftX}%;
      top: -60px;
      font-size: ${fontSize}px;
      --fs: ${fontSize}px;
      --tz: ${tz}px;
      --opac: ${opacity};
      animation-duration: ${animDuration}s;
      animation-delay: ${animDelay}s;
    `;
    frag.appendChild(el);
  }

  const photos = CONFIG.photoPool || [];
  const TOTAL_PHOTO_ITEMS = isMobile ? 12 : 14;

  for (let i = 0; i < TOTAL_PHOTO_ITEMS; i++) {
    const photoSrc =
      photos[i % photos.length] || `images/pic${(i % 10) + 1}.jpg`;
    const el = document.createElement("div");
    el.className = "u-photo-stream";

    const leftX = getCenterBiasedX();

    const tz = Math.round(-120 + Math.random() * 260);
    const depthRate = (tz + 120) / 260;

    // Trên mobile ảnh thu nhỏ lại (13% - 20% viewport) để không che chữ
    const widthPct = (
      isMobile ? 13 + depthRate * 7 : 14 + depthRate * 9
    ).toFixed(1);
    const animDuration = (13.0 - depthRate * 5.0).toFixed(2);
    const opacity = (0.75 + depthRate * 0.25).toFixed(2);
    const rot = (-7 + Math.random() * 14).toFixed(1);
    const animDelay = (-Math.random() * 12).toFixed(2);

    el.style.cssText = `
      left: ${leftX}%;
      top: -120px;
      width: ${widthPct}%;
      --tz: ${tz}px;
      --opac: ${opacity};
      --rot: ${rot}deg;
      animation-duration: ${animDuration}s;
      animation-delay: ${animDelay}s;
    `;

    const img = document.createElement("img");
    img.src = photoSrc;
    img.alt = "";
    img.loading = "eager";
    img.draggable = false;
    img.onerror = function () {
      const fallbackSrc =
        i % 3 === 0
          ? "images/girl1.jpg"
          : i % 3 === 1
            ? "images/girl2.jpg"
            : "images/girl3.jpg";
      this.onerror = null;
      this.src = fallbackSrc;
    };

    el.appendChild(img);
    frag.appendChild(el);
  }

  inner.appendChild(frag);
  setupParallaxAndPinchZoom(inner);
}

// Xoay Parallax + Tính năng Zoom 2 ngón (Pinch-to-zoom) siêu mượt
function setupParallaxAndPinchZoom(inner) {
  let targetX = 0,
    targetY = 0;
  let currentX = 0,
    currentY = 0;
  let isDrag = false,
    lastX = 0,
    lastY = 0;

  // Biến điều khiển Zoom (Scale)
  let currentScale = 1.0;
  let targetScale = 1.0;
  let initialPinchDist = 0;
  let baseScaleAtPinch = 1.0;

  function renderScene() {
    const diffX = Math.abs(targetX - currentX);
    const diffY = Math.abs(targetY - currentY);
    const diffScale = Math.abs(targetScale - currentScale);

    if (diffX > 0.05 || diffY > 0.05 || diffScale > 0.005) {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      currentScale += (targetScale - currentScale) * 0.15;
      inner.style.transform = `perspective(750px) scale(${currentScale.toFixed(3)}) rotateY(${currentX.toFixed(1)}deg) rotateX(${(-currentY).toFixed(1)}deg)`;
    }

    requestAnimationFrame(renderScene);
  }
  requestAnimationFrame(renderScene);

  // Con quay hồi chuyển (Mobile)
  if (window.DeviceOrientationEvent) {
    window.addEventListener(
      "deviceorientation",
      (e) => {
        if (e.gamma !== null) {
          targetX = Math.max(-25, Math.min(25, e.gamma * 0.85));
          targetY = Math.max(-18, Math.min(18, (e.beta - 40) * 0.55));
        }
      },
      { passive: true },
    );
  }

  const sc3 = document.getElementById("scene3");

  // Xử lý chuột (Desktop): Kéo để xoay, Lăn chuột (Wheel) để Zoom
  sc3.addEventListener("mousedown", (e) => {
    isDrag = true;
    lastX = e.clientX;
    lastY = e.clientY;
  });
  window.addEventListener("mousemove", (e) => {
    if (!isDrag) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    targetX = Math.max(-30, Math.min(30, targetX + dx * 0.18));
    targetY = Math.max(-22, Math.min(22, targetY + dy * 0.18));
  });
  window.addEventListener("mouseup", () => (isDrag = false));

  sc3.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      const zoomDelta = -e.deltaY * 0.0012;
      targetScale = Math.max(0.65, Math.min(1.4, targetScale + zoomDelta));
    },
    { passive: false },
  );

  // Xử lý cảm ứng trên điện thoại: 1 ngón xoay, 2 ngón Zoom (Pinch)
  sc3.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches.length === 1) {
        isDrag = true;
        lastX = e.touches[0].clientX;
        lastY = e.touches[0].clientY;
      } else if (e.touches.length === 2) {
        isDrag = false;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        initialPinchDist = Math.hypot(dx, dy);
        baseScaleAtPinch = targetScale;
      }
    },
    { passive: true },
  );

  sc3.addEventListener(
    "touchmove",
    (e) => {
      if (e.touches.length === 1 && isDrag) {
        const dx = e.touches[0].clientX - lastX;
        const dy = e.touches[0].clientY - lastY;
        lastX = e.touches[0].clientX;
        lastY = e.touches[0].clientY;
        targetX = Math.max(-30, Math.min(30, targetX + dx * 0.16));
        targetY = Math.max(-22, Math.min(22, targetY + dy * 0.16));
      } else if (e.touches.length === 2 && initialPinchDist > 0) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const currentDist = Math.hypot(dx, dy);
        const scaleFactor = currentDist / initialPinchDist;
        targetScale = Math.max(
          0.65,
          Math.min(1.4, baseScaleAtPinch * scaleFactor),
        );
      }
    },
    { passive: true },
  );

  sc3.addEventListener("touchend", (e) => {
    if (e.touches.length === 0) {
      isDrag = false;
      initialPinchDist = 0;
    } else if (e.touches.length === 1) {
      lastX = e.touches[0].clientX;
      lastY = e.touches[0].clientY;
      isDrag = true;
      initialPinchDist = 0;
    }
  });
}

/* ============================================================
   SCENE 4 — ENVELOPE ANIMATION
   ============================================================ */
let envelopeOpened = false;

function goToScene4() {
  switchScene("scene3", "scene4");
  envelopeOpened = false;

  const wrap = document.getElementById("envLetterWrap");
  const env = document.getElementById("envelope");
  const seal = document.getElementById("envSeal");
  const flap = document.getElementById("envFlap");
  const hint = document.getElementById("s4Hint");

  if (wrap) wrap.classList.remove("show-card");
  if (env) env.classList.remove("faded");
  if (seal) {
    seal.classList.remove("shake", "pop");
  }
  if (flap) flap.classList.remove("open");
  if (hint) hint.classList.remove("gone");
}

function handleEnvelopeClick() {
  if (envelopeOpened) return;
  envelopeOpened = true;

  const seal = document.getElementById("envSeal");
  const flap = document.getElementById("envFlap");
  const wrap = document.getElementById("envLetterWrap");
  const env = document.getElementById("envelope");
  const hint = document.getElementById("s4Hint");

  if (hint) hint.classList.add("gone");

  if (seal) seal.classList.add("shake");

  setTimeout(() => {
    if (seal) {
      seal.classList.remove("shake");
      seal.classList.add("pop");
    }
  }, 450);

  setTimeout(() => {
    if (flap) {
      flap.style.transition = "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
      flap.classList.add("open");
    }
  }, 750);

  setTimeout(() => {
    if (env) env.classList.add("faded");
    if (wrap) wrap.classList.add("show-card");
    launchSmallConfetti();
  }, 1200);
}

/* ============================================================
   CONFETTI HELPERS
   ============================================================ */
function launchHearts() {
  confetti({
    particleCount: 28,
    angle: 90,
    spread: 60,
    origin: { x: 0.5, y: 0.82 },
    shapes: ["circle"],
    colors: ["#ff69b4", "#ff1493", "#ff85c1", "#ffc0cb", "#fff"],
    scalar: 0.85,
  });
}

function launchSmallConfetti() {
  const end = Date.now() + 2500;
  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      colors: ["#ff69b4", "#ff1493", "#ffc0cb", "#bf00ff", "#fff", "#ffd700"],
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      colors: ["#ff69b4", "#ff1493", "#ffc0cb", "#bf00ff", "#fff", "#ffd700"],
    });
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

/* ============================================================
   INIT
   ============================================================ */
window.addEventListener("load", () => {
  initScanner();

  const bgVid = document.getElementById("globalBgVideo");
  if (bgVid) {
    bgVid.play().catch(() => {
      document.addEventListener("click", () => bgVid.play(), { once: true });
      document.addEventListener("touchstart", () => bgVid.play(), {
        once: true,
      });
    });
  }
});
