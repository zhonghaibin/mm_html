<template>
  <div class="CardInfo">
    <div class="vin-info">
      <div class="content">
        <div class="head">
          <Avatar
            class="img"
            src="https://cdn.learnku.com//uploads/communities/WtC3cPLHzMbKRSZnagU9.png!/both/44x44"
          />
        </div>
        <div class="info">
          <div class="row">
            <div class="cell">
              <div>
                <span class="name">张三(老)</span>
                k0001 铂金会员
              </div>
            </div>
            <div class="cell"></div>
          </div>
          <div class="row">
            <div class="cell">
              <div>15856252354</div>
            </div>
            <div class="cell">所属门店：分店1</div>
            <div class="cell"></div>
          </div>
          <div class="row">
            <div class="cell">
              <div>持有效卡：5张</div>
            </div>
            <div class="cell">卡余额：￥34243</div>
            <div class="cell">欠款：￥34243</div>
          </div>
          <div class="row">
            <div class="cell">
              <div>上次消费：2021/12/12 19:21 骨盆修复*1（耗卡）</div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="text">会员详情 ></div>
        </div>
      </div>
    </div>
    <div class="appointment-info">
      <div class="head">预约信息</div>
      <div class="info">
        <div class="row">
          <div class="left">时间：</div>
          <div class="right">2022/5/1 13:00~14:00</div>
        </div>
        <div class="row">
          <div class="left">产康师：</div>
          <div class="right">王五</div>
        </div>
        <div class="row">
          <div class="left">房间：</div>
          <div class="right">未指定</div>
        </div>
        <div class="row">
          <div class="left">项目：</div>
          <div class="right">骨盆修复(第3次)、腹直肌修复(第2次)</div>
        </div>
        <div class="row">
          <div class="left">备注：</div>
          <div class="right">未指定</div>
        </div>
        <div class="row">
          <div class="left">专属顾问：</div>
          <div class="right">未指定</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="bt color1">确认预约</div>
      <div class="bt color2">确认到店</div>
      <div class="bt color2">修改预约</div>
      <div class="bt color2">收银</div>
      <div class="bt color2">取消预约</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CardInfo',
  }
</script>

<style lang="less" scoped>
  .CardInfo {
    .vin-info {
      background: #f19ec2;
      border-radius: 8px;

      .content {
        padding: 10px 0;
        display: flex;

        .head {
          padding: 20px 10px;

          .img {
            border-radius: 60px;
            height: 80px;
            width: 80px;
            overflow: hidden;
          }
        }

        .info {
          width: 500px;
          color: white;
          font-size: 14px;

          .row {
            padding: 2px 0;
            display: flex;

            .cell {
              .name {
                font-size: 18px;
                font-weight: bold;
              }

              flex: 1;
              padding: 2px 0;
            }
          }
        }

        .right {
          flex: 1;
          display: flex;
          justify-content: flex-end;

          .text {
            padding: 4px 8px;
            color: white;
            cursor: pointer;
          }
        }
      }
    }

    .appointment-info {
      margin: 10px 0;
      padding: 2px;

      .head {
        font-weight: bold;
        font-size: 16px;
        padding: 10px 0;
      }

      .info {
        width: 500px;
        font-size: 15px;

        .row {
          padding: 2px 0;
          display: flex;

          .left {
            padding: 4px 0;
          }

          .right {
            flex: 1;
            padding: 4px 0;
          }
        }
      }
    }

    .footer {
      display: flex;

      .bt {
        text-align: center;
        flex: 1;
        padding: 12px 0;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
      }

      .color1 {
        background: #f5f5f5;
      }

      .color2 {
        background: #fdf1f6;
        color: #f19ec2;
      }
    }
  }
</style>
