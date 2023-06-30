<template>
  <content>
    <div v-for="(item, index) in list" :key="index" class="cell">
      <div class="b">
        <div class="box1">{{ title }}</div>
        <div class="box2">
          <SearchStaffList v-model="item.staff_id" />
        </div>
      </div>
      <div class="b">
        <div class="box1">业绩</div>
        <div class="box2">
          <Input
            v-model="item.yeji"
            placeholder=""
            size="small"
            style="width: 80px"
          />
        </div>
      </div>
      <div class="b">
        <div class="box1">比例</div>
        <div class="box2">
          <Input
            v-model="item.bili"
            placeholder=""
            size="small"
            style="width: 80px"
          />
          <Icon
            v-if="index === 0"
            class="add-icon"
            type="ios-add-circle-outline"
            @click="add()"
          />
          <Icon
            v-else
            class="del-icon"
            type="ios-remove-circle-outline"
            @click="del(index)"
          />
        </div>
      </div>
    </div>
  </content>
</template>

<script>
  import SearchStaffList from '@/components/form/search-staff-list'
  export default {
    name: 'StaffPerformance',
    components: { SearchStaffList },
    props: {
      title: {
        type: String,
        default: '',
      },
    },
    data: function () {
      return {
        list: [
          {
            staff_id: '',
            yeji: '',
            bili: '',
          },
        ],
      }
    },
    methods: {
      add() {
        this.list.push({
          staff_id: '',
          yeji: '',
          bili: '',
        })
      },
      del(index) {
        this.list.splice(index, 1)
      },
    },
  }
</script>

<style lang="less" scoped>
  .cell {
    flex: 1;
    display: flex;
    align-items: center;
  }
  .add-icon,
  .del-icon {
    font-size: 16px;
    color: #00b8ec;
    cursor: pointer;
  }
  .b {
    align-items: center;
    display: flex;
    justify-content: center;

    .box1 {
      padding: 10px;
    }

    .box2 {
      padding: 2px;
    }

    padding: 2px;
  }
</style>
