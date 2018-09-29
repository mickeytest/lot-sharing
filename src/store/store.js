import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
     state:{
        nodeList: {},
        frame: -1,
        edgeEvents: {},
        edgeAIStatus: {},
        xfering:{},
        retrieving:{},
        totalEvents: [],
        historyEvents: [],
        img: "",
        color: ['#325B69', '#698570', '#AE5548', '#6D9EA8', '#9CC2B0', '#C98769'],
        modalData: {
          show: false,
          item: ""
        }
     },
     mutations:{
        getNodeList(state, data){
            state.nodeList = data;
        },
        addFrame(state){
          if(state.frame == 4) {
            state.frame = 0
          }else {
            state.frame += 1
          }

          let items = state.nodeList.Node_events.frames[state.frame]["frame"+(state.frame+1)]
          let return_alerts = []
          let return_history_alerts = []
          let edgeEvents = {}
          let xfering = {}
          let retrieving = {}
          for(let edge in items){
             edgeEvents[edge] = {"active_events":[],"events":[]}
             if(items[edge]["active_events"]){
                items[edge]["active_events"].forEach(function(event){
                  let e = {
                    edge_name: edge,
                    time: event.when,
                    desc: event.event.desc,
                    sev: event.event.sev == 'warn'? 'warning':event.event.sev
                  }
                  return_alerts.push(e)
                  edgeEvents[edge]["active_events"].push(e)
                })
              }
             if(items[edge]["events"]){
                  items[edge]["events"].forEach(function(event){
                    let e = {
                      edge_name: edge,
                      time: event.when,
                      desc: event.event.desc,
                      sev: event.event.sev == 'warn'? 'warning':event.event.sev
                    }
                    return_history_alerts.push(e)
                    edgeEvents[edge]["events"].push(e)
                })
              }
             if(items[edge]["ai_status"]){
               items[edge]["ai_status"].forEach(function(ai){
                  if(ai['xfer_load_to']){
                    xfering[edge] = ai['xfer_load_to']
                  }
                  if("retrieving" == ai['ai_physical_detection']){
                     retrieving[edge] = ai['xfer_load_to']
                    if(["edge_01","edge_02","edge_03","edge_04","edge_05","edge_06","edge_07","edge_08","edge_09","edge_10"].indexOf(edge) >= 0){
                       retrieving[edge] = "mdc_2"
                    }else {
                       retrieving[edge] = "mdc_1"
                    }
                  }
                })
             }
          }

          return_alerts.sort(function(a, b){
            return Date.parse(b.time) - Date.parse(a.time)
          })
          return_history_alerts.sort(function(a, b){
            return Date.parse(b.time) - Date.parse(a.time)
          })
          state.totalEvents = return_alerts
          state.historyEvents = return_history_alerts
          state.edgeEvents = edgeEvents
          state.xfering = xfering
          state.retrieving = retrieving

        },
        setModalData(state, data){
          if (data.show == true && data.item !== undefined) {
            data.nodes = state.nodeList.ai_powered_edge.nodes.filter(function(e){
               return e[data.item] !== undefined
            });
          }else{
            data.nodes = []
          }
          state.modalData = data
        },
        setImg(state, data){
          state.img = data
        }
     },
     actions:{
        getNodeList({commit}){
          axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
          axios.get('static/data/rawdata.json').then((res) => {
            commit("getNodeList", res.data)
            commit("addFrame")
          })

        },
        addFrame({commit}){
          commit("addFrame")
        },
        displayModal({commit}, data){
          commit("setModalData", data)
        }
     }
})

export default store
