<template>
  <div class="mainpage">
      <div class="relationpanel">
        <Relation></Relation>
      </div>

      <div class="aipanel">
        <AIChart></AIChart>
      </div>
      <div class="logpanel">
        <Log></Log>
      </div>
      <Modal></Modal>
      <Button  type="ghost" shape="circle" icon="plus"  v-on:click="addFrame"/>
  </div>

</template>

<script>
    import Relation from '@/components/Relation'
    import Log from '@/components/Log'
    import AIStatus from '@/components/AIStatus'
    import Modal from '@/components/Modal'
    import AIChart from '@/components/AIChart'
    export default {
        name: "Main",
        components: {
          Relation,
          Log,
          AIStatus,
          Modal,
          AIChart
        },
        methods: {
          addFrame() {
              this.$store.dispatch('addFrame');
          }
        }
    }
</script>

<style lang="stylus" scoped>
.mainpage
  width 100%
  height: 100%
.relationpanel
  width 96%
  height: 100%
  position: fixed;
  right: 2%;
  top: 20px;
.logpanel
  width: 40%
  height: 70%
  position: fixed;
  right: 3%;
  top: 290px;
  /*margin-left: 10%*/
  /*margin-top: 2%*/
  /*float:left*/
.aipanel
  width: 40%
  height: 50%
  position: fixed;
  right: 3%;
  top: 25px;
  /*margin-right: 10%*/
  /*margin-top: 2%*/
  /*float:right*/

button
  position: fixed;
  top: 305px;
  right: 4%;
</style>
