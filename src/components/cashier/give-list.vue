<template>
  <div class="GiveList">
    <div class="row">
      <div class="row-title">赠送项目</div>
      <div class="row-add">
        <Icon class="add-icon" type="ios-add-circle-outline" />
      </div>
      <div class="tag">
        <Tag closable color="primary">标签三</Tag>
      </div>
    </div>
    <div class="row">
      <div class="row-title">赠送商品</div>
      <div class="row-add">
        <Icon
          class="add-icon"
          type="ios-add-circle-outline"
          @click="showModal('赠送商品', 'GiveGoods')"
        />
      </div>
      <div class="tag">
        <Tag closable color="primary">标签三</Tag>
      </div>
    </div>
    <div class="row">
      <div class="row-title">赠送卡</div>
      <div class="row-add">
        <Icon class="add-icon" type="ios-add-circle-outline" />
      </div>
      <div class="tag">
        <Tag closable color="primary">标签三</Tag>
      </div>
    </div>
    <div class="row">
      <div class="row-title">赠送券</div>
      <div class="row-add">
        <Icon class="add-icon" type="ios-add-circle-outline" />
      </div>
      <div class="tag">
        <Tag closable color="primary">标签三</Tag>
      </div>
    </div>
    <Modal
      v-model="modal.show"
      :footer-hide="true"
      :scrollable="modal.scrollable"
      :styles="modal.styles"
      :title="modal.title"
      :width="modal.width"
    >
      <GiveGoods v-if="modalShow('GiveGoods')" />
    </Modal>
  </div>
</template>

<script>
  import GiveGoods from '@/components/cashier/give-list/give-goods'
  export default {
    name: 'GiveList',
    components: { GiveGoods },
    data: function () {
      return {
        modal: {
          show: false,
          title: '',
          type: false,
          width: 1000,
          scrollable: true,
          styles: { top: '50px' },
        },
      }
    },
    computed: {
      modalShow() {
        return (name) => {
          return this.modal.type === name && this.modal.show
        }
      },
    },
    activated() {},
    created() {},
    methods: {
      showModal(title, type, data = {}) {
        console.log(data)
        this.modal.width = 1000
        this.modal.show = true
        this.modal.title = title
        this.modal.type = type
      },
    },
  }
</script>

<style lang="less" scoped>
  .GiveList {
    .add-icon,
    .del-icon {
      font-size: 16px;
      color: #00b8ec;
      cursor: pointer;
    }
    .tag {
      display: flex;
      flex-flow: wrap;
    }
    .row {
      align-items: center;
      padding: 2px 10px;
      display: flex;
      justify-content: left;
      .row-title {
      }
      .row-add {
        padding: 0 10px;
      }
    }
  }
</style>
