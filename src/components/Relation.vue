<template>
<div class="relation">
  <div class="main"></div>
</div>
</template>

<script>
  /* eslint-disable indent */

import echarts from 'echarts'
import bmap from 'echarts/extension/bmap/bmap'
import { mapState } from 'vuex'

export default {
  name: "Relation",

  mounted() {
    this._init()
  },
  data() {
    return {
      geoCoordMap: {
          'center_cloud_1': [121.482848, 31.239088],
          'mdc_2': [121.430459, 31.225533],
          'mdc_1': [121.459867,31.281954],
          'edge_01': [121.427872, 31.244059],
          'edge_02': [121.410625, 31.234673],
          'edge_03': [121.395964, 31.222074],
          'edge_04': [121.411487, 31.209721],
          'edge_05': [121.431106, 31.208424],
          'edge_06': [121.438221, 31.207991],
          'edge_07': [121.439597, 31.242824],
          'edge_08': [121.448569, 31.220098],
          'edge_09': [121.451228, 31.229917],
          'edge_10': [121.457598, 31.218756],
          'edge_11': [121.464753,31.266645],
          'edge_12': [121.480276,31.270596],
          'edge_13': [121.484588,31.277756],
          'edge_14': [121.492062,31.286891],
          'edge_15': [121.4866,31.296519],
          'edge_16': [121.469065,31.298741],
          'edge_17': [121.461879,31.29726],
          'edge_18': [121.452393,31.296766],
          'edge_19': [121.442044,31.283682],
          'edge_20': [121.437158,31.286891],
          'edge_21': [121.437445,31.270843],
          'edge_22': [121.446069,31.262447]

        },
      defaultStyle: {
          'center_cloud_1': {value: 200, color: '#434F66', symbol: 'circle', effect: "stroke"
          },
          'mdc_1':{value: 120, color: '#7193B6', symbol: 'roundRect', effect: "stroke"},
          'mdc_2':{value: 120, color: '#7193B6', symbol: 'roundRect', effect: "stroke"},
          'shutdown':{value: 50, color: '#5C5C5C', symbol: 'pin', effect: "no"},
          'working':{value: 50, color: '#19be6b', symbol: 'pin', effect: "fill"},
          'retrieving':{value: 50, color: '#2d8cf0', symbol: 'pin', effect: "fill"},
          'warning':{value: 60, color: '#f90', symbol: 'pin', effect: "fill"},
          'error':{value: 70, color: '#ed3f14', symbol: 'pin', effect: "fill"}
          },
      options: {
          title: {
            text: 'Lenovo Intelligent Iot Management Console'
          },
          tooltip: {
              trigger: 'item'
          },
          animationDurationUpdate: 1500,
          animationEasingUpdate: 'quinticInOut',
          bmap: {
            center: [121.486888,31.24269],
            zoom: 14,
            roam: true,
            mapStyle: {
              styleJson: [{
                    'featureType': 'water',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'land',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#f3f3f3'
                    }
                }, {
                    'featureType': 'railway',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'highway',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#fdfdfd'
                    }
                }, {
                    'featureType': 'highway',
                    'elementType': 'labels',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'geometry',
                    'stylers': {
                        'color': '#fefefe'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'geometry.fill',
                    'stylers': {
                        'color': '#fefefe'
                    }
                }, {
                    'featureType': 'poi',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'green',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'subway',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'manmade',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'local',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'labels',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'boundary',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#fefefe'
                    }
                }, {
                    'featureType': 'building',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'label',
                    'elementType': 'labels.text.fill',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }]
            }
          },
          series: [
                {
                    type: 'effectScatter',
                    coordinateSystem: 'bmap',

                    zlevel: 2,
                    data: [],
                    symbolSize: function (val) {
                        return val[2]/3;
                    },
                    tooltip:{
                        formatter:"{b}"
                    }
                },
                {
                    name: '',
                    type: 'lines',
                    zlevel: 2,
                    symbol: ['none', 'none'],
                    coordinateSystem: 'bmap',
                    symbolSize: 10,
                    lineStyle: {
                        normal: {
                            color: "#029fd4",
                            width: 1,
                            opacity: 0.6,
                            curveness: 0.2
                        }
                    },
                    data: []
                },
                {
                        name: '',
                        type: 'lines',
                        zlevel: 1,
                        coordinateSystem: 'bmap',
                        effect: {
                            show: true,
                            period: 6,
                            trailLength: 0.7,
                            color: '#2d8cf0',
                            symbolSize: 5
                        },
                        lineStyle: {
                            normal: {
                                color: "#2d8cf0",
                                width: 0,
                                curveness: 0.5
                            }
                        },
                        data: []
                },
                {
                    name: '',
                    type: 'lines',
                    zlevel: 2,
                    symbol: ['none', 'none'],
                    coordinateSystem: 'bmap',
                    symbolSize: 10,
                    effect: {
                        show: true,
                        period: 6,
                        trailLength: 0,
                        symbol: 'pin',
                        symbolSize: 15
                    },
                    lineStyle: {
                        normal: {
                            color: "#2d8cf0",
                            width: 2,
                             type:"dashed",
                            opacity: 1,
                            curveness: 0.5
                        }
                    },
                    data: []
                },
                {
                        name: '',
                        type: 'lines',
                        zlevel: 1,
                        coordinateSystem: 'bmap',
                        effect: {
                            show: true,
                            period: 6,
                            trailLength: 0.7,
                            color: '#14f08a',
                            symbolSize: 5
                        },
                        lineStyle: {
                            normal: {
                                color: "#14f08a",
                                width: 0,
                                curveness: 0.2
                            }
                        },
                        data: []
                },
                {
                    name: '',
                    type: 'lines',
                    zlevel: 2,
                    symbol: ['none', 'none'],
                    coordinateSystem: 'bmap',
                    symbolSize: 10,
                    effect: {
                        show: true,
                        period: 6,
                        trailLength: 0,
                        symbol: 'pin',
                        symbolSize: 15
                    },
                    lineStyle: {
                        normal: {
                            color: "#14f08a",
                            width: 2,
                             type:"dashed",
                            opacity: 1,
                            curveness: 0.2
                        }
                    },
                    data: []
                }

          ]
        },
      myChart: {},
      name: 'Relation'
    }
  },
  computed: mapState({
    nodeList: state => state.nodeList,
    frame: state => state.frame,
    xfering: state => state.xfering,
    retrieving: state => state.retrieving
  }),
  watch:{
    frame:{
      handler:function(val){
        this._cal_Option()
        this.myChart.setOption(this.options)
      }
    },
    nodeList:{
      handler:function(val){
        this._cal_Option()
        this.myChart.setOption(this.options)
      }
    }
  },
  methods: {
    _init() {
      this.myChart = echarts.init(document.querySelector('.relation .main'))
      this.myChart.setOption(this.options)
      this.myChart.on('click', function (params) {
         if(params.seriesIndex == 0){
           this.$store.dispatch('displayModal',{show: true, item: params.data.name});
         }else if (params.seriesIndex == 1){
           this.$store.dispatch('displayModal',{show: true, item: params.data.fromName});
         }
      }.bind(this));
      this.$root.charts.push(this.myChart)
      window.addEventListener('resize', function() {
        this.myChart.resize()
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
    cal_ai_status_priority(edge_status){
      if(edge_status.indexOf("error")>=0){
        return "error"
      }else if (edge_status.indexOf("warning")>=0){
        return "warning"
      }else if (edge_status.indexOf("retrieving")>=0){
        return "retrieving"
      }else if (edge_status.indexOf("working")>=0){
        return "working"
      }else if (edge_status.indexOf("shutdown")>=0){
        return "shutdown"
      }
    },

    _cal_Option(){
        let scatterData = []
        let lineData = []
        let xfering = []
        let retrieving = []
        this.nodeList.ai_powered_edge.nodes.forEach(function(node){
           for (let n in node) {
            var geoCoord = this.geoCoordMap[n];
            if (geoCoord) {
              if(n.startsWith("edge")){
                  let edgeStatus_a  = []
                  let frame = this.nodeList.Node_events.frames[this.frame]["frame"+(this.frame+1)][n]
                  frame.ai_status.forEach(function(ai){
                    let aistatus = "shutdown"
                    if(ai['ai_optimizing']){
                      edgeStatus_a.push(this.cal_ai_status(ai['ai_optimizing'], ai["status"]))
                    }else if(ai['ai_network_ids']){
                      edgeStatus_a.push(this.cal_ai_status(ai['ai_network_ids'], ai["status"]))
                    }else if(ai['ai_physical_detection']){
                      edgeStatus_a.push(this.cal_ai_status(ai['ai_physical_detection'], ai["status"]))
                    }
                  }.bind(this))
                  let edgeStatus = this.cal_ai_status_priority(edgeStatus_a)
                  scatterData.push({
                      name: n,
                      value: geoCoord.concat(this.defaultStyle[edgeStatus].value),
                      rippleEffect: {
                          brushType: this.defaultStyle[edgeStatus].effect
                      },
                      symbol:this.defaultStyle[edgeStatus].symbol,
                      itemStyle: {
                          normal: {
                              color: this.defaultStyle[edgeStatus].color
                          }
                      },
                  });
                  var fromCoord = this.geoCoordMap[node[n].topoinfo.parent];
                  if (fromCoord) {
                      lineData.push({
                        fromName: node[n].topoinfo.parent ,
                        toName: n,
                        coords: [fromCoord, geoCoord],
                        lineStyle: {
                            normal: {
                                color: {
                                  type: 'linear',
                                  x: 0,
                                  y: 0,
                                  x2: 0,
                                  y2: 1,
                                  colorStops: [{
                                      offset: 0, color: this.defaultStyle[node[n].topoinfo.parent].color // 0% 处的颜色
                                  }, {
                                      offset: 1, color: this.defaultStyle[edgeStatus].color // 100% 处的颜色
                                  }],
                                  globalCoord: false
                                },
                                type:"dashed",
                                width: 2,
                                opacity: 0.6,
                                curveness: 0.2
                            }
                        }
                      });
                  }

              }else {
                scatterData.push({
                    name: n,
                    value: geoCoord.concat(this.defaultStyle[n].value),
                    rippleEffect: {
                        brushType: this.defaultStyle[n].effect
                    },
                    symbol:this.defaultStyle[n].symbol,
                    itemStyle: {
                        normal: {
                            color: this.defaultStyle[n].color
                        }
                    },
                });
              }

              if(n.startsWith("mdc")){
                  var fromCoord = this.geoCoordMap[node[n].topoinfo.parent];
                  if (fromCoord) {
                      lineData.push({
                        fromName: node[n].topoinfo.parent ,
                        toName: n,
                        coords: [fromCoord, geoCoord],
                        lineStyle: {
                            normal: {
                                color: {
                                  type: 'linear',
                                  x: 0,
                                  y: 0,
                                  x2: 0,
                                  y2: 1,
                                  colorStops: [{
                                      offset: 0, color: this.defaultStyle[node[n].topoinfo.parent].color // 0% 处的颜色
                                  }, {
                                      offset: 1, color: this.defaultStyle[n].color // 100% 处的颜色
                                  }],
                                  globalCoord: false
                                },
                               type:"dashed",
                                width: 2,
                                opacity: 0.6,
                                curveness: 0.2
                            }
                        }
                      });
                  }
              }
            }
          }
        }.bind(this))
        this.options.series[0].data = scatterData
        this.options.series[1].data = lineData
        for(let edge in this.xfering){
          xfering.push({
              fromName: edge,
              toName: this.xfering[edge],
              coords: [this.geoCoordMap[edge], this.geoCoordMap[this.xfering[edge]]]
          })
        }
        this.options.series[2].data = xfering
        this.options.series[3].data = xfering

       for(let edge in this.retrieving){
          retrieving.push({
              fromName: this.retrieving[edge],
              toName: edge,
              coords: [this.geoCoordMap[this.retrieving[edge]], this.geoCoordMap[edge] ]
          })
        }
        this.options.series[4].data = retrieving
        this.options.series[5].data = retrieving
    }
  }
}
</script>

<style lang="stylus" scoped>
  .relation
    width 100%
    height: 100%
  .main
    height 100%
    width 100%
    transition all 0.5s linear
</style>
