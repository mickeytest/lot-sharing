<template>
    <Card  id="cardd" style="height:250px">
        <i-circle :percent="allocation">
             <div class="demo-Circle-custom">
                <h1>{{allocation}}%</h1>
                <p>智能调度</p>
            </div>
        </i-circle>
        <i-circle :percent="network" stroke-color="#5cb85c">
            <div class="demo-Circle-custom">
                <h1>{{network}}%</h1>
                <p>网络攻击检测</p>
            </div>
        </i-circle>
        <i-circle :percent="physical" stroke-color="#ff5500">
            <div class="demo-Circle-custom">
                <h1>{{physical}}%</h1>
                <p>物理攻击检测</p>
            </div>
        </i-circle>
    </Card>
</template>

<script>
    export default {
        name: "AIStatus",
        data() {
            return {
              allocation: 0,
              network: 10,
              physical: 20
            }
        },
        beforeMount() {
           //设置定时器，每3秒刷新一次
           var self = this;
           setInterval(startAllocationDaemon,3000)
           function startAllocationDaemon() {
             if( self.allocation < 100) {
               self.allocation += 10
             }else{
               self.allocation = 0
             }
           }
           startAllocationDaemon();
           setInterval(startNetworkDaemon,4000)
           function startNetworkDaemon() {
             if( self.network < 100) {
               self.network += 5
             }else{
               self.allocation = 0
             }
           }
           startNetworkDaemon();
           setInterval(startPhysicalDaemon,2000)
           function startPhysicalDaemon() {
             if( self.physical < 100) {
               self.physical += 10
             }else{
               self.physical = 0
             }
           }
           startPhysicalDaemon();

        },
        method() {
        }
    }
</script>

<style lang="stylus" scoped>
.ivu-chart-circle
  margin-top: 10%
  margin-right: 10px
.demo-Circle-custom
  h1
    color:white
  p
   color:white
   font-size: 10px
</style>
