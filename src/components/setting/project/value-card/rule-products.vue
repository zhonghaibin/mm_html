<template>
  <div class="RuleProducts">
    <div class="left">
      <div class="title">设置使用规则</div>
      <div class="search">
        <div class="left">
          <div class="box">
            <div class="text">搜索：</div>
            <Select
              ref="selectbox"
              v-model="search.keyword"
              clearable
              filterable
              :loading="search.loading"
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              size="small"
              @on-change="selectChange"
            >
              <Option
                v-for="item in search.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </Select>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="l">
          <my-tree
            :data="columns"
            @change="change"
            @clear="clear"
            @end-check="endCheck"
          />
        </div>
        <div class="r">
          <div v-for="(item, index) in detailsList" :key="index">
            <Checkbox
              v-model="item.checked"
              :disabled="item.disabled"
              :false-value="0"
              :true-value="1"
              @on-change="check(item)"
            >
              {{ item.name }}
            </Checkbox>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="title">已选内容</div>
      <div class="content">
        <div class="content-left">
          <div class="list">
            <table
              style="width: 100%; text-align: center; border: 1px solid #eeeeee"
            >
              <tr style="background: #fdf1f6; height: 32px">
                <td>内容</td>
                <td>价格</td>
                <td>操作</td>
              </tr>
              <tr
                v-for="(item, index) in list"
                :key="index"
                :class="[isActive(item) ? 'isActive' : '']"
                style="height: 32px; cursor: pointer"
                @click="currentRow(item, index)"
              >
                <td>{{ item.name }}</td>
                <td>{{ item.price }}</td>
                <td>
                  <span class="bt" @click.stop="delRow(index)">删除</span>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div class="content-right">
          <div v-if="current" class="list">
            <table
              style="width: 100%; text-align: center; border: 1px solid #eeeeee"
            >
              <tr style="background: #fdf1f6; height: 32px">
                <td>{{ current.name }}</td>
                <td>
                  批量设置折扣：
                  <Input
                    v-model="discount"
                    placeholder="折扣在0-1之间"
                    size="small"
                    style="width: 200px"
                    @on-blur="batchDiscount"
                  />
                </td>
                <td>操作</td>
              </tr>
              <template v-for="(item, index) in list">
                <template v-if="isExist(current, item)">
                  <tr
                    v-for="(val, key) in item.shopList"
                    :key="`${index}_${key}`"
                    style="height: 32px"
                  >
                    <td>{{ val.name }}</td>
                    <td>
                      <Input
                        v-model="val.discount"
                        placeholder="折扣在0-1之间"
                        size="small"
                        style="width: 200px"
                        @on-blur="setDiscount(val)"
                      />
                    </td>
                    <td>
                      <span class="bt" @click.stop="delShop(item, index)">
                        删除
                      </span>
                    </td>
                  </tr>
                </template>
              </template>
            </table>
          </div>
        </div>
      </div>
      <div style="display: flex; justify-content: end; padding: 10px">
        <div class="add-bt" @click="save">保存</div>
      </div>
    </div>
  </div>
</template>
<script>
  import MyTree from '@/components/my-tree/my-tree'
  import Vue from 'vue'
  export default {
    name: 'RuleProducts',
    components: { MyTree },
    provide() {
      return {
        myTree: this.myTree,
      }
    },
    props: {
      data: {
        type: Array,
        default: () => {
          return []
        },
      },
      shopList: {
        type: Array,
        default: () => [],
      },
    },
    data: function () {
      return {
        myTree: new Vue(),
        columns: [
          {
            id: 0,
            type: 1,
            name: '全部商品',
            checked: 0,
            price: 0,
            children: [
              {
                id: 1,
                type: 1,
                name: '葡萄',
                checked: 0,
                price: 0,
                children: [
                  {
                    id: 2,
                    type: 1,
                    name: '葡萄1',
                    checked: 0,
                    price: 0,
                    children: [
                      {
                        id: 3,
                        type: 1,
                        name: '葡萄221',
                        checked: 0,
                        price: 0,
                        children: [],
                      },
                      {
                        id: 4,
                        type: 1,
                        name: '葡萄21',
                        checked: 0,
                        price: 0,
                        children: [],
                      },
                    ],
                  },
                ],
              },
              {
                id: 5,
                type: 1,
                name: '苹果',
                checked: 0,
                price: 0,
                children: [
                  {
                    id: 6,
                    type: 1,
                    name: '苹果1',
                    checked: 0,
                    price: 0,
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
        list: [],
        detailsList: [],
        current: null,
        discount: '',
        index: '',
        search: {
          loading: false,
          keyword: '',
          options: '',
          list: [],
        },
      }
    },

    computed: {
      isActive() {
        return (data) => {
          return this.current && this.current.name === data.name
        }
      },
      isExist() {
        return (current, item) => {
          return current.type === item.type && current.id === item.id
        }
      },
      isEnd() {
        return (data) => {
          return !data.menu
        }
      },
    },
    created() {
      this.initData()
    },
    methods: {
      currentRow(data, index) {
        this.current = data
        this.index = index
        this.discount = ''
      },
      initData() {
        setTimeout(() => {
          this.list = this.data
          this.list.forEach((data) => {
            this.setDisabled(data)
          })
        }, 1000)
      },
      clear(data) {
        this.detailsList = data
      },
      endCheck(data) {
        //获取详情数据
        let list = this.getData(data)
        // //判断是否全选
        if (data.checked === 1) {
          list.forEach((item) => {
            item.disabled = true
            item.checked = 0
            item.checked = Number(item.checked)
          })
        } else {
          list.forEach((item) => {
            item.disabled = false
            item.checked = 0
            item.checked = Number(item.checked)
          })
        }
        let checked = true
        this.list.forEach((item) => {
          list.forEach((val) => {
            if (this.isExist(item, val)) {
              val.checked = 1
              checked = false
            }
          })
        })
        if (data.disabled && checked) {
          list.forEach((val) => {
            val.disabled = true
          })
        }

        this.detailsList = list
      },
      getData(data) {
        if (data.id === 3) {
          return [
            {
              id: 222,
              type: 1,
              name: '水果1' + data.name + '_id:' + data.id,
              checked: 0,
              price: 0,
              pid: data.id,
            },
            {
              id: 333,
              type: 1,
              name: '水果2' + data.name + '_id:' + data.id,
              checked: 0,
              price: 0,
              pid: data.id,
            },
          ]
        } else {
          return [
            {
              id: 77,
              type: 1,
              name: '水果1' + data.name + '_id:' + data.id,
              checked: 0,
              price: 0,
              pid: data.id,
            },
            {
              id: 55,
              type: 1,
              name: '水果2' + data.name + '_id:' + data.id,
              checked: 0,
              price: 0,
              pid: data.id,
            },
          ]
        }
      },
      change(data) {
        switch (data.checked) {
          case 1:
            this.addRow(data)
            break
          case 0:
            this.del(data)
            break
        }
      },
      del(data) {
        for (let i = 0; i < this.list.length; i++) {
          if (this.isExist(data, this.list[i])) {
            this.delRow(i)
            break
          }
        }
      },
      check(data) {
        switch (data.checked) {
          case 1:
            this.addRow(data)
            break
          case 0:
            this.del(data)
            break
        }
        if (this.isEnd(data)) {
          //最后一项
          let flag = false
          this.detailsList.forEach((item) => {
            if (item.checked === 1) {
              flag = true
            }
          })
          data = {
            id: data.pid,
            type: data.type,
            disabled: flag,
            checked: 0,
          }
          this.myTree.$emit('check', data)
        }
      },
      getEndParent(data) {
        let flag = false
        this.list.forEach((val) => {
          if (this.isEnd(val) && data.pid === val.pid && data.pid > 0) {
            flag = true
          }
        })
        data = {
          id: data.pid,
          type: data.type,
          disabled: flag,
          checked: 0,
        }
        return data
      },
      setDisabled(data, type) {
        if (this.isEnd(data)) {
          //最后一项
          data = this.getEndParent(data)
        } else {
          if (type === 'del') {
            data.checked = 0
            data.disabled = false
          } else {
            //初始化数据使用
            data.checked = 1
          }
        }
        this.myTree.$emit('check', data)
      },
      addRow(data) {
        let flag = true
        for (let i = 0; i < this.list.length; i++) {
          if (this.isExist(data, this.list[i])) {
            flag = false
            break
          }
        }
        if (flag) {
          let menu = !!data.menu
          this.list.push({
            id: data.id,
            name: data.name,
            price: data.price,
            type: data.type,
            menu: menu,
            shopList: this.shopDiscount(),
            pid: menu ? -1 : data.pid,
          })
        }
      },
      shopDiscount() {
        let shopList = []
        this.shopList.forEach((item) => {
          shopList.push({
            id: item.id,
            name: item.name,
            discount: '',
          })
        })
        return shopList
      },
      delRow(index) {
        let row = this.list[index]
        this.list.splice(index, 1)
        this.setDisabled(row, 'del')
      },
      delShop(data, index) {
        data.shopList.splice(index, 1)
      },

      checkDiscount(discount) {
        return (
          discount.toString().replace(/^(?!0\.(?!0{2})\d{1,2}$).+$/, '') !== ''
        )
      },

      batchDiscount() {
        if (!this.checkDiscount(this.discount)) {
          this.discount = ''
          return false
        }
        if (this.list[this.index]) {
          this.list[this.index].shopList.forEach((item) => {
            item.discount = this.discount
          })
        }
      },

      setDiscount(data) {
        if (!this.checkDiscount(data.discount)) {
          data.discount = ''
        }
      },
      selectChange(data) {
        if (data) {
          data = JSON.parse(data)
          this.addRow(data)
          this.setDisabled(data)
          this.search.keyword = ''
          this.$refs.selectbox.clearSingleSelect()
        }
      },
      remoteMethod(query) {
        if (query !== '') {
          this.search.loading = true
          this.search.list = this.getData({ id: 3 }).map((item) => {
            return { value: `${JSON.stringify(item)}`, label: `${item.name}` }
          })
          setTimeout(() => {
            this.search.loading = false
            this.search.options = this.search.list
          }, 200)
        } else {
          this.search.options = []
        }
      },
      save() {
        try {
          this.list.forEach((row) => {
            row.shopList.forEach((item) => {
              if (!item.discount) {
                throw Error(`${row.name}:${item.name} 折扣未设置`)
              }
            })
          })
          this.$emit('data', this.list)
        } catch (e) {
          this.$Message.error(e.message)
        }
      },
    },
  }
</script>
<style lang="less" scoped>
  .isActive {
    background: #f3f3f3;
  }

  .RuleProducts {
    display: flex;
  }

  .title {
    height: 40px;
    line-height: 40px;
    font-weight: bold;
    font-size: 14px;
    text-indent: 0.5em;
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

  .content-left {
    margin-right: 10px;
    flex: 1;
  }

  .content-right {
    margin-left: 10px;
    flex: 1;
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
    min-width: 150px;
  }

  .r {
    padding: 10px;
    flex: 1;
  }

  .right {
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
