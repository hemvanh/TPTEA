<template>
  <div class="member-info">
    <div class="header-member shadow-4">
      <div class="display-member">
        <img class="icon-member shadow-1" src="~assets/quasar-logo.png" width="40" height="40" />
        <span>{{getMemberInfo.name}}</span>
      </div>
      <span>{{getMemberInfo.points}}</span>
      <i class="material-icons points ">stars</i>
    </div>
    <div class="content-member">
      <q-list no-border class="q-mt-md">
        <q-item class="q-pt-md q-pb-md" @click.native="fetchRecs">
          <q-item-side icon="attach_money" />
          <q-item-main label="Balance" />
          <q-item-side right>
            <q-item-tile color="brown-14">{{'$'+getMemberInfo.balance}}</q-item-tile>
          </q-item-side>
        </q-item>
        <q-item class="q-pt-md q-pb-md" link @click.native="openOrderHistory()">
          <q-item-side icon="hourglass_empty" />
          <q-item-main label="Order History" />
          <q-item-side right icon="keyboard_arrow_right" />
        </q-item>
        <q-item class="q-pt-md q-pb-md">
          <q-item-side icon="language" />
          <q-item-main label="Language" />
          <q-item-side right>
            <q-radio v-model="language" val="en" label="EN" color="brown-14" />
            <q-radio v-model="language" val="cn" label="CN" color="brown-14" style="margin-left: 10px" />
          </q-item-side>
        </q-item>
        <q-item class="q-pt-md q-pb-md">
          <q-item-side icon="notification_important" />
          <q-item-main label="Nofications" />
          <q-item-side right>
            <q-toggle v-model="checked" color="brown-14" />
          </q-item-side>
        </q-item>
        <q-item class="q-pt-md q-pb-md" link @click.native="logout">
          <q-item-side icon="power_settings_new" />
          <q-item-main label="Sign Out" />
        </q-item>
      </q-list>
    </div>
    <q-modal v-model="hideModal" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <q-modal-layout>
        <q-page-sticky position="bottom-right z-max" :offset="[25, -30]">
          <q-btn round color="brown-4" v-back-to-top.animate="{offset: 20, duration: 200}" icon="keyboard_arrow_up" />
        </q-page-sticky>
        <q-toolbar slot="header" color="brown-2">
          <div class="total-pay">
            <div @click="hideModal=false">
              <i aria-hidden="true" class="q-icon material-icons clsIcon">close</i>
            </div>
            <div class="q-mr-md">Total Spent</div>
            <div>{{totalSpent}}</div>
          </div>
        </q-toolbar>
        <div>
          <q-table v-for="(order,index) in getOrderHistory" :key="order.createdAt+index" :data="order.OrderDetails" :columns="getCols" row-key="name" class="no-shadow q-pb-sm bg-order-info">
            <q-td slot="body-cell-price" slot-scope="props" :props="props">
              <span>{{ `$${props.value}` }}</span>
            </q-td>
            <div slot="top" slot-scope="props">
              <span>{{`Order Info (${formatDate(order.createdAt)})`}}</span>
            </div>
            <div slot="bottom" slot-scope="props" key="price" class="row fit">
              <div style="width:80%">Total</div>
              <div style="padding-left:14px">{{order.OrderDetails|totalPrice}}</div>
            </div>
          </q-table>
        </div>
      </q-modal-layout>
    </q-modal>
  </div>
</template>
<script>
import _ from 'lodash'
import {mapActions, mapGetters} from 'vuex'
export default {
  data() {
    return {
      checked: true,
      language: 'en',
      hideModal: false,
    }
  },
  filters: {
    totalPrice(data) {
      return '$' + _.sumBy(data, 'price')
    },
  },
  computed: {
    ...mapGetters('member', ['getMemberInfo', 'getCols']),
    ...mapGetters('order', ['getOrderHistory']),
    totalSpent() {
      var total = 0
      _.forEach(this.getOrderHistory, ({OrderDetails}) => {
        total += _.sumBy(OrderDetails, 'price')
      })
      return '$' + total
    },
  },
  methods: {
    ...mapActions('member', ['fetchRecs']),
    ...mapActions('order', ['fetchOrderHistory']),
    openOrderHistory() {
      this.hideModal = true
      this.fetchOrderHistory()
    },
    formatDate(date) {
      return date.split('T')[0]
    },
    logout() {
      localStorage.removeItem('auth-token')
      this.$router.push('/')
    },
  },
  mounted() {
    this.fetchRecs()
  },
}
</script>
<style>
.q-table-top {
  min-height: 20px !important;
  color: #5d4037 !important;
  font-weight: 500;
}
.q-table-bottom {
  min-height: 20px !important;
  font-weight: 800;
}
.bg-order-info:nth-of-type(even) {
  background-color: #efebe9;
}
.header-member {
  height: 54px;
  display: flex;
  align-items: center;
  padding: 0 10px;
}
.display-member {
  display: flex;
  flex: 1;
  align-items: center;
  color: #5d4037;
  font-weight: 500;
}
.icon-member {
  border-radius: 50%;
  margin-right: 10px;
}
.points {
  font-size: 24px;
  color: #5d4037;
  padding-left: 5px;
}
.total-pay {
  display: flex;
  font-size: 14px;
  font-weight: 700;
  background-color: #d7ccc8;
  padding: 10px 0;
  color: #5d4037;
}
.clsIcon {
  font-size: 1.4em;
  margin: 0 8px;
  cursor: pointer;
}
</style>
