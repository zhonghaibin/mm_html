<template>
  <div class="MonthlyTarget">
    <div class="header">
      <div class="l">月目标进度</div>
      <div class="r"></div>
    </div>
    <div class="content">
      <div class="cell">
        <div class="top">
          <div class="circle" style="width: 180px; height: 180px">
            <i-circle
              :percent="80"
              :size="180"
              stroke-color="#f19ec2"
              :stroke-width="10"
              :trail-width="10"
            >
              <div style="font-size: 14px">业绩月目标</div>
              <div style="font-size: 14px">80%</div>
            </i-circle>
          </div>
        </div>
        <div class="bottom">已完成32432%,超出232元</div>
      </div>
      <div class="cell">
        <div class="top">
          <div class="circle" style="width: 180px; height: 180px">
            <i-circle
              :percent="80"
              :size="180"
              stroke-color="#f19ec2"
              :stroke-width="10"
              :trail-width="10"
            >
              <div style="font-size: 14px">耗卡月目标</div>
              <div style="font-size: 14px">80%</div>
            </i-circle>
          </div>
        </div>
        <div class="bottom">已完成32432%,超出232元</div>
      </div>
      <div class="cell">
        <div class="top">
          <div class="circle" style="width: 180px; height: 180px">
            <i-circle
              :percent="80"
              :size="180"
              stroke-color="#f19ec2"
              :stroke-width="10"
              :trail-width="10"
            >
              <div style="font-size: 14px">客流月目标</div>
              <div style="font-size: 14px">80%</div>
            </i-circle>
          </div>
        </div>
        <div class="bottom">已完成32432%,超出232元</div>
      </div>
      <div class="cell">
        <div class="top">
          <div class="circle" style="width: 180px; height: 180px">
            <i-circle
              :percent="80"
              :size="180"
              stroke-color="#f19ec2"
              :stroke-width="10"
              :trail-width="10"
            >
              <div style="font-size: 14px">客次月目标</div>
              <div style="font-size: 14px">80%</div>
            </i-circle>
          </div>
        </div>
        <div class="bottom">已完成32432%,超出232元</div>
      </div>
      <div class="cell">
        <div class="top">
          <div class="circle" style="width: 180px; height: 180px">
            <i-circle
              :percent="80"
              :size="180"
              stroke-color="#f19ec2"
              :stroke-width="10"
              :trail-width="10"
            >
              <div style="font-size: 14px">客数月目标</div>
              <div style="font-size: 14px">80%</div>
            </i-circle>
          </div>
        </div>
        <div class="bottom">已完成32432%,超出232元</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MonthlyTarget',
  }
</script>

<style lang="less" scoped>
  .MonthlyTarget {
    width: 100%;
    background: white;

    .header {
      padding: 10px;
      display: flex;

      .l {
        font-weight: bold;
        flex: 1;
      }

      .r {
      }
    }

    .content {
      display: flex;
      justify-content: space-between;

      .cell {
        font-weight: bold;
        display: flex;
        justify-content: center;
        text-align: center;
        margin: 10px 20px;
        flex-direction: column;

        .top {
          margin: 0 auto;
        }

        .bottom {
          padding: 10px;
        }
      }
    }
  }
</style>
