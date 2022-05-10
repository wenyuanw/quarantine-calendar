<script setup lang="ts">
import { reactive, computed } from 'vue'
import { Calendar, DatePicker } from 'v-calendar'

const days: any[] = reactive([])

const onDayClick = (day: any) => {
  console.log(day)
  const idx = days.findIndex(d => d.id === day.id)
  if (idx >= 0) {
    days.splice(idx, 1);
  } else {
    days.push({
      id: day.id,
      date: day.date,
    })
  }
  console.log('days', days);
}

const attributes = computed(() => {
  const dates = days.map(day => day.date)
  return dates.map((date: any) => ({
    highlight: true,
    dates: date,
  }))
})

</script>

<template>
  <Calendar :rows="3" :attributes="attributes" @dayclick="onDayClick" />
</template>

<style scoped>
</style>
