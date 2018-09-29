<template>
    <Card  id="cardd" style="height:350px">
      <div style="text-align:left">
         <Tabs value="active">
            <TabPane label="Active Events"  name="active">
              <Alert v-for = "item in totalEvents" :closable="false" show-icon :type="item.sev">
                <span v-on:click="openModal(item.edge_name)">[{{item.time}}] [{{item.edge_name}}]: {{item.desc}}</span>
              </Alert>
            </TabPane>
            <TabPane label="History Events"  name="history">
              <Alert v-for = "item in historyEvents" :closable="false" show-icon :type="item.sev">
                <span v-on:click="openModal(item.edge_name)">[{{item.time}}] [{{item.edge_name}}]: {{item.desc}}</span>
              </Alert>
            </TabPane>
        </Tabs>
      </div>
    </Card>
</template>

<script>
  import { mapState } from 'vuex'
    export default {
        name: "log",
        data() {
            return {
              alerts: []
            }
        },
        computed: mapState({
          nodeList: state => state.nodeList,
          frame: state => state.frame,
          totalEvents: state => state.totalEvents,
          historyEvents: state => state.historyEvents
        }),
        watch:{
          frame:{
            handler:function(val){
              this._cal_Alerts()
            }
          },
          nodeList:{
            handler:function(val){
              this._cal_Alerts()
            }
          }
        },
        methods: {
          openModal(item) {
            this.$store.dispatch('displayModal',{show: true, item: item});
          },
          _cal_Alerts(){
            let items = this.nodeList.Node_events.frames[this.frame]["frame"+(this.frame+1)]
            let return_alerts = []
            for(let edge in items){
                if(edge.startsWith("edge") && items[edge]["active_events"]){
                  items[edge]["active_events"].forEach(function(event){
                    return_alerts.push({
                      edge_name: edge,
                      time: event.when,
                      desc: event.event.desc,
                      sev: event.event.sev == 'warn'? 'warning':event.event.sev
                    })
                }.bind(this))
              }
            }

            return_alerts.sort(function(a, b){
              return Date.parse(b.time) - Date.parse(a.time)
            })
            this.alerts =  return_alerts
          }
        }
    }
</script>

<style lang="stylus" scoped>

.ivu-card-bordered
  border: 0px;
  background: transparent;
  background-color: rgba(0, 0, 0, 0.5)
  overflow: scroll;
  overflow-x: hidden;

.ivu-tabs-nav .ivu-tabs-tab
  color: #ccc

.ivu-badge
    margin-left: 6px;

.ivu-alert
  color: #FFFFFF;
  background-color: transparent
  border: 0px;

.ivu-alert-close .ivu-icon-ios-close-empty
    color: #FFFFFF;

.ivu-tabs-nav .ivu-tabs-tab-active
    color: #2d8cf0;

#cardd::-webkit-scrollbar-track
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #F5F5F5;


#cardd::-webkit-scrollbar
	width: 1px;
	background-color: #F5F5F5;


#cardd::-webkit-scrollbar-thumb
	background-color: #285d7b;
	border: 2px solid #285d7b;

.ivu-alert.ivu-alert-with-icon
    padding: 8px 48px 10px 40px;
    height: 0px;

.ivu-alert
    font-size: 12px;
    line-height: 11px;



</style>
