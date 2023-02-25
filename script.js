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


