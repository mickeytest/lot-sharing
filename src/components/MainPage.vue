<template>
  <div style="margin-top: -60px;">
     <Row>
        <Col span="24">
           <Card style="height: 300px">
            <div style="text-align:center">
                <h3>This is main map</h3>
            </div>
           </Card>
       </Col>
    </Row>
     <Row>
        <Col span="14">
          <Card  style="height:200px">
            <div style="text-align:left">
               <Modal
                    v-model="modal1"
                    title="Common Modal dialog box title"
                   >
                    <p>Content of dialog</p>
                    <p>Content of dialog</p>
                    <p>Content of dialog</p>
               </Modal>
               <Tag type="dot"  closable style="width:100%"  color="red"><span @click="modal1 = true">AI检测到Edge Server：xxxx遭到DDOS网络攻击</span></Tag>
               <Tag type="dot"  closable style="width:100%"  color="red"><span @click="modal1 = true">AI检测到Edge Server：xxxx周围有可疑陌生人</span></Tag>
               <Tag type="dot"  closable style="width:100%"  color="green"><span @click="modal1 = true">AI检测到Edge Server：xxxx周围操作行为，检测为管理员</span></Tag>
               <Tag type="dot"  closable style="width:100%"  color="orange"><span @click="modal1 = true">AI检测到Edge Server：xxxx流量负载较高</span></Tag>
               <Tag type="dot"  closable style="width:100%"  color="green"><span @click="modal1 = true">AI检测到Edge Server：xxxx流量负载较低，预计5分钟后关闭部分以节能</span></Tag>

            </div>
          </Card>
       </Col>
        <Col span="10">
           <Card style="height:200px">
            <br>
            <i-circle :percent="80">
                <span class="demo-Circle-inner" style="font-size:24px">80%</span>
            </i-circle>
            <i-circle :percent="100" stroke-color="#5cb85c">
                <Icon type="ios-checkmark-empty" size="60" style="color:#5cb85c"></Icon>
            </i-circle>
            <i-circle :percent="35" stroke-color="#ff5500">
                <span class="demo-Circle-inner">
                    <Icon type="ios-close-empty" size="50" style="color:#ff5500"></Icon>
                </span>
            </i-circle>
           </Card>
       </Col>
    </Row>

  </div>

</template>

<script>
    export default {
        data () {
            return {
                modal1: false
            }
        },
        methods: {

        }
    }
</script>


<style >
.ivu-tag .ivu-icon-ios-close-empty {
    float:right;
    margin-top: 6px;
}

</style>
