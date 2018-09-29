<template>
    <Modal
        v-model="modalshow"
        :title="title"
        @on-visible-change="changeVisible"
        width="1000px">
        <Tabs value="basic">
          <TabPane label="Basic"  name="basic">
             <Table :columns="basic_columns" :data="basic_data"></Table>
          </TabPane>
          <TabPane label="Configuration"  name="config">
            <Table :columns="configuration_columns" :data="configuration_data"></Table>
          </TabPane>
          <TabPane label="Software"  name="software">
             <Table :columns="software_columns" :data="software_data"></Table>
          </TabPane>
          <TabPane label="Active Events"  name="active_events">
              <Alert v-for = "item in edgeEvents['active_events']" :closable="false" show-icon :type="item.sev">
                <span>[{{item.time}}] [{{item.edge_name}}]: {{item.desc}}</span>
              </Alert>
            <img v-show="imgurl!=''" :src="imgurl" style="width: 640px; height:480px">
          </TabPane>
          <TabPane label="History Events"  name="history_events">
              <Alert v-for = "item in edgeEvents['events']" :closable="false" show-icon :type="item.sev">
                <span>[{{item.time}}] [{{item.edge_name}}]: {{item.desc}}</span>
              </Alert>
          </TabPane>
        </Tabs>
        <div slot="footer">
        </div>
    </Modal>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: "modal",
        data() {
          return {
            basic_columns: [
              {
                title: 'Key',
                key: 'key'
              },
              {
                title: 'Value',
                key: 'value'
              }
            ],
            configuration_columns: [
               {
                title: 'Name',
                key: 'name'
               },
               {
                title: 'Module',
                key: 'module'
               },
               {
                title: 'Number',
                key: 'number'
               },{
                title: 'Status',
                key: 'status'
               },{
                title: 'State',
                key: 'state'
               },{
                title: 'Loading',
                key: 'loading'
               },
            ],
            software_columns:[
               {
                title: 'Module',
                key: 'module'
               },
               {
                title: 'Type',
                key: 'type'
               },
               {
                title: 'Version',
                key: 'version'
               },
               {
                title: 'Status',
                key: 'status'
               },{
                title: 'State',
                key: 'state'
               }
            ],
            }
        },
        methods: {
          changeVisible(open) {
           if(open === false) {
             this.$store.dispatch('displayModal',{show: false, item: ""});
           }else{
             this.imgurl = "http://192.168.101.100:5000/event_data/21?"+Math.random()
           }
          }
        },
        computed: mapState({
          modalshow: state => state.modalData.show,
          edgeEvents: state => {
            if(state.modalData.item == ""){
              return {"active_events":[],"events":[]}
            }else {
              return state.edgeEvents[state.modalData.item]
            }
          },
          imgurl: state => {
            if (state.modalData.item.startsWith("edge_21")){
              return "http://192.168.101.100:5000/event_data/21?"+Math.random()
            }else if (state.modalData.item.startsWith("edge_14")) {
              return "http://192.168.101.100:5000/event_data/14?" + Math.random()
            }
            return ""
          },
          title: state => {
            return state.modalData.item + " Detail"
          },
          basic_data: state => {
            if (state.modalData.nodes && state.modalData.nodes.length > 0 ) {
              let item = state.modalData.nodes[0][state.modalData.item]
              return [
                {
                  key: "Type",
                  value: item.type,
                },
                {
                  key: "Location",
                  value: item.location,
                },
                {
                  key: "Description",
                  value: item.desc,
                },
                {
                  key: "Status",
                  value: item.status,
                }
              ]
            } else {
              return []
            }

          },
          configuration_data: state => {
            if (state.modalData.nodes && state.modalData.nodes.length > 0 ) {
              let item = state.modalData.nodes[0][state.modalData.item]
              let return_items = []

              return_items.push({
                  name: "Cpu",
                  module: item.configuration.Cpu.module[0].desc,
                  number: item.configuration.Cpu.number,
                  status: item.configuration.Cpu.status,
                  state: item.configuration.Cpu.state,
                  loading: item.configuration.Cpu.loading,
                })

              item.configuration.Disk.forEach(function (e){
                return_items.push({
                  name: "Disk",
                  module: e.module[0].desc,
                  number: e.number,
                  status: e.status,
                  state: e.state,
                  loading: e.loading,
                })

              })

              return_items.push({
                  name: "Dimm",
                  module: item.configuration.Dimm.module[0].desc,
                  number: item.configuration.Dimm.number,
                  status: item.configuration.Dimm.status,
                  state: item.configuration.Dimm.state,
                  loading: item.configuration.Dimm.loading,
                })

              return_items.push({
                  name: "Network",
                  module: item.configuration.Network.module[0].desc,
                  number: item.configuration.Network.number,
                  status: item.configuration.Network.status,
                  state: item.configuration.Network.state,
                  loading: item.configuration.Network.loading,
                })

              return return_items
            } else {
              return []
            }
          },
          software_data: state => {
            if (state.modalData.nodes && state.modalData.nodes.length > 0 ) {
              let item = state.modalData.nodes[0][state.modalData.item]

              let returnItems = []
              item["Software module"].forEach(function(e){
                returnItems.push({
                  module: e["module"]["desc"],
                  type: e["module"]["type"],
                  version: e["module"]["version"],
                  status: e["status"],
                  state: e["state"]
                });
              })
              return returnItems
            } else {
              return []
            }
          },
          img: state => state.img
        })

    }
</script>

<style scoped>

</style>
