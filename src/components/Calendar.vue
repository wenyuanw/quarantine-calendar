<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { Calendar } from 'v-calendar'
import { dateToNum, getCurDate } from '../utils/tool';

const days: any[] = reactive([])
const start = ref('2022-03-13')
const end = ref(getCurDate())

const onDayClick = (day: any) => {
  console.log(day.id)
  const idx = days.findIndex(d => d.id === day.id)
  if (idx >= 0) {
    days.splice(idx, 1);
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
</script>

<template>
  <h2>隔离日历</h2>
  <p>使用说明：选择隔离起始时间，点击表情包即可添加核酸检测图标</p>
  <div>
    <h3>隔离起始时间</h3>
    <input type="date" v-model="start">
    -
    <input type="date" v-model="end">
  </div>
  <Calendar :rows="3" :attributes="days" :step="1" :max-date="new Date()">
    <template v-slot:day-content="{ day }">
      <div class="diy-title flex flex-col h-full z-10 overflow-hidden" @click="onDayClick(day)">
        <div class="day-box">
          <div v-show="!dateInRang(day.id)">{{ day.day }}</div>
          <input v-show="dateInRang(day.id)" type="checkbox">
        </div>
      </div>
    </template>
  </Calendar>
</template>

<style scoped>
.day-box {
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
}

input[type='checkbox'] {
  width: 40px;
  height: 40px;
  background-color: #fff;
  -webkit-appearance: none;
  border: 1px solid #c9c9c9;
  border-radius: 2px;
  outline: none;
  background: url("../assets/quarantine.png") no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
}

input[type=checkbox]:checked {
  background: url("../assets/test.jpg") no-repeat;
  background-size: 100% 100%;
}
</style>
