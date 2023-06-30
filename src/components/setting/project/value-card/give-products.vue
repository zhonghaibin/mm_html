<template>
  <div class="GiveProducts">
    <div class="left">
      <div class="title">添加购卡赠送内容</div>
      <div class="search">
        <div class="left">
          <div class="box">
            <div class="text">搜索：</div>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="l">
          <div v-for="(item, index) in columns" :key="index">
            <Checkbox
              v-model="item.value"
              :false-value="0"
              :true-value="1"
              @on-change="firstColumns(item)"
            />
            <span
              class="name"
              :class="current === item.type ? 'active' : ''"
              @click="active(item)"
            >
              {{ item.name }}
            </span>
          </div>
        </div>
        <div class="r">
          <div v-for="(item, index) in columns" :key="index">
            <div v-if="current === item.type">
              <div v-if="item.children.length > 0">
                <div v-for="(child, key) in item.children" :key="key">
                  <Checkbox
                    v-model="child.value"
                    :false-value="0"
                    :true-value="1"
                    @on-change="addRow(child)"
                  >
                    {{ child.name }}
                  </Checkbox>
                </div>
              </div>
              <div v-else>暂无数据</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="title">已选内容</div>
      <div class="list">
        <table
          style="width: 100%; text-align: center; border: 1px solid #eeeeee"
        >
          <tr style="background: #fdf1f6; height: 32px">
            <td>内容</td>
            <td>价格</td>
            <td>赠送数量</td>
            <td>赠送时长</td>
            <td>操作</td>
          </tr>
          <tr v-for="(item, index) in list" :key="index" style="height: 32px">
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td>
              <Input
                v-model="item.num"
                placeholder="请输入数量"
                size="small"
                style="width: 100px"
              />
              张
            </td>
            <td>
              <div style="padding: 10px">
                <Radio v-model="item.longTime.limit" label="1">不限次</Radio>
                <Radio v-model="item.longTime.limit" label="2">固定时长</Radio>
              </div>
              <div v-if="item.longTime.limit === '2'">
                <Input
                  v-model="item.longTime.limitTime.number"
                  class="input-with-select"
                  placeholder="请输入数字"
                  size="small"
                  style="width: 120px"
                >
                  <Select
                    v-model="item.longTime.limitTime.timeType"
                    slot="append"
                    placeholder="请选择"
                  >
                    <Option label="年" value="year" />
                    <Option label="月" value="month" />
                    <Option label="日" value="day" />
                  </Select>
                </Input>
              </div>
            </td>
            <td>
              <span class="bt" @click="delRow(index)">删除</span>
            </td>
          </tr>
        </table>
        <div style="display: flex; justify-content: end; padding: 10px">
          <td colspan="2">
            <div class="add-bt" @click="save">保存</div>
          </td>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'GiveProducts',
    props: {
      data: {
        type: Array,
        default: () => {
          return []
        },
      },
    },
    data: function () {
      return {
        current: 0,
        columns: [
          {
            name: '全部项目',
            value: 0,
            type: 1,
            children: [],
          },
          {
            name: '全部商品',
            value: 0,
            type: 2,
            children: [],
          },
          {
            name: '全部套餐次卡',
            value: 0,
            type: 3,
            children: [],
          },
        ],
        list: [],
        options: [],
      }
    },
    created() {
      this.columns.forEach((item, index) => {
        this.getData(item, index)
      })

      this.initData()
      this.searchData()
    },
    methods: {
      initData() {
        this.current = 0
        if (this.data.length > 0) {
          this.columns.forEach((item) => {
            let count = 0
            item.children.forEach((val) => {
              this.data.forEach((row) => {
                if (row.id === val.id && row.type === val.type) {
                  val.value = 1
                  count++
                  if (this.current === 0) {
                    this.current = row.type
                  }
                }
              })
            })
            if (item.children.length > 0 && item.children.length === count) {
              item.value = 1
            }
          })
          this.list = this.data
        }
      },
      searchData() {
        let options = []
        this.columns.forEach((item) => {
          let children = []
          item.children.forEach((val) => {
            children.push({
              label: val.name,
              value: val,
            })
          })
          options.push({
            label: item.name,
            value: item,
            children: children,
          })
        })
        console.log(options, 'options')
        this.options = options
      },
      search(data) {
        if (data.length > 0) {
          this.add(data[data.length - 1])
        }
      },
      delRow(index) {
        let row = this.list[index]
        this.columns[row.type - 1].value = 0
        this.columns[row.type - 1].children.forEach((item) => {
          if (row.id === item.id && row.type === item.type) {
            item.value = 0
          }
        })
        this.list.splice(index, 1)
      },
      addRow(item) {
        switch (item.value) {
          case 1:
            this.add(item)
            break
          case 0:
            this.del(item)
            break
        }
      },
      del(row) {
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].type === row.type && this.list[i].id === row.id) {
            this.delRow(i)
            break
          }
        }
      },
      add(row) {
        let is_add = true
        let count = 0
        this.list.forEach((item) => {
          if (row.id === item.id && row.type === item.type) {
            is_add = false
          }
          if (row.type === item.type) {
            count++
          }
        })
        if (is_add) {
          this.list.push({
            id: row.id,
            name: row.name,
            price: row.price,
            num: 1,
            type: row.type,
            longTime: {
              limit: '1',
              limitTime: {
                number: 1,
                timeType: 'year',
              },
            },
          })
        }
        if (this.columns[row.type - 1].children.length === count + 1) {
          this.columns[row.type - 1].value = 1
        }

        console.log('this.list', this.list)
      },
      addAll(row) {
        row.children.forEach((item) => {
          this.add(item)
        })
      },
      delAll(row) {
        let ids = row.children.map((item) => {
          return item.id
        })
        this.list = this.list.filter((item) => {
          if (item.type === row.type && ids.includes(item.id)) {
            console.log('item', item)
          } else {
            return item
          }
        })
      },
      active(item) {
        this.current = item.type
      },
      getData(row, index) {
        switch (row.type) {
          case 1:
            this.getProjectList(row, index)
            break
          case 2:
            this.getGoodsList(row, index)
            break
        }
      },

      firstColumns(item) {
        console.log(item)
        this.current = item.type
        switch (item.value) {
          case 1:
            this.checkAll(item)
            break
          case 0:
            this.checkCancel(item)
            break
        }
      },
      checkAll(row) {
        row.children.forEach((item) => {
          item.value = 1
        })
        this.addAll(row)
      },
      checkCancel(row) {
        row.children.forEach((item) => {
          item.value = 0
        })
        this.delAll(row)
      },
      child(list, type) {
        list.forEach((item) => {
          item.value = 0
          item.type = type
        })
        return list
      },
      getProjectList(item, index) {
        let list = []
        list = [
          {
            id: 1,
            name: '腹直肌修复',
            price: '10',
          },
          {
            id: 2,
            name: '腹直肌修复22',
            price: '10',
          },
        ]
        item.children = this.child(list, item.type)
        this.columns[index] = item
      },
      getGoodsList(item, index) {
        let list = []
        list = [
          {
            id: 1,
            name: '苹果',
            price: '6',
          },
          {
            id: 2,
            name: '苹果11',
            price: '6',
          },
        ]
        item.children = this.child(list, item.type)
        this.columns[index] = item
      },
      save() {
        console.log('list', this.list)
        this.$emit('data', this.list)
      },
    },
  }
</script>
<style lang="less" scoped>
  .GiveProducts {
    display: flex;
  }

  .title {
    height: 40px;
    line-height: 40px;
    font-weight: bold;
    font-size: 14px;
  }

  .search {
    display: flex;
    padding: 10px;
    background: white;

    .left {
      flex: 1;
      display: flex;
      align-items: center;

      .box {
        display: flex;
        align-items: center;
        margin-right: 20px;

        .text {
          font-weight: bold;
          margin: 0 5px;
          width: 56px;
        }
      }
    }
  }
  .left {
    width: 500px;
    margin-right: 10px;
  }

  .content {
    display: flex;
    border: 1px solid #eeeeee;
    min-height: 500px;
  }

  .name {
    cursor: pointer;
  }

  .name:hover {
    color: #409eff;
  }

  .active {
    color: #409eff;
  }

  .l {
    padding: 10px;
    border-right: 1px solid #eeeeee;
    width: 150px;
  }

  .r {
    padding: 10px;
    flex: 1;
  }

  .right {
    padding: 0 20px;
    flex: 1;
    border: 1px solid #eeeeee;
  }

  .list {
  }

  .bt {
    color: #1298e6;
    cursor: pointer;
  }
  .add-bt {
    color: white;
    cursor: pointer;
    background: #f19ec2;
    padding: 0 14px;
    height: 32px;
    line-height: 32px;
    border-radius: 4px;
    margin-left: 10px;
    font-size: 12px;
  }
</style>
