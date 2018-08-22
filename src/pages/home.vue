<template >
  <div>
    <q-carousel class="component-top" style="max-width: 700px;margin:auto; height:300px">
      <q-carousel-slide img-src="assets/component.jpg">
        <div class="absolute-top-left custom-caption-top">
          <div class="q-display-1">Bring on the fruit</div>
          <q-btn class="fixed-bottom-left btnlearn" rounded>
            <q-item v-for="modal in types" :key="modal.label" @click.native="modal.show()">
              <q-item-main :label="modal.label" />
            </q-item>
          </q-btn>
          <!-- popup modal -->
          <q-modal v-model="basicModal" :content-css="{minWidth: '48vw', minHeight: '86vh'}">
            <q-modal-layout>
              <q-scroll-observable @scroll="userHasScrolled" />
              <div id="labels" class=" transbox">
                <q-btn flat icon="close" @click="basicModal = false">
                  <div style="margin-left: 10px; text-transform: initial;">Bring on the fruit</div>
                </q-btn>
              </div>
              <img src="assets/header-pop.jpg" alt="ww" style="width: 683px; height:300px">
              <q-btn flat icon="close" class="absolute-top-left" @click="basicModal = false" style="color: white;" />
              <div style="padding: 50px">
                <div class="q-display-1 q-mb-md">Basic Modal</div>
                <p v-for="n in 15" :key="`a-${n}`">Scroll down to close</p>
                <q-btn to="/orders" class="Order" rounded>
                  <div>Order</div>
                </q-btn>
              </div>
            </q-modal-layout>
          </q-modal>
          <!-- popup modal -->
        </div>
      </q-carousel-slide>
    </q-carousel>
    <q-carousel class="component-top" style="max-width: 700px;margin:auto; height:300px">
      <q-carousel-slide img-src="assets/component-mid.jpg">
        <div class="inner-top">Discover coffee</div>
        <div class="absolute-top-left custom-caption-mid">
          <div class="q-display-1">Find a new favorite</div>
          <q-btn class="fixed-bottom-left btnlearn" rounded>
            <q-item v-for="modal in types2" :key="modal.label2" @click.native="modal.show()">
              <q-item-main :label="modal.label2" />
            </q-item>
          </q-btn>
          <!-- popup modal -->
          <q-modal v-model="basicModal2" :content-css="{minWidth: '48vw', minHeight: '86vh'}">
            <q-modal-layout>
              <q-scroll-observable @scroll="userHasScrolled" />
              <div id="labels" class=" transbox">
                <q-btn flat icon="close" @click="basicModal2 = false">
                  <div style="margin-left: 10px; text-transform: initial;">Bring on the fruit</div>
                </q-btn>
              </div>
              <img src="assets/header-pop.jpg" alt="ww" style="width: 683px;">
              <q-btn flat icon="close" class="absolute-top-left" @click="basicModal2 = false" style="color: white;" />
              <div style="padding: 50px">
                <div class="q-display-1 q-mb-md">Basic Modal</div>
                <p v-for="n in 15" :key="`a-${n}`">Scroll down to close</p>
                <q-btn to="/orders" class="Order" rounded>
                  <div>Order</div>
                </q-btn>
              </div>
            </q-modal-layout>
          </q-modal>
          <!-- popup modal -->
        </div>
      </q-carousel-slide>
    </q-carousel>
    <q-carousel class="component-top" style="max-width: 700px;margin:auto; height:300px">
      <q-carousel-slide img-src="assets/panel.jpg">
      </q-carousel-slide>
    </q-carousel>
    <q-carousel>
      <q-modal v-model="opened">
        <h4>Basic Modal</h4>
        <q-btn color="primary" @click="opened = false" label="Close" />
      </q-modal>
    </q-carousel>
  </div>
</template>

<style>
.transbox {
  list-style-type: none;
  padding: 0;
  overflow: hidden;
  background-color: #fff;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  border-left: 1px solid #d9d2d2;
  border-right: 1px solid #d9d2d2;
  opacity: 0.01;
  filter: alpha(opacity=60); /* For IE8 and earlier */
  margin-bottom: -38px;
}

.custom-caption-top {
  text-align: center;
  color: white;
  margin-top: 20px;
  margin-left: 20px;
}
.custom-caption-mid {
  text-align: center;
  color: white;
  margin-top: 50px;
  margin-left: 20px;
}
.component-top {
  padding: 5px 0 10px 0;
}
.btnlearn {
  color: black;
  background-color: white;
  margin-bottom: 20px;
  margin-left: 20px;
}
.q-display-1 {
  font-size: 40px;
}
.inner-top {
  font-size: 24px;
  color: cyan;
}
.q-layout-header {
  box-shadow: inherit;
}
.Order {
  background-color: rgb(49, 138, 49);
}
.q-modal-layout-content {
  overflow-x: hidden;
}
</style>

<script>
export default {
  data() {
    return {
      opened: false,
      basicModal: false,
      basicModal2: false,
      imageSrc: 'assets/component.jpg',
      types: [
        {
          label: 'Learn More',
          show: () => {
            this.basicModal = true
          },
        },
      ],
      types2: [
        {
          label2: 'Discover coffe',
          show: () => {
            this.basicModal2 = true
          },
        },
      ],
    }
  },
  name: 'PageIndex',
  methods: {
    userHasScrolled(scroll) {
      var target = scroll.position / 100
      var pushtarget = target - 0.1
      if (scroll.direction === 'down') {
        document.getElementById('labels').style.opacity = target / 2
      } else {
        document.getElementById('labels').style.opacity = pushtarget / 2
      }
    },
  },
}
</script>
