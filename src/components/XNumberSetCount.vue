<template>
  <div class="XNumberSetCount">
    <group>
      <x-number
        v-model="ticket.count"
        :min="0"
        :max="ticket.totalNumber - ticket.sellStatus"
        v-if="ticket.totalNumber - ticket.sellStatus"
        button-style="round"
        @input="change"
        >
      </x-number>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
import { Group, XNumber } from 'vux';

export default {
  props: {
    ticket: {
      type: Object,
    },
  },
  methods: {
    change(val) {
      this.ticket.count = val;
    },
  },
  components: {
    Group,
    XNumber,
  },
};
</script>

<style lang="less">

</style>
