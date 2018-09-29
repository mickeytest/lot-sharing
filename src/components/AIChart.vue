<template>
  <Card style="height:250px">
     <div style="text-align:left">
         <Tabs value="mdc1">
            <TabPane label="Micro Data Center 1"  name="mdc1">
              <div class="aichart1">
                <div class="main1"></div>
              </div>
            </TabPane>
            <TabPane label="Micro Data Center 2"  name="mdc2">
             <div class="aichart2">
              <div class="main2"></div>
            </div>
            </TabPane>
        </Tabs>
     </div>

  </Card>
</template>

<script>
  /* eslint-disable indent */

import axios from 'axios'
import echarts from 'echarts'
import { mapState } from 'vuex'

export default {
  name: "AIChart",

  mounted() {
    this._init1()
    this._init2()
  },
  data() {
    return {
      myChart1: {},
      myChart2: {},
      options1: {
          grid: {
                left: 10,
                top:10,
                bottom: 50,
                right: 50,
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: [],
                 nameTextStyle:{
                        color: "#FFFFFF"
                 },
                 name:"edge server",
                 nameLocation:"center",
                 nameGap:25,
                 axisLabel:{
                      color: "#FFFFFF"

                 },
                 axisTick:{
                     lineStyle: {
                        color: "#FFFFFF"
                     }
                 } ,
                   axisLine:{
                     lineStyle: {
                        color: "#FFFFFF"
                     }
                 }
            },
            yAxis: {
                type: 'category',
                data: ['Allocation', 'Network', 'Physical'],
                 nameTextStyle:{
                        color: "#FFFFFF"
                 },
                 name:"AI Instance",
                 nameLocation:"center",
                 nameGap:50,
                 axisLabel:{
                      color: "#FFFFFF",
                      rotate: 50
                 },
                 axisTick:{
                     lineStyle: {
                        color: "#FFFFFF"
                     }
                 } ,
                   axisLine:{
                     lineStyle: {
                        color: "#FFFFFF"
                     }
                 }
            },
           series: [{
              name: 'AI Status',
              type: 'effectScatter',
              data: []
          }]
        },
      options2: {
          grid: {
                left: 10,
                top:10,
                bottom: 50,
                right: 50,
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: [],
                 nameTextStyle:{
                        color: "#FFFFFF"
                 },
                 name:"edge sever",
                 nameLocation:"center",
                 nameGap:25,
                 axisLabel:{
                      color: "#FFFFFF"

                 },
                 axisTick:{
                     lineStyle: {
                        color: "#FFFFFF"
                     }
                 } ,
                   axisLine:{
                     lineStyle: {
                        color: "#FFFFFF"
                     }
                 }
            },
            yAxis: {
                type: 'category',
                data: ['Optimization', 'Network', 'Physical'],
                 nameTextStyle:{
                        color: "#FFFFFF"
                 },
                 name:"AI Instance",
                 nameLocation:"center",
                 nameGap:50,
                 axisLabel:{
                      color: "#FFFFFF",
                      rotate: 50
                 },
                 axisTick:{
                     lineStyle: {
                        color: "#FFFFFF"
                     }
                 } ,
                   axisLine:{
                     lineStyle: {
                        color: "#FFFFFF"
                     }
                 }
            },
           series: [{
              name: 'AI Status',
              type: 'effectScatter',
              data: []
          }]
        },
      defaultStyle: {
        'shutdown':{size: 10, color: '#5C5C5C', name: 'Shut Down', brushType: "no"},
        'working':{size: 15, color: '#19be6b', name: 'Working', brushType: "stroke"},
        'retrieving':{size: 15, color: '#2d8cf0', name: 'Retrieving', brushType: "stroke"},
        'warning':{size: 20, color: '#f90', name: 'Warning', brushType: "stroke"},
        'error':{size: 20, color: '#ed3f14', name: 'Error', brushType: "stroke"}
      },
      name: 'AIChart'
    }
  },
  computed: mapState({
    nodeList: state => state.nodeList,
    frame: state => state.frame
  }),
  watch:{
    frame:{
      handler:function(val){
        this._cal_Option()
        this.myChart1.setOption(this.options1)
        this.myChart2.setOption(this.options2)
      }
    },
    nodeList:{
      handler:function(val){
        this._cal_Option()
        this.myChart1.setOption(this.options1)
        this.myChart2.setOption(this.options2)
      }
    }
  },
  methods: {

    _init1() {
      this.myChart1 = echarts.init(document.querySelector('.aichart1 .main1'))
      this.myChart1.on('click', function (params) {
        this.$store.dispatch('displayModal',{show: true, item: "edge_"+ this.options1.xAxis.data[params.value[0]]});
      }.bind(this));
      this.$root.charts.push( this.myChart1)
      window.addEventListener('resize', function() {
         this.myChart1.resize()
      }.bind(this))
    },
    _init2() {
      this.myChart2 = echarts.init(document.querySelector('.aichart2 .main2'))
      this.myChart2.on('click', function (params) {
         this.$store.dispatch('displayModal',{show: true, item: "edge_"+ this.options1.xAxis.data[params.value[0]]});
      }.bind(this));
      this.$root.charts.push( this.myChart2)
      window.addEventListener('resize', function() {
         this.myChart2.resize()
      }.bind(this))
    },
    cal_ai_status(ai_status, notice_status){
      if (ai_status == "shutdown") {
        return "shutdown"
      }else if (ai_status == "idle" || ai_status == 'inferencing') {
        if (notice_status == 'ok'){
          return "working"
        }else if (notice_status == 'warn'){
          return "warning"
        }else if (notice_status == 'error'){
          return "error"
        }
      }else if (ai_status == "xfering" || ai_status == 'retrieving') {
        return "retrieving"
      }else{
        return "unknown"
      }
    },
    _cal_Option(){

      let edges_mapping = {
        "mdc_1": {axis: [], data:[]},
        "mdc_2": {axis: [], data:[]}
      }

      this.nodeList.ai_powered_edge.nodes.forEach(function(node){
          for (let n in node) {
             if(n.startsWith("edge")){
                edges_mapping[node[n].topoinfo.parent].axis.push(n.replace("edge_",""))
                let frame = this.nodeList.Node_events.frames[this.frame]["frame"+(this.frame+1)][n]
                frame.ai_status.forEach(function(ai){
                  let aistatus = "shutdown"
                  let aidaemon = 0
                  if(ai['ai_optimizing']){
                    aistatus = this.cal_ai_status(ai['ai_optimizing'], ai["status"])
                    aidaemon = 0
                  }else if(ai['ai_network_ids']){
                    aistatus = this.cal_ai_status(ai['ai_network_ids'], ai["status"])
                    aidaemon = 1
                  }else if(ai['ai_physical_detection']){
                    aistatus = this.cal_ai_status(ai['ai_physical_detection'], ai["status"])
                    aidaemon = 2
                  }
                  if( edges_mapping[node[n].topoinfo.parent].axis.length - 1 == 0 &&  aidaemon == 0){
                    console.log(1)
                  }
                  edges_mapping[node[n].topoinfo.parent].data.push({
                      name: this.defaultStyle[aistatus].name,
                      value: [edges_mapping[node[n].topoinfo.parent].axis.length - 1, aidaemon, 1],
                      rippleEffect: {
                          brushType: this.defaultStyle[aistatus].brushType,
                      },
                      itemStyle: {
                        normal: {
                          color: this.defaultStyle[aistatus].color,
                        }
                      },
                      symbolSize: this.defaultStyle[aistatus].size,
                  })
                }.bind(this))
             }
          }
        }.bind(this))
      this.options1.xAxis.data = edges_mapping.mdc_1.axis
      this.options2.xAxis.data = edges_mapping.mdc_2.axis
      this.options1.series[0].data = edges_mapping.mdc_1.data
      this.options2.series[0].data = edges_mapping.mdc_2.data
    },

  }
}

</script>

<style lang="stylus">
.ivu-card-bordered
  border: 0px;
  background: transparent;
  background-color: rgba(0, 0, 0, 0.5)

.aichart1
  width 100%
  height: 200px
.main1
  height 100%
  width 100%
  transition all 0.5s linear

.aichart2
  width 100%
  height: 200px
.main2
  height 100%
  width 100%
  transition all 0.5s linear

.ivu-tabs-nav .ivu-tabs-tab-active
  color: #0940ff;

</style>
