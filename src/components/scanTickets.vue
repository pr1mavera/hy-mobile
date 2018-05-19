<template>
<!-- 查看门票 -->
<div v-transfer-dom>
	<popup
	v-model="showTicket"
	height="90%"
	position="top"
	:is-transparent='true'
	>
		<div class="popup popupTicket">
			<div class="popupTicketBox" id="popupTicketBox">
			<div class="popupTicketBoxContent">
				<div class="activity">
				<div class="content">
					<p class="title">{{activity.activityTitle}}</p>
					<p class="desc time">{{activity.startTime | timeFormat}} ~ {{activity.endTime | timeFormat}}</p>
					<p class="desc location">{{activity.activityAddress | adressFormat}}</p>
				</div>
				<div class="hole-block-top"></div>
				<div class="hole hole-bottom-r"></div>
				<div class="hole hole-bottom-l"></div>
				</div>
				<div class="ticket border-1px-t">
					<div class="content">
						<p class="title ticketN">{{currentTicket.ticketsName?currentTicket.ticketsName:'无'}}</p>
						<div class="QRCodeBox">
						<qrcode :value="currentTicket.authCode"></qrcode>
						</div>
						<p class="code vux-1px">取票号 {{currentTicket.signCode}}</p>
						<div class="massage">
						<p class="name"><span>姓名</span> {{currentTicket.confereeName}}</p>
						<p class="price"><span>票价</span> ￥{{currentTicket.ticketsPrice}}</p>
						</div>
					</div>
					<div class="hole hole-top-r"></div>
					<div class="hole hole-top-l"></div>
					<div class="hole-block-bottom"></div>
				</div>
			</div>
			<div class="close" @click="showTicket=false">
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-guanbi2"></use>
				</svg>
			</div>
			</div>
			<!-- <div class="block"></div> -->
		</div>
	</popup>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    
  },
  data() {
    return {
		showTicket: false, // 是否显示查看门票
    };
  },
  computed: {
    ...mapGetters([
      'activityId',
    ]),
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
    },
  },
};
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
@import '../common/style/mixin.less';
Body {
  background-color: #ffffff;
}
</style>
