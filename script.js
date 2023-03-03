const colorPicker = new iro.ColorPicker(".main-color-block", {
  width: 120,
  color: "rgb(255, 255, 255)",
  borderWidth: 1,
  borderColor: "#fff",
  activeHandleRadius: 8,
});
const btnPick = document.querySelector(".pick");
const mainSelect = document.querySelector(".main-color-select");
const color2Select = document.querySelector(".color-2");
const color3Select = document.querySelector(".color-3");
const copy2Btn = document.querySelector(".copy-2");
const copy3Btn = document.querySelector(".copy-3");
const colorText2 = document.querySelector(".color-text-2");
const colorText3 = document.querySelector(".color-text-3");
const mainBlock = document.querySelector(".main-color-block");
const color2Block = document.querySelector(".color-2-block");
const color3Block = document.querySelector(".color-3-block");
const mainInput1 = document.querySelector(".main-input-1");
const mainInput2 = document.querySelector(".main-input-2");
const mainInput3 = document.querySelector(".main-input-3");
const mainInput4 = document.querySelector(".main-input-4");
const label1 = document.querySelector(".label-1");
const label2 = document.querySelector(".label-2");
const label3 = document.querySelector(".label-3");
const label4 = document.querySelector(".label-4");
const colorPickerB = document.querySelector(".main-color-block");
let mainChange = true;

/* Начальные данные */

mainInput1.value = colorPicker.color.rgb["r"];
mainInput2.value = colorPicker.color.rgb["g"];
mainInput3.value = colorPicker.color.rgb["b"];
color2Block.style.backgroundColor = colorPicker.color.rgbString;
color3Block.style.backgroundColor = colorPicker.color.rgbString;

function fXyz(x) {
  return x >= 0.04045 ? ((x + 0.055) / 1.055) ** 2.4 : x / 12.92;
}

function rgbToXyz(r, g, b) {
  let a = [fXyz(r / 255) * 100, fXyz(g / 255) * 100, fXyz(b / 255) * 100];

  return [
    Math.round((0.412453 * a[0] + 0.35758 * a[1] + 0.180423 * a[2]) * 100) /
      100,
    Math.round((0.212671 * a[0] + 0.71516 * a[1] + 0.072169 * a[2]) * 100) /
      100,
    Math.round(
      ((0.019334 * a[0] + 0.119193 * a[1] + 0.950227 * a[2]) * 100) / 100
    ),
  ];
}

function fLab(x) {
  return x >= 0.008856 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
}

function rgbToLab(r, g, b) {
  let xyz = rgbToXyz(r, g, b);
  return [
    Math.round((116 * fLab(xyz[1] / 100) - 16) * 100) / 100,
    Math.round(500 * (fLab(xyz[0] / 95.047) - fLab(xyz[1] / 100)) * 100) / 100,
    Math.round(200 * (fLab(xyz[1] / 100) - fLab(xyz[2] / 108.883)) * 100) / 100,
  ];
}

function rgbToHsv(r, g, b) {
  (r /= 255), (g /= 255), (b /= 255);

  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    v = max;

  let d = max - min;
  s = max == 0 ? 0 : d / max;

  if (max == min) {
    h = 0;
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(v * 100)];
}

function hexToRgb(c) {
  var bigint = parseInt(c.split("#")[1], 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  return [Math.round(r), Math.round(g), Math.round(b)];
}

function cmykToRgb(c, m, y, k) {
  c /= 100;
  m /= 100;
  y /= 100;
  k /= 100;
  let r = 255 * (1 - c) * (1 - k);
  let g = 255 * (1 - m) * (1 - k);
  let b = 255 * (1 - y) * (1 - k);

  return [Math.round(r), Math.round(g), Math.round(b)];
}

function fXyzRgb(x) {
  return x >= 0.0031308 ? (1.055 * x) ** (1 / 2.4) - 0.055 : 12.92 * x;
}

function xyzToRgb(x, y, z) {
  let a = [
    (3.2406 * x - 1.5372 * y - 0.4986 * z) / 100,
    (-0.9689 * x + 1.8758 * y + 0.0415 * z) / 100,
    (0.0557 * x - 0.204 * y + 1.057 * z) / 100,
  ];

  return [
    Math.round(fXyzRgb(a[0]) * 255),
    Math.round(fXyzRgb(a[1]) * 255),
    Math.round(fXyzRgb(a[2]) * 255),
  ];
}

function fLabRgb(x) {
  return x >= 0.008856 ? x ** 3 : (x - 16 / 116) / 7.787;
}

function labToRgb(l, a, b) {
  let xyz = [
    Math.round(fLabRgb(a / 500 + (l + 16) / 116) * 100),
    Math.round(fLabRgb((l + 16) / 116) * 95.047),
    Math.round(fLabRgb((l + 16) / 116 - b / 200) * 108.883),
  ];
  return xyzToRgb(...xyz);
}

function hsvToRgb(h, s, v) {
  h /= 360;
  s /= 100;
  v /= 100;
  var r, g, b, i, f, p, q, t;
  if (arguments.length === 1) {
    (s = h.s), (v = h.v), (h = h.h);
  }
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      (r = v), (g = t), (b = p);
      break;
    case 1:
      (r = q), (g = v), (b = p);
      break;
    case 2:
      (r = p), (g = v), (b = t);
      break;
    case 3:
      (r = p), (g = q), (b = v);
      break;
    case 4:
      (r = t), (g = p), (b = v);
      break;
    case 5:
      (r = v), (g = p), (b = q);
      break;
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/* Validators (驗證者) */

function isRgb(r, g, b) {
  if (0 <= r && r <= 255 && 0 <= g && g <= 255 && 0 <= b && b <= 255) {
    return true;
  }
  alert(
    /*輸入的數據無效：RGB 值必須至少為 0，最多為 255.*/
    "Data entered incorrectly. Values must be between 0 and 255."
  );
  return false;
}

function isHex(str) {
  str = String(str);
  let tempArray = str.substring(1).split("");
  let flag = false;

  tempArray.forEach((elem) => {
    if (
      !(
        (0 <= elem && elem <= 9) ||
        ("a" <= elem && "f" <= elem) ||
        ("A" <= elem && "F" <= elem)
      )
    ) {
      flag = true;
    }
  });

  if (str.charAt(0) !== "#" || str.length !== 7 || flag) {
    /*輸入的數據無效：編碼 Hex 看起來像 #123456*/
    alert("Data entered incorrectly: Hex encoding looks like #123456");
    return false;
  }
  return true;
}

function isCmyk(c, m, y, k) {
  if (
    0 <= c &&
    c <= 100 &&
    0 <= m &&
    m <= 100 &&
    0 <= y &&
    y <= 100 &&
    0 <= k &&
    k <= 100
  ) {
    return true;
  }
  alert(
    /*輸入的數據無效：CMYK 值必須至少為 0%，最多為 100%.*/
    "Data entered incorrectly: CMYK values must be at least 0% and at most 100%."
  );
  return false;
}

function isXyz(x, y, z) {
  if (0 <= x && x <= 95.047 && 0 <= y && y <= 100 && 0 <= z && z <= 108.883) {
    return true;
  }
  alert(
    /*輸入的數據無效：有效值 0 <= x <= 95.047、0 <= y <= 100、0 <= z <= 108.88.*/
    "Invalid data entered: valid values 0 <= x <= 95.047, 0 <= y <= 100, 0 <= z <= 108.883."
  );
  return false;
}

function isLab(l, a, b) {
  if (0 <= l && l <= 100 && -128 <= a && a <= 128 && -128 <= b && b <= 128) {
    return true;
  }
  alert(
    /*輸入的數據無效：有效值 0 <= L <= 100，-128 <= y <= 128，-128 <= z <= 128.*/
    "Invalid data entered: valid values 0 <= L <= 100, -128 <= y <= 128, -128 <= z <= 128."
  );
  return false;
}

function isHsv(h, s, v) {
  if (0 <= h && h <= 360 && 0 <= s && s <= 100 && 0 <= v && v <= 100) {
    return true;
  }
  alert(
    /*輸入的數據無效：有效值 0 <= H <= 360, 0 <= s <= 100, 0 <= v <= 100.*/
    "Invalid data entered: valid values 0 <= H <= 360, 0 <= s <= 100, 0 <= v <= 100."
  );
  return false;
}

function isHsl(h, s, l) {
  if (0 <= h && h <= 360 && 0 <= s && s <= 100 && 0 <= l && l <= 100) {
    return true;
  }
  alert(
    /*輸入的數據無效：有效值 0 <= H <= 360、0 <= s <= 100、0 <= l <= 100.*/
    "Invalid data entered: valid values 0 <= H <= 360, 0 <= s <= 100, 0 <= l <= 100."
  );
  return false;
}



