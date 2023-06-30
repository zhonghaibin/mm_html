<template>
  <div class="StoreData">
    <div class="cell color1">
      <div class="title">预约总数</div>
      <div class="number">1</div>
      <div class="proportion">
        环比:
        <span class="red">+1</span>
      </div>
    </div>
    <div class="cell color2">
      <div class="title">新客数量</div>
      <div class="number">1</div>
      <div class="proportion">
        环比:
        <span class="red">+1</span>
      </div>
    </div>
    <div class="cell color3">
      <div class="title">进店客流</div>
      <div class="number">1</div>
      <div class="proportion">
        环比:
        <span class="red">+1</span>
      </div>
    </div>
    <div class="cell color4">
      <div class="title">项目数量</div>
      <div class="number">1</div>
      <div class="proportion">
        环比:
        <span class="red">+1</span>
      </div>
    </div>
    <div class="cell color5">
      <div class="title">服务人次</div>
      <div class="number">1</div>
      <div class="proportion">
        环比:
        <span class="red">+1</span>
      </div>
    </div>
    <div class="cell color6">
      <div class="title">老客续单</div>
      <div class="number">1</div>
      <div class="proportion">
        环比:
        <span class="red">+1</span>
      </div>
    </div>
    <div class="cell color7">
      <div class="title">服务人数</div>
      <div class="number">1</div>
      <div class="proportion">
        环比:
        <span class="red">+1</span>
      </div>
    </div>
    <div class="cell color8">
      <div class="title">新课成单</div>
      <div class="number">1</div>
      <div class="proportion">
        环比:
        <span class="red">+1</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'StoreData',
    data: function () {
      return {}
    },
  }
</script>

<style lang="less" scoped>
  .StoreData {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background: white;
    padding: 20px 0;

    .cell {
      border-radius: 20px;
      margin: 6px 10px;
      width: 40%;
      text-align: center;
      padding: 10px 0;
      cursor: pointer;

      .title {
        font-weight: bold;
      }

      .number {
        font-weight: bold;
        font-size: 20px;
      }

      .proportion {
      }

      .red {
        color: red;
      }

      .green {
        color: green;
      }
    }

    .color1 {
      background: #e6e7fb;
    }

    .color2 {
      background: #f7e6fb;
    }

    .color3 {
      background: #e0efef;
    }

    .color4 {
      background: #fcc7c7;
    }

    .color5 {
      background: #fceae8;
    }

    .color6 {
      background: #fceae8;
    }

    .color7 {
      background: #efe9e0;
    }

    .color8 {
      background: #efe9e0;
    }
  }
</style>
