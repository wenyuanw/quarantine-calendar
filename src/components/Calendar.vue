<script setup lang="ts">
// @ts-ignore
import { ref, reactive, computed } from 'vue'
import domtoimage from 'dom-to-image'
import { Calendar } from 'v-calendar'
import { dateToNum, getCurDate } from '../utils/tool'

const days: any[] = reactive([])
const start = ref('2022-03-13')
const end = ref(getCurDate())

const onDayClick = (day: any) => {
  const idx = days.findIndex((d) => d.id === day.id)
  if (idx >= 0) {
    days.splice(idx, 1)
  } else {
    days.push({
      id: day.id,
      date: day.date,
    })
  }
}

const dateInRang = (id: any) => {
  const idNum = dateToNum(id)
  const startNum = dateToNum(start.value)
  const endNum = dateToNum(end.value)
  return idNum >= startNum && idNum <= endNum
}

const savePictureRef = ref(null)
const keepPicture = () => {
  domtoimage
    .toPng(savePictureRef.value as any, { quality: 1 })
    .then(function (dataUrl: any) {
      let img = new Image();
      img.src = dataUrl;
      document.body.appendChild(img);
    })
}

const savePicture = () => {
  domtoimage
    .toPng(savePictureRef.value as any, { quality: 1 })
    .then(function (dataUrl: any) {
      let link = document.createElement('a')
      link.download = '隔离日历.png'
      link.href = dataUrl
      link.click()
    })
}
</script>

<template>
  <h2>隔离日历</h2>
  <p class="user-tips">使用说明：
    <br>1. 选择隔离起始时间
    <br>2. 点击表情包即可添加核酸检测图标
    <br>3. 点击「生成图片」，长按页面最下方生成的图片进行保存即可。
    <br>4. 或点击「下载图片」，则会下载图片。
    <h4>注意事项</h4>
    建议使用手机截图分享，因为目前生成图片清晰度较低，
    <br>且存在 Bug，在 IOS 中生成的图片无法正常显示。
  </p>
  <div class="date-box">
    <h4>选择隔离起始时间</h4>
    <input type="date" v-model="start" />
    -
    <input type="date" v-model="end" />
  </div>
  <button class="save-btn" @click="keepPicture()">生成图片</button>
  <button class="save-btn" @click="savePicture()">下载图片</button>
  <div class="calendar-box" ref="savePictureRef">
    <Calendar :rows="3" :attributes="days" :step="1" :max-date="new Date()" is-expanded>
      <template v-slot:day-content="{ day }">
        <div class="diy-title flex flex-col h-full z-10 overflow-hidden" @click="onDayClick(day)">
          <div class="day-box">
            <div v-show="!dateInRang(day.id)">{{ day.day }}</div>
            <input v-show="dateInRang(day.id)" type="checkbox" />
          </div>
        </div>
      </template>
    </Calendar>
  </div>
  <a href="https://github.com/wenyuanw/quarantine-calendar">GitHub</a>
</template>

<style>
h4 {
  margin: 10px auto;
}

.user-tips {
  text-align: left;
}

.day-box {
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
}

.save-btn {
  display: block;
  margin: 10px auto;
}

.calendar-box {
  width: max-content;
  padding: 3px;
  background-color: rgba(255, 255, 255, 0);
}

input[type='checkbox'] {
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0);
  -moz-appearance: none;
  -webkit-appearance: none;
  border: 1px solid #c9c9c9;
  border-radius: 2px;
  outline: none;
  background: url('../assets/quarantine.png') no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
}

input[type='checkbox']:checked {
  background: url('../assets/test2.jpg') no-repeat;
  background-size: 100% 100%;
  color: #ece3e3;
  content: '';
}
</style>
