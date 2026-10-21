/* ============================================================
   CONFIG — Danh sách chữ & Ảnh cho Universe 3D
   ============================================================ */
const CONFIG = {
  girls: [{ name: "Các bông hồng K17", avatar: "images/girl2.jpg" }],
  senderName: "Thiên Phúc đẹp trai vô cùng tận",

  wishMessage: `Chúc mừng ngày 20/10 🌸

Cảm ơn các bạn nữ vì đã đồng hành cùng tụi tui trong suốt khoảng thời gian vừa qua. Thời gian sắp tới, có lẽ chúng ta không có cơ hội gặp gỡ nhau nhiều nữa nhưng mà hãy vấn nhớ về khoảng thời gian xinh đẹp mà tụi mình dành cho nhau nhé! 

Chúc các bông hồng luôn xinh đẹp tuyệt trần, hạnh phúc, mạnh khỏe, yêu đời, yêu người, vững bước và ngẩng cao đầu trên con đường mà chính mình chọn nhée!.

Các bạn xứng đáng được nhận những điều tốt đẹp nhất trong cuộc đời này! 💕`,

  // Danh sách các câu chúc lặp lại nhiều lần, font thon gọn cute
  wishPhrases: [
    { text: "Mãi là ae <3", color: "#ff69b4", glow: "#ff1493" },
    { text: "20/10", color: "#ff80bf", glow: "#ff3399" },
    {
      text: "Chúc mừng ngày Phụ nữ Việt Nam 💐",
      color: "#d080ff",
      glow: "#a64dff",
    },
    { text: "Đẹp gái ngời ngời", color: "#ff99cc", glow: "#ff4da6" },
    { text: "Xinh gái thông thái", color: "#ff85a2", glow: "#ff3366" },
    { text: "Mãi bên nhau bạn nhé", color: "#ffb3d9", glow: "#ff66b2" },
    { text: "Cam on vi da den", color: "#b399ff", glow: "#8040ff" },
    { text: "Nụ cười tỏa nắng", color: "#ff6699", glow: "#ff1a66" },
    { text: "Hoa nhường nguyệt thẹn ✨", color: "#ff94c2", glow: "#ff4081" },
    { text: "Tiền vô như nước", color: "#e066ff", glow: "#cc00ff" },
    { text: "Hãy là chính mình", color: "#ffa3d7", glow: "#ff5ca2" },
    {
      text: "Hú hú",
      color: "#ff80df",
      glow: "#ff1ac6",
    },
    { text: "An nhiên", color: "#ffb3c6", glow: "#ff6b8b" },
    { text: "Không có gì để chê luôn á", color: "#c299ff", glow: "#8c1aff" },
    {
      text: "Vừa xin đẹp mà còn giỏi nữa ai chịu nổi",
      color: "#ff99bb",
      glow: "#ff3377",
    },
  ],

  // 10 ảnh từ pic1.jpg -> pic10.jpg
  photoPool: [
    "images/pic1.jpg",
    "images/pic2.jpg",
    "images/pic3.jpg",
    "images/pic4.jpg",
    "images/pic5.jpg",
    "images/pic6.jpg",
    "images/pic7.jpg",
    "images/pic8.jpg",
    "images/pic9.jpg",
    "images/pic10.jpg",
  ],
};

/* ── Apply CONFIG labels to DOM ── */
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("lbl1"))
    document.getElementById("lbl1").textContent =
      CONFIG.girls[0].name.toUpperCase();
  if (document.getElementById("lbl2"))
    document.getElementById("lbl2").textContent =
      CONFIG.girls[1].name.toUpperCase();
  if (document.getElementById("lbl3"))
    document.getElementById("lbl3").textContent =
      CONFIG.girls[2].name.toUpperCase();
  if (document.getElementById("ltrTitle")) {
    document.getElementById("ltrTitle").textContent =
      "Gửi " + CONFIG.girls.map((g) => g.name).join(", ") + " ♥";
  }
  if (document.getElementById("ltrBody"))
    document.getElementById("ltrBody").textContent = CONFIG.wishMessage;
  if (document.getElementById("ltrSig"))
    document.getElementById("ltrSig").textContent = "— " + CONFIG.senderName;

  document.querySelectorAll(".ltr-photo img").forEach((img, i) => {
    if (CONFIG.girls[i]) img.src = CONFIG.girls[i].avatar;
  });
});
