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

<script>
import { Group, XNumber } from 'vux';

export default {
  props: {
    ticket: {
      type: Object,
    },
  },
  methods: {
    change(val) {
      // this.ticket.count = val;
      this.countChange(this.ticket.id, val);
    },
    countChange(id, val) {
      this.$emit('countChangeWithId', id, val);
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
