<template>
  <div>
    <n-button
      type="primary"
      @click="restart">
      点击开始
    </n-button>
    <div>
      <div
        id="step-one"
        class="step shadow">
        第一步
      </div>
      <div
        id="step-two"
        class="step shadow">
        第二步
      </div>
      <div
        id="step-three"
        class="step shadow">
        第三步
      </div>
    </div>
  </div>
</template>



<script setup lang="ts" name="Driver">
  import Driver from 'driver.js'
  import 'driver.js/dist/driver.min.css'
  const steps = [
    {
      element: '#step-one',
      popover: {
        title: 'step1',
        description: '这里是第一步',
        position: 'bottom'
      }
    },
    {
      element: '#step-two',
      popover: {
        title: 'step2',
        description: '第二步',
        position: 'bottom'
      }
    },
    {
      element: '#step-three',
      popover: {
        title: 'step3',
        description: 'Step 3',
        position: 'bottom'
      },
      padding: 0
    }
  ]

  let driver: any

  onMounted(() => {
    driver = driver = new Driver({
      nextBtnText: '下一步',
      prevBtnText: '上一步',
      doneBtnText: '完成',
      closeBtnText: '关闭'
    })
  })

  function restart() {
    driver.defineSteps(steps)
    setTimeout(() => {
      driver.start()
    }, 0)
  }


</script>

<style lang="scss">
.step {
  margin: 20px 0;
  padding: 20px;
}
</style>
