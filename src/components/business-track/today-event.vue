<template>
  <div ref="TodayEvent" class="TodayEvent">
    <div class="box">
      <TodayAppointment />
    </div>
    <div class="box">
      <TodayImportantDate />
    </div>
    <div class="box">
      <TodayRemindEvent />
    </div>
    <div class="box">
      <TodayDueService />
    </div>
  </div>
</template>
<script>
  import TodayAppointment from '@/components/business-track/today-event/today-appointment'
  import TodayImportantDate from '@/components/business-track/today-event/today-important-date'
  import TodayRemindEvent from '@/components/business-track/today-event/today-remind-event'
  import TodayDueService from '@/components/business-track/today-event/today-due-service'

  export default {
    name: 'TodayEvent',
    components: {
      TodayAppointment,
      TodayImportantDate,
      TodayRemindEvent,
      TodayDueService,
    },
    data: function () {
      return {}
    },
    mounted() {
      this.setHeight()
      window.onresize = () => {
        this.setHeight()
      }
    },
    methods: {
      setHeight() {
        let divHeight = window.innerHeight - 140
        this.$refs.TodayEvent.style.minHeight = divHeight + 'px'
      },
    },
  }
</script>
<style lang="less" scoped>
  .TodayEvent {
    background: white;
    display: flex;
    flex-flow: wrap;
    padding-bottom: 10px;

    .box {
      padding: 10px 10px 0 10px;
      width: 50%;
      border-radius: 6px;
    }
  }
</style>
